import { singleton } from 'tsyringe';

@singleton()
export class ConnectionManager {
  private _userSockets = new Map<string, Set<string>>();

  addConnection(userId: string, socketId: string) {
    if (!this._userSockets.has(userId)) {
      this._userSockets.set(userId, new Set());
    }

    this._userSockets.get(userId)?.add(socketId);
  }

  removeConnection(userId: string, socketId: string) {
    const sockets = this._userSockets.get(userId);
    if (sockets) {
      sockets.delete(socketId);
      if (sockets.size === 0) {
        this._userSockets.delete(userId);
      }
    }
  }

  getSockets(userId: string): string[] {
    const sockets = this._userSockets.get(userId);
    return sockets ? Array.from(sockets) : [];
  }
}
