import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { EventsService } from './events.service';
import { NotificationService } from '../../notification/notification.service';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('EventsGateway');

  constructor(
    private eventsService: EventsService,
    private notificationsService: NotificationService,
  ) {}

  handleConnection(client: Socket) {
    this.logger.log(`✅ Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`❌ Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomName: string,
  ) {
    client.join(roomName);
    this.logger.log(`📍 Cliente entrou na sala: ${roomName}`);
    this.server.to(roomName).emit('userJoined', {
      clientId: client.id,
      message: `Um novo usuário entrou`,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('notifyRoom')
  async handleNotifyRoom(@MessageBody() { room, userId, title, message }: any) {
    this.logger.log(`📤 Notificação: ${title}`);

    // 💾 Salva no banco
    await this.notificationsService.create(userId, title, message);

    // 📤 Envia via WebSocket
    this.server.to(room).emit('notification', {
      title,
      message,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('notifyUser')
  async handleNotifyUser(
    @ConnectedSocket() client: Socket,
    @MessageBody() { userId, title, message }: any,
  ) {
    this.logger.log(`📧 Privado: ${title}`);

    // 💾 Salva no banco
    await this.notificationsService.create(userId, title, message);

    // 📤 Envia privado
    this.server.to(userId).emit('privateNotification', {
      title,
      message,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('getHistory')
  async handleGetHistory(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId: string,
  ) {
    this.logger.log(`📋 Histórico: ${userId}`);

    // 📖 Pega do banco
    const notifications = await this.notificationsService.getByUser(userId);

    // 📤 Envia histórico
    client.emit('notificationHistory', notifications);
  }
}
