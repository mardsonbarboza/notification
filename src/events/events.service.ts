import { Injectable, Logger } from '@nestjs/common';
import { Server } from 'socket.io';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class EventsService {
  private logger = new Logger('EventsService');
  private server: Server;

  constructor(private notificationService: NotificationService) {}

  // Método para o Gateway registrar o servidor Socket.IO
  setServer(server: Server) {
    this.server = server;
  }

  // Notificar usuário específico
  async notifyUser(userId: string, title: string, message: string) {
    this.logger.log(`📧 Notificando usuário ${userId}: ${title}`);

    // 1. Salva no banco
    await this.notificationService.create(userId, title, message);

    // 2. Envia via WebSocket (se conectado)
    if (this.server) {
      this.server.to(userId).emit('privateNotification', {
        title,
        message,
        timestamp: new Date(),
      });
    }
  }

  // Notificar sala inteira
  async notifyRoom(
    room: string,
    userId: string,
    title: string,
    message: string,
  ) {
    this.logger.log(`📤 Notificando sala ${room}: ${title}`);

    // 1. Salva no banco
    await this.notificationService.create(userId, title, message);

    // 2. Envia para a sala
    if (this.server) {
      this.server.to(room).emit('notification', {
        title,
        message,
        timestamp: new Date(),
      });
    }
  }

  // Broadcast para todos conectados
  async broadcastAll(title: string, message: string) {
    this.logger.log(`📢 Broadcast: ${title}`);

    if (this.server) {
      this.server.emit('broadcast', {
        title,
        message,
        timestamp: new Date(),
      });
    }
  }

  // Verificar se usuário está online
  isUserOnline(userId: string): boolean {
    if (!this.server) return false;

    const sockets = this.server.sockets.sockets;
    for (const [socketId, socket] of sockets) {
      if (socket.data?.userId === userId) {
        return true;
      }
    }
    return false;
  }

  // Contar usuários em uma sala
  getRoomUserCount(room: string): number {
    if (!this.server) return 0;

    const roomSockets = this.server.sockets.adapter.rooms.get(room);
    return roomSockets ? roomSockets.size : 0;
  }
}
