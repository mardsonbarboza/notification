import { Module, forwardRef } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { NotificationModule } from '../../notification/notification.module';

@Module({
  imports: [forwardRef(() => NotificationModule)],
  providers: [EventsGateway, EventsService],
  exports: [EventsService],
})
export class EventsModule {}
