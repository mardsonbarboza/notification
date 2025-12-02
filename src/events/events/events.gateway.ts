import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { EventsService } from './events.service';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private eventsService: EventsService) {}

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() roomName: string) {
    client.join(roomName);
    console.log(`Cliente ${client.id} entrou na sala ${roomName}`);
  }

  @SubscribeMessage('notifyRoom')
  handleNotifyRoom(@MessageBody() { room, message }: any) {
    this.server.to(room).emit('notification', message);
    console.log(`Notificação enviada pra sala ${room}`);
  }
}