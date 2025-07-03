// src/emails/emails.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Email, Priority } from '@prisma/client';

@Injectable()
export class EmailsService {
  constructor(private prisma: PrismaService) {}

  async findAll(priority?: Priority): Promise<Email[]> {
    const emails = await this.prisma.email.findMany({
      where: {
        deletedAt: null,
        ...(priority && { priority }),
      },
      orderBy: { createdAt: 'desc' },
    });

    const priorityOrder: Record<string, number> = {
      urgent: 0,
      high: 1,
      normal: 2,
      low: 3,
    };

    return emails.sort((a,b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  findOne(id: number): Promise<Email> {
    return this.prisma.email.findUniqueOrThrow({ where: { id } });
  }

  async toggleStar(id: number): Promise<Email> {
    const email = await this.findOne(id);
    return this.prisma.email.update({
      where: { id },
      data: { isStarred: !email.isStarred },
    });
  }

  delete(id: number): Promise<Email> {
    return this.prisma.email.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
