import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events/events.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [EventsModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
