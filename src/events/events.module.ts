import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
<<<<<<< HEAD:src/events/events.module.ts
import { NotificationModule } from '../notification/notification.module'; // ← Adicione

@Module({
  imports: [NotificationModule], // ← Adicione
=======
import { NotificationModule } from '../../notification/notification.module';

@Module({
  imports: [NotificationModule],
>>>>>>> 5f1b440f6898ae596acfe443eba8c8f0a7ef2343:src/events/events/events.module.ts
  providers: [EventsGateway, EventsService],
  exports: [EventsService],
})
export class EventsModule {}
