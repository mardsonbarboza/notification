import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { EventsService } from './events.service';
import { NotificationService } from '../notification/notification.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class EventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  private logger = new Logger('EventsGateway');

  constructor(
    private eventsService: EventsService,
    private notificationsService: NotificationService,
  ) {}

  // Inicializa o servidor no service
  afterInit(server: Server) {
    this.eventsService.setServer(server);
    this.logger.log('🚀 WebSocket Server inicializado!');
  }

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

    const userCount = this.eventsService.getRoomUserCount(roomName);

    this.server.to(roomName).emit('userJoined', {
      clientId: client.id,
      message: `Um novo usuário entrou`,
      userCount: userCount,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('notifyRoom')
  async handleNotifyRoom(@MessageBody() { room, userId, title, message }: any) {
    // Agora usa o service
    await this.eventsService.notifyRoom(room, userId, title, message);
  }

  @SubscribeMessage('notifyUser')
  async handleNotifyUser(
    @ConnectedSocket() client: Socket,
    @MessageBody() { userId, title, message }: any,
  ) {
    // Agora usa o service
    await this.eventsService.notifyUser(userId, title, message);
  }

  @SubscribeMessage('getHistory')
  async handleGetHistory(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId: string,
  ) {
    this.logger.log(`📋 Histórico: ${userId}`);

    const notifications = await this.notificationsService.getByUser(userId);

    client.emit('notificationHistory', notifications);
  }

  @SubscribeMessage('checkUserOnline')
  handleCheckUserOnline(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId: string,
  ) {
    const isOnline = this.eventsService.isUserOnline(userId);

    client.emit('userOnlineStatus', {
      userId,
      isOnline,
      timestamp: new Date(),
    });
  }
}
