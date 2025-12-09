import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { EventsModule } from '../events/events/events.module';
import { NotificationService } from './notification.service';

@Module({
  imports: [PrismaModule, forwardRef(() => EventsModule)],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
