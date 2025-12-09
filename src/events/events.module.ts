import { Module, forwardRef } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { NotificationModule } from '../../notification/notification.module';

import { NotificationModule } from '../notification/notification.module'; // ← Adicione

@Module({
<<<<<<< HEAD:src/events/events.module.ts
  imports: [NotificationModule], // ← Adicione

=======
  imports: [forwardRef(() => NotificationModule)],
>>>>>>> 3631e3dcb0081510f2b6772057d032046d03405f:src/events/events/events.module.ts
  providers: [EventsGateway, EventsService],
  exports: [EventsService],
})
export class EventsModule {}
