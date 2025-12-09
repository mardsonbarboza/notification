import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module'; // ← Adicione

import { NotificationModule } from './notification/notification.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    PrismaModule, // ← ADICIONE ISSO (primeira linha!)
    EventsModule,
    NotificationModule,
    // ... outros módulos
  ],
})
export class AppModule {}
