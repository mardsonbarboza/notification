<<<<<<< HEAD
import { Module } from '@nestjs/common';

=======
import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { EventsModule } from '../events/events/events.module';
>>>>>>> 3631e3dcb0081510f2b6772057d032046d03405f
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { EventsModule } from '../events/events.module';
import { PrismaModule } from '../prisma/prisma.module';


@Module({
  imports: [PrismaModule, forwardRef(() => EventsModule)],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}