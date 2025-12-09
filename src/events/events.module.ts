import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';

import { NotificationModule } from '../notification/notification.module'; // ← Adicione

@Module({
  imports: [NotificationModule], // ← Adicione

  providers: [EventsGateway, EventsService],
  exports: [EventsService],
})
export class EventsModule {}
