import { Module } from '@nestjs/common';
<<<<<<< HEAD
=======
import { PrismaModule } from '../prisma/prisma.module';
import { EventsModule } from '../events/events/events.module';
>>>>>>> 5f4f77808fab4491ae31c01e82714619d02675a4
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { EventsModule } from '../events/events.module';


@Module({
<<<<<<< HEAD
  imports: [], // ← ADICIONE ISSO
=======
  imports: [PrismaModule, EventsModule],
>>>>>>> 5f4f77808fab4491ae31c01e82714619d02675a4
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}