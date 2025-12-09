import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { PrismaModule } from './prisma/prisma.module'; // ← Adicione

=======
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events/events.module';
>>>>>>> 3631e3dcb0081510f2b6772057d032046d03405f
import { NotificationModule } from './notification/notification.module';
import { EventsModule } from './events/events.module';

@Module({
<<<<<<< HEAD
  imports: [
    PrismaModule, // ← ADICIONE ISSO (primeira linha!)
    EventsModule,
    NotificationModule,
    // ... outros módulos
  ],
=======
  imports: [EventsModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> 3631e3dcb0081510f2b6772057d032046d03405f
})
export class AppModule {}
