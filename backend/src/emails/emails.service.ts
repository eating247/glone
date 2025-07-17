// src/emails/emails.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
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

    return emails.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
    );
  }

  async findOne(id: number): Promise<Email> {
    try {
      return this.prisma.email.findUniqueOrThrow({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Email with ${id} not found`);
    }
  }

  async toggleStar(id: number): Promise<Email> {
    try {
      const email = await this.findOne(id);
      return this.prisma.email.update({
        where: { id },
        data: { isStarred: !email.isStarred },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to toggle star');
    }
  }

  async delete(id: number): Promise<Email> {
    try {
      await this.findOne(id);
      return this.prisma.email.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete email');
    }
  }

  async search(query: string): Promise<Email[]> {
    if (!query || !query.trim()) {
      throw new BadRequestException('Query string is required');
    }
    const searchQuery = `
      SELECT *, 
             MATCH(subject, body, \`from\`, \`to\`) AGAINST(? IN NATURAL LANGUAGE MODE) as relevance
      FROM emails 
      WHERE MATCH(subject, body, \`from\`, \`to\`) AGAINST(? IN NATURAL LANGUAGE MODE)
      AND deletedAt is NULL
      ORDER BY relevance DESC
      LIMIT 100
    `;

    const searchParams = [query, query];
    try {
      return await this.prisma.$queryRawUnsafe(searchQuery, ...searchParams);
    } catch (error) {
      console.log('search failed', error);
      throw new InternalServerErrorException('Search failed');
    }
  }
}
