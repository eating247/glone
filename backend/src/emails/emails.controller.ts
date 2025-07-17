// src/emails/emails.controller.ts
import {
  Controller,
  Get,
  Param,
  Query,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EmailsService } from './emails.service';
import { Priority } from '@prisma/client';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Get()
  findAll(@Query('priority') priority?: Priority) {
    return this.emailsService.findAll(priority);
  }

  @Get('search')
  search(@Query('q') query?: string) {
    return this.emailsService.search(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.emailsService.findOne(id);
  }

  @Patch(':id/star')
  toggleStar(@Param('id', ParseIntPipe) id: number) {
    return this.emailsService.toggleStar(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.emailsService.delete(id);
  }
}
