import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { EventsModule } from '../events/events/events.module';
import { NotificationService } from './notification.service';

@Module({
  imports: [PrismaModule, EventsModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
