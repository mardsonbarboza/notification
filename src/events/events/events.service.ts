import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  notifyUser(userId: string, message: string) {
    console.log(`Notificando usuário ${userId}: ${message}`);
    // Aqui vai lógica mais pesada (BD, etc)
  }
}