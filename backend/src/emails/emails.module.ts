// emails/emails.module.ts
import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsController } from './emails.controller';
import { PrismaModule } from '../prisma/prisma.module';  // import PrismaModule

@Module({
  imports: [PrismaModule],  // <---- import here
  controllers: [EmailsController],
  providers: [EmailsService],
})
export class EmailsModule {}
