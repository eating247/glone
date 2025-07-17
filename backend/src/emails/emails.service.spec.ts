import { Test, TestingModule } from '@nestjs/testing';
import { EmailsService } from './emails.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Priority } from '@prisma/client';

describe('EmailsService', () => {
  let service: EmailsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailsService,
        {
          provide: PrismaService,
          useValue: {
            email: {
              findMany: jest.fn(),
              findUniqueOrThrow: jest.fn(),
              update: jest.fn(),
              $queryRawUnsafe: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<EmailsService>(EmailsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all emails when no priority filter', async () => {
      const mockEmails = [
        {
          id: 1,
          from: 'test@example.com',
          to: 'user@example.com',
          subject: 'Test 1',
          body: 'Test body',
          isRead: false,
          isStarred: false,
          priority: 'high' as Priority,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 2,
          from: 'test2@example.com',
          to: 'user@example.com',
          subject: 'Test 2',
          body: 'Test body 2',
          isRead: false,
          isStarred: false,
          priority: 'low' as Priority,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];

      jest.spyOn(prismaService.email, 'findMany').mockResolvedValue(mockEmails);

      const result = await service.findAll();

      expect(result).toEqual(mockEmails);
      expect(prismaService.email.findMany).toHaveBeenCalledWith({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('findOne', () => {
    it('should return email by id', async () => {
      const mockEmail = {
        id: 1,
        from: 'test@example.com',
        to: 'user@example.com',
        subject: 'Test Email',
        body: 'Test body',
        isRead: false,
        isStarred: false,
        priority: 'normal' as Priority,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      jest
        .spyOn(prismaService.email, 'findUniqueOrThrow')
        .mockResolvedValue(mockEmail);

      const result = await service.findOne(1);

      expect(result).toEqual(mockEmail);
    });

    it('should throw NotFoundException for non-existent email', async () => {
      jest
        .spyOn(prismaService.email, 'findUniqueOrThrow')
        .mockRejectedValue(new NotFoundException('Not found'));

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
