import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';

interface UserPresence {
  id: string;
  name: string;
  color: string;
  cursor?: { x: number; y: number };
  selection?: string[];
  lastActive: number;
}

interface ProjectPresence {
  users: Map<string, UserPresence>;
}

const USER_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
];

export class PresenceManager {
  private projectPresence: Map<string, ProjectPresence> = new Map();

  joinProject(projectId: string, socketId: string, user: any): UserPresence {
    if (!this.projectPresence.has(projectId)) {
      this.projectPresence.set(projectId, { users: new Map() });
    }

    const presence = this.projectPresence.get(projectId)!;
    
    const userPresence: UserPresence = {
      id: user.id || uuidv4(),
      name: user.name,
      color: this.assignColor(projectId),
      cursor: undefined,
      selection: [],
      lastActive: Date.now()
    };

    presence.users.set(socketId, userPresence);
    
    logger.info(`User ${user.name} presence tracked in project ${projectId}`);
    
    return userPresence;
  }

  leaveProject(projectId: string, socketId: string): void {
    const presence = this.projectPresence.get(projectId);
    if (presence) {
      presence.users.delete(socketId);
      
      if (presence.users.size === 0) {
        this.projectPresence.delete(projectId);
      }
    }
    
    logger.info(`User presence removed from project ${projectId}`);
  }

  getProjectUsers(projectId: string): UserPresence[] {
    const presence = this.projectPresence.get(projectId);
    if (!presence) return [];
    
    return Array.from(presence.users.values());
  }

  getUser(projectId: string, socketId: string): UserPresence | undefined {
    const presence = this.projectPresence.get(projectId);
    return presence?.users.get(socketId);
  }

  updateCursor(projectId: string, socketId: string, position: { x: number; y: number }): void {
    const presence = this.projectPresence.get(projectId);
    if (presence) {
      const user = presence.users.get(socketId);
      if (user) {
        user.cursor = position;
        user.lastActive = Date.now();
      }
    }
  }

  updateSelection(projectId: string, socketId: string, selection: string[]): void {
    const presence = this.projectPresence.get(projectId);
    if (presence) {
      const user = presence.users.get(socketId);
      if (user) {
        user.selection = selection;
        user.lastActive = Date.now();
      }
    }
  }

  private assignColor(projectId: string): string {
    const presence = this.projectPresence.get(projectId);
    if (!presence) return USER_COLORS[0];
    
    const usedColors = new Set(Array.from(presence.users.values()).map(u => u.color));
    const availableColors = USER_COLORS.filter(c => !usedColors.has(c));
    
    return availableColors.length > 0 
      ? availableColors[0] 
      : USER_COLORS[Math.floor(Math.random() * USER_COLORS.length)];
  }

  getActiveUsers(projectId: string, timeout: number = 30000): UserPresence[] {
    const users = this.getProjectUsers(projectId);
    const now = Date.now();
    
    return users.filter(user => (now - user.lastActive) < timeout);
  }
}

export const presenceManager = new PresenceManager();
