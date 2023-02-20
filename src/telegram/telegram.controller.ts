import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TelegramService } from './telegram.service';
import { Request } from 'express';
import { GamerService } from 'src/gamer/gamer.service';
import {
  MessageThousandRound,
  MessageThousandRoundDto,
} from './dto/message.dto';

@Controller(['tg'])
export class TelegramController {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly gamerService: GamerService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Patch('unsubscribe/:_id')
  async unsubscribe(@Param('_id') _id: string, @Req() { user }: Request) {
    return this.telegramService.unsubscribeFromBot(_id, user._id);
  }

  async composeMessageThousandRound(
    messages: MessageThousandRoundDto[],
  ): Promise<string> {
    let text = `<b>Thousand - 1000</b>\n\n`;

    for (const message of messages) {
      const gamer = await this.gamerService.findOneAllData(message.gamerId);
      text += `<i>${gamer.name}:</i> ${message.currentScore} total: ${message.totalScore}\n`;
    }

    return text;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('messages/thousand-round')
  async messages(
    @Req() { user }: Request,
    @Body() messages: MessageThousandRoundDto[],
  ) {
    console.log('messages', messages);
    const text = await this.composeMessageThousandRound(messages);

    for (const message of messages) {
      const gamer = await this.gamerService.findOneAllData(
        message.gamerId,
        user._id,
      );

      if (gamer.telegramId) {
        this.telegramService.sendMessage({
          chatId: gamer.telegramId,
          text,
        });
      }
    }
  }
}
