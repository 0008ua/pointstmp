import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { TelegramService } from './telegram/telegram.service';

@Controller()
export class AppController {
  constructor(readonly telegramService: TelegramService) {}

  @Get()
  chat() {
    console.log('chat');
  }
}
