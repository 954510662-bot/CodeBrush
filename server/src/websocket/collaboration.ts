import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';

interface Operation {
  id: string;
  userId: string;
  type: 'create' | 'update' | 'delete' | 'move';
  layerId?: string;
  data: any;
  timestamp: number;
  vectorClock: number;
}

interface Conflict {
  operationId: string;
  localOperation: Operation;
  remoteOperation: Operation;
  timestamp: number;
}

export class CollaborationManager {
  private operations: Map<string, Operation[]> = new Map();
  private pendingConflicts: Map<string, Conflict[]> = new Map();
  private vectorClocks: Map<string, Map<string, number>> = new Map();
  private userProjects: Map<string, Set<string>> = new Map();

  async joinProject(projectId: string, socketId: string, user: any): Promise<void> {
    if (!this.vectorClocks.has(projectId)) {
      this.vectorClocks.set(projectId, new Map());
    }
    
    const clock = this.vectorClocks.get(projectId)!;
    clock.set(socketId, 0);
    
    if (!this.userProjects.has(socketId)) {
      this.userProjects.set(socketId, new Set());
    }
    this.userProjects.get(socketId)!.add(projectId);
    
    logger.info(`User ${user.name} joined project ${projectId}`);
  }

  async leaveProject(projectId: string, socketId: string): Promise<void> {
    const clock = this.vectorClocks.get(projectId);
    if (clock) {
      clock.delete(socketId);
    }
    
    const userProjects = this.userProjects.get(socketId);
    if (userProjects) {
      userProjects.delete(projectId);
    }
    
    logger.info(`User left project ${projectId}`);
  }

  async applyUpdate(
    projectId: string,
    socketId: string,
    updateData: any,
    timestamp: number
  ): Promise<Conflict | null> {
    const operations = this.operations.get(projectId) || [];
    
    const lastOperation = operations[operations.length - 1];
    const localClock = this.vectorClocks.get(projectId)?.get(socketId) || 0;
    
    const conflict = this.detectConflict(lastOperation, updateData, localClock);
    
    if (conflict) {
      const conflicts = this.pendingConflicts.get(projectId) || [];
      conflicts.push(conflict);
      this.pendingConflicts.set(projectId, conflicts);
      
      await this.saveOperation(projectId, {
        id: uuidv4(),
        userId: socketId,
        type: updateData.type,
        layerId: updateData.layerId,
        data: updateData,
        timestamp,
        vectorClock: localClock + 1
      });
      
      return conflict;
    }

    await this.saveOperation(projectId, {
      id: uuidv4(),
      userId: socketId,
      type: updateData.type,
      layerId: updateData.layerId,
      data: updateData,
      timestamp,
      vectorClock: localClock + 1
    });

    const clock = this.vectorClocks.get(projectId);
    if (clock) {
      clock.set(socketId, localClock + 1);
    }

    return null;
  }

  private detectConflict(
    lastOperation: Operation | undefined,
    newOperation: any,
    localClock: number
  ): Conflict | null {
    if (!lastOperation) return null;

    if (
      lastOperation.layerId === newOperation.layerId &&
      lastOperation.userId !== newOperation.userId &&
      Math.abs(lastOperation.timestamp - newOperation.timestamp) < 1000
    ) {
      return {
        operationId: uuidv4(),
        localOperation: lastOperation,
        remoteOperation: {
          id: uuidv4(),
          userId: newOperation.userId,
          type: newOperation.type,
          layerId: newOperation.layerId,
          data: newOperation,
          timestamp: newOperation.timestamp,
          vectorClock: localClock + 1
        },
        timestamp: Date.now()
      };
    }

    return null;
  }

  private async saveOperation(projectId: string, operation: Operation): Promise<void> {
    const operations = this.operations.get(projectId) || [];
    operations.push(operation);
    
    if (operations.length > 1000) {
      operations.splice(0, operations.length - 1000);
    }
    
    this.operations.set(projectId, operations);
  }

  async resolveConflict(
    projectId: string,
    socketId: string,
    resolution: 'local' | 'remote' | 'merge',
    mergedState?: any
  ): Promise<void> {
    const conflicts = this.pendingConflicts.get(projectId) || [];
    const conflictIndex = conflicts.findIndex(c => 
      c.remoteOperation.userId === socketId
    );
    
    if (conflictIndex !== -1) {
      const conflict = conflicts[conflictIndex];
      conflicts.splice(conflictIndex, 1);
      this.pendingConflicts.set(projectId, conflicts);
      
      switch (resolution) {
        case 'local':
          logger.info(`Conflict resolved with local version for project ${projectId}`);
          break;
        case 'remote':
          logger.info(`Conflict resolved with remote version for project ${projectId}`);
          break;
        case 'merge':
          if (mergedState) {
            await this.saveOperation(projectId, {
              id: uuidv4(),
              userId: socketId,
              type: 'update',
              layerId: conflict.remoteOperation.layerId,
              data: mergedState,
              timestamp: Date.now(),
              vectorClock: (this.vectorClocks.get(projectId)?.get(socketId) || 0) + 1
            });
            logger.info(`Conflict resolved with merge for project ${projectId}`);
          }
          break;
      }
    }
  }

  async getProjectState(projectId: string): Promise<any> {
    const operations = this.operations.get(projectId) || [];
    
    const state: any = { layers: [], viewport: {} };
    
    for (const op of operations) {
      if (op.data.type === 'create' && op.data.layer) {
        state.layers.push(op.data.layer);
      } else if (op.data.type === 'update') {
        const index = state.layers.findIndex((l: any) => l.id === op.data.layerId);
        if (index !== -1) {
          state.layers[index] = { ...state.layers[index], ...op.data.updates };
        }
      } else if (op.data.type === 'delete') {
        state.layers = state.layers.filter((l: any) => l.id !== op.data.layerId);
      }
    }
    
    return state;
  }

  async getUserProjects(socketId: string): Promise<string[]> {
    return Array.from(this.userProjects.get(socketId) || []);
  }
}

export const collaborationManager = new CollaborationManager();
