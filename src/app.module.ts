import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from './events/events/events.gateway';
import { EventsModule } from './events/events/events.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [EventsModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
