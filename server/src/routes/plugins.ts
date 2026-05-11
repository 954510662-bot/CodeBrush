import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const router = Router();

interface Plugin {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  enabled: boolean;
  config: Record<string, any>;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

interface PluginInstance {
  id: string;
  pluginId: string;
  projectId?: string;
  config: Record<string, any>;
}

const plugins: Map<string, Plugin> = new Map();
const pluginInstances: Map<string, PluginInstance> = new Map();

const pluginSchema = z.object({
  name: z.string().min(1),
  version: z.string(),
  description: z.string().optional(),
  author: z.string(),
  config: z.record(z.any()).optional(),
  permissions: z.array(z.string()).optional()
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const validated = pluginSchema.parse(req.body);
    
    const plugin: Plugin = {
      id: uuidv4(),
      name: validated.name,
      version: validated.version,
      description: validated.description || '',
      author: validated.author,
      enabled: false,
      config: validated.config || {},
      permissions: validated.permissions || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    plugins.set(plugin.id, plugin);
    
    res.status(201).json({ success: true, data: plugin });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: error.errors });
    }
    res.status(500).json({ success: false, error: 'Failed to create plugin' });
  }
});

router.get('/', (req: Request, res: Response) => {
  const allPlugins = Array.from(plugins.values());
  res.json({ success: true, data: allPlugins });
});

router.get('/:id', (req: Request, res: Response) => {
  const plugin = plugins.get(req.params.id);
  
  if (!plugin) {
    return res.status(404).json({ success: false, error: 'Plugin not found' });
  }
  
  res.json({ success: true, data: plugin });
});

router.put('/:id', (req: Request, res: Response) => {
  const plugin = plugins.get(req.params.id);
  
  if (!plugin) {
    return res.status(404).json({ success: false, error: 'Plugin not found' });
  }

  const { name, description, config, enabled } = req.body;
  
  if (name) plugin.name = name;
  if (description !== undefined) plugin.description = description;
  if (config) plugin.config = { ...plugin.config, ...config };
  if (enabled !== undefined) plugin.enabled = enabled;
  plugin.updatedAt = new Date().toISOString();

  res.json({ success: true, data: plugin });
});

router.delete('/:id', (req: Request, res: Response) => {
  const deleted = plugins.delete(req.params.id);
  
  if (!deleted) {
    return res.status(404).json({ success: false, error: 'Plugin not found' });
  }
  
  res.json({ success: true, message: 'Plugin deleted' });
});

router.post('/:id/enable', (req: Request, res: Response) => {
  const plugin = plugins.get(req.params.id);
  
  if (!plugin) {
    return res.status(404).json({ success: false, error: 'Plugin not found' });
  }

  plugin.enabled = true;
  plugin.updatedAt = new Date().toISOString();
  
  res.json({ success: true, data: plugin });
});

router.post('/:id/disable', (req: Request, res: Response) => {
  const plugin = plugins.get(req.params.id);
  
  if (!plugin) {
    return res.status(404).json({ success: false, error: 'Plugin not found' });
  }

  plugin.enabled = false;
  plugin.updatedAt = new Date().toISOString();
  
  res.json({ success: true, data: plugin });
});

router.post('/:id/install', (req: Request, res: Response) => {
  const plugin = plugins.get(req.params.id);
  
  if (!plugin) {
    return res.status(404).json({ success: false, error: 'Plugin not found' });
  }

  if (!plugin.enabled) {
    return res.status(400).json({ success: false, error: 'Plugin must be enabled before installation' });
  }

  const instance: PluginInstance = {
    id: uuidv4(),
    pluginId: plugin.id,
    projectId: req.body.projectId,
    config: plugin.config
  };

  pluginInstances.set(instance.id, instance);
  
  res.status(201).json({ success: true, data: instance });
});

router.post('/:id/uninstall', (req: Request, res: Response) => {
  const { instanceId } = req.body;
  
  if (instanceId) {
    const deleted = pluginInstances.delete(instanceId);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Plugin instance not found' });
    }
  } else {
    for (const [id, instance] of pluginInstances) {
      if (instance.pluginId === req.params.id) {
        pluginInstances.delete(id);
      }
    }
  }
  
  res.json({ success: true, message: 'Plugin uninstalled' });
});

router.get('/:id/instances', (req: Request, res: Response) => {
  const instances = Array.from(pluginInstances.values())
    .filter(i => i.pluginId === req.params.id);
  
  res.json({ success: true, data: instances });
});

export { router as pluginRoutes };
