import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Plugin {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  enabled: boolean;
  config: Record<string, any>;
  permissions: string[];
}

export interface PluginInstance {
  id: string;
  pluginId: string;
  projectId?: string;
  config: Record<string, any>;
}

export interface PluginAPI {
  registerAction: (name: string, action: () => void) => void;
  unregisterAction: (name: string) => void;
  getConfig: <T = any>(key: string) => T | undefined;
  setConfig: <T = any>(key: string, value: T) => void;
  emit: (event: string, data?: any) => void;
  on: (event: string, callback: (data: any) => void) => () => void;
}

type PluginAction = () => void;
type PluginEventCallback = (data: any) => void;

interface PluginContext {
  plugin: Plugin;
  api: PluginAPI;
}

class PluginManager {
  private plugins: Map<string, Plugin> = new Map();
  private instances: Map<string, PluginInstance> = new Map();
  private actions: Map<string, Map<string, PluginAction>> = new Map();
  private events: Map<string, Set<PluginEventCallback>> = new Map();
  private pluginContexts: Map<string, PluginContext> = new Map();

  async loadPlugin(pluginData: Omit<Plugin, 'id'>): Promise<Plugin> {
    const plugin: Plugin = {
      ...pluginData,
      id: uuidv4()
    };

    this.plugins.set(plugin.id, plugin);

    const api = this.createPluginAPI(plugin);
    this.pluginContexts.set(plugin.id, { plugin, api });

    if (plugin.enabled) {
      await this.initializePlugin(plugin.id);
    }

    return plugin;
  }

  private createPluginAPI(plugin: Plugin): PluginAPI {
    const actions = new Map<string, PluginAction>();
    this.actions.set(plugin.id, actions);

    return {
      registerAction: (name: string, action: PluginAction) => {
        actions.set(name, action);
      },
      unregisterAction: (name: string) => {
        actions.delete(name);
      },
      getConfig: <T = any>(key: string): T | undefined => {
        return plugin.config[key] as T;
      },
      setConfig: <T = any>(key: string, value: T) => {
        plugin.config[key] = value;
        this.emit('plugin-config-updated', { pluginId: plugin.id, key, value });
      },
      emit: (event: string, data?: any) => {
        this.events.get(event)?.forEach(callback => callback({ pluginId: plugin.id, data }));
      },
      on: (event: string, callback: PluginEventCallback) => {
        if (!this.events.has(event)) {
          this.events.set(event, new Set());
        }
        this.events.get(event)!.add(callback);

        return () => {
          this.events.get(event)?.delete(callback);
        };
      }
    };
  }

  async initializePlugin(pluginId: string): Promise<void> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin ${pluginId} not found`);
    }

    plugin.enabled = true;
    this.plugins.set(pluginId, plugin);

    console.log(`Plugin ${plugin.name} initialized`);
  }

  async disablePlugin(pluginId: string): Promise<void> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin ${pluginId} not found`);
    }

    plugin.enabled = false;
    this.plugins.set(pluginId, plugin);

    this.actions.get(pluginId)?.clear();

    console.log(`Plugin ${plugin.name} disabled`);
  }

  async uninstallPlugin(pluginId: string): Promise<void> {
    await this.disablePlugin(pluginId);
    this.plugins.delete(pluginId);
    this.instances.delete(pluginId);
    this.actions.delete(pluginId);
    this.pluginContexts.delete(pluginId);
  }

  getPlugin(pluginId: string): Plugin | undefined {
    return this.plugins.get(pluginId);
  }

  getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  getEnabledPlugins(): Plugin[] {
    return Array.from(this.plugins.values()).filter(p => p.enabled);
  }

  executeAction(pluginId: string, actionName: string): void {
    const actions = this.actions.get(pluginId);
    const action = actions?.get(actionName);
    
    if (action) {
      action();
    } else {
      console.warn(`Action ${actionName} not found for plugin ${pluginId}`);
    }
  }

  emit(event: string, data?: any): void {
    this.events.get(event)?.forEach(callback => callback(data));
  }

  on(event: string, callback: PluginEventCallback): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event)!.add(callback);

    return () => {
      this.events.get(event)?.delete(callback);
    };
  }

  async installPlugin(pluginId: string, projectId?: string): Promise<PluginInstance> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin ${pluginId} not found`);
    }

    if (!plugin.enabled) {
      await this.initializePlugin(pluginId);
    }

    const instance: PluginInstance = {
      id: uuidv4(),
      pluginId,
      projectId,
      config: { ...plugin.config }
    };

    this.instances.set(instance.id, instance);

    return instance;
  }

  async uninstallPluginInstance(instanceId: string): Promise<void> {
    this.instances.delete(instanceId);
  }

  getPluginInstances(projectId?: string): PluginInstance[] {
    return Array.from(this.instances.values()).filter(
      instance => !projectId || instance.projectId === projectId
    );
  }
}

export const pluginManager = new PluginManager();

export function usePlugins() {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPlugins = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/plugins');
      const data = await response.json();
      
      if (data.success) {
        setPlugins(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to load plugins');
    } finally {
      setLoading(false);
    }
  }, []);

  const installPlugin = useCallback(async (pluginId: string, projectId?: string) => {
    setLoading(true);
    
    try {
      const response = await fetch(`/api/plugins/${pluginId}/install`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId })
      });
      
      const data = await response.json();
      
      if (data.success) {
        await loadPlugins();
        return data.data;
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to install plugin');
    } finally {
      setLoading(false);
    }
  }, [loadPlugins]);

  const uninstallPlugin = useCallback(async (pluginId: string) => {
    setLoading(true);
    
    try {
      const response = await fetch(`/api/plugins/${pluginId}/uninstall`, {
        method: 'POST'
      });
      
      const data = await response.json();
      
      if (data.success) {
        await loadPlugins();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to uninstall plugin');
    } finally {
      setLoading(false);
    }
  }, [loadPlugins]);

  useEffect(() => {
    loadPlugins();
  }, [loadPlugins]);

  return {
    plugins,
    loading,
    error,
    loadPlugins,
    installPlugin,
    uninstallPlugin
  };
}
