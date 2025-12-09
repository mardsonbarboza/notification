import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventsService } from '../events/events.service';

@Controller('notifications')
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private eventsService: EventsService, // ← Injeta o EventsService
  ) {}

  @Post('send')
  async sendNotification(
    @Body() body: { userId: string; title: string; message: string },
  ) {
    // Envia notificação via WebSocket E salva no banco
    await this.eventsService.notifyUser(body.userId, body.title, body.message);

    return { success: true };
  }

  @Post('broadcast')
  async broadcastNotification(
    @Body() body: { title: string; message: string },
  ) {
    // Envia para todos conectados
    await this.eventsService.broadcastAll(body.title, body.message);

    return { success: true };
  }

  @Get('user/:userId')
  async getUserNotifications(@Param('userId') userId: string) {
    const notifications = await this.notificationService.getByUser(userId);
    const isOnline = this.eventsService.isUserOnline(userId);

    return {
      notifications,
      isOnline,
    };
  }
}
