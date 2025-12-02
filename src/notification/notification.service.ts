import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService {
  private logger = new Logger('NotificationService');

  constructor(private prisma: PrismaService) {}

  async create(userId: string, title: string, message: string) {
    this.logger.log(`💾 Salvando: ${title}`);
    return this.prisma.notification.create({
      data: { userId, title, message },
    });
  }

  async getByUser(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { read: true },
    });
  }
}
