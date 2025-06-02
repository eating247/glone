import { Module } from '@nestjs/common';
import { EmailsModule } from './emails/emails.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [EmailsModule],
  controllers: [HealthController],
})
export class AppModule {}
