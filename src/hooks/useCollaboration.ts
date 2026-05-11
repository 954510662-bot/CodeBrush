import { useEffect, useRef, useCallback, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useStore } from '../store';

interface UserPresence {
  id: string;
  name: string;
  color: string;
  cursor?: { x: number; y: number };
  selection?: string[];
}

interface CollaborationState {
  isConnected: boolean;
  users: UserPresence[];
  conflict: any | null;
}

interface UseCollaborationOptions {
  projectId: string;
  user: {
    id: string;
    name: string;
  };
}

export function useCollaboration({ projectId, user }: UseCollaborationOptions) {
  const socketRef = useRef<Socket | null>(null);
  const [state, setState] = useState<CollaborationState>({
    isConnected: false,
    users: [],
    conflict: null
  });

  const { updateLayer, addLayer, deleteLayer, selectLayers } = useStore();

  useEffect(() => {
    const socket = io(process.env.REACT_APP_WS_URL || 'http://localhost:3001', {
      transports: ['websocket', 'polling']
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to collaboration server');
      socket.emit('join-project', {
        projectId,
        user: { id: user.id, name: user.name }
      });
      setState(prev => ({ ...prev, isConnected: true }));
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from collaboration server');
      setState(prev => ({ ...prev, isConnected: false }));
    });

    socket.on('current-users', ({ users }: { users: UserPresence[] }) => {
      setState(prev => ({ ...prev, users }));
    });

    socket.on('user-joined', ({ users }: { users: UserPresence[] }) => {
      setState(prev => ({ ...prev, users }));
    });

    socket.on('user-left', ({ users }: { users: UserPresence[] }) => {
      setState(prev => ({ ...prev, users }));
    });

    socket.on('document-updated', ({ userId, data, timestamp }: any) => {
      if (userId !== user.id) {
        handleRemoteUpdate(data);
      }
    });

    socket.on('conflict-detected', ({ conflict, currentState }: any) => {
      setState(prev => ({ ...prev, conflict }));
    });

    socket.on('conflict-resolved', ({ state: newState }: any) => {
      setState(prev => ({ ...prev, conflict: null }));
    });

    socket.on('cursor-updated', ({ users }: { users: UserPresence[] }) => {
      setState(prev => ({ ...prev, users }));
    });

    socket.on('selection-updated', ({ users }: { users: UserPresence[] }) => {
      setState(prev => ({ ...prev, users }));
    });

    return () => {
      socket.emit('leave-project', { projectId, userId: user.id });
      socket.disconnect();
    };
  }, [projectId, user.id, user.name]);

  const handleRemoteUpdate = useCallback((data: any) => {
    switch (data.type) {
      case 'create':
        if (data.layer) {
          addLayer(projectId, data.layer);
        }
        break;
      case 'update':
        if (data.layerId && data.updates) {
          updateLayer(projectId, data.layerId, data.updates);
        }
        break;
      case 'delete':
        if (data.layerId) {
          deleteLayer(projectId, data.layerId);
        }
        break;
    }
  }, [projectId, updateLayer, addLayer, deleteLayer]);

  const sendUpdate = useCallback((data: any) => {
    if (socketRef.current) {
      socketRef.current.emit('document-update', {
        type: 'update',
        projectId,
        userId: user.id,
        data,
        timestamp: Date.now()
      });
    }
  }, [projectId, user.id]);

  const sendCursorPosition = useCallback((position: { x: number; y: number }) => {
    if (socketRef.current) {
      socketRef.current.emit('cursor-move', {
        projectId,
        userId: user.id,
        position
      });
    }
  }, [projectId, user.id]);

  const sendSelection = useCallback((selection: string[]) => {
    if (socketRef.current) {
      socketRef.current.emit('selection-change', {
        projectId,
        userId: user.id,
        selection
      });
    }
  }, [projectId, user.id]);

  const resolveConflict = useCallback((resolution: 'local' | 'remote' | 'merge', mergedState?: any) => {
    if (socketRef.current) {
      socketRef.current.emit('resolve-conflict', {
        projectId,
        resolution,
        mergedState
      });
    }
  }, [projectId]);

  const requestSync = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit('request-sync', { projectId });
    }
  }, [projectId]);

  return {
    ...state,
    sendUpdate,
    sendCursorPosition,
    sendSelection,
    resolveConflict,
    requestSync
  };
}
