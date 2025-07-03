// app.module.ts
import { Module } from '@nestjs/common';
import { EmailsModule } from './emails/emails.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [EmailsModule],
  providers: [PrismaService],
})
export class AppModule {}
