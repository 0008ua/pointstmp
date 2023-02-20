import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import {
  TelegrafModule,
  TelegrafModuleAsyncOptions,
  TelegrafModuleOptions,
} from 'nestjs-telegraf';
import {
  TelegrafFactory,
  // TelegramModuleAsyncOptions,
  TelegramOptions,
} from './telegram.interface';
import { TelegramService } from './telegram.service';
import { TelegramUpdate } from './telegram.update';
import { BindUserScene } from './scenes/bind-user';
import { GamerService } from 'src/gamer/gamer.service';
import { GamerModule } from 'src/gamer/gamer.module';
import { getTelegramConfig } from 'src/common/config/telegram.config';
import { TELEGRAM_BOT_NAME } from './telegram.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { sessionMiddleware } from './middlewares/session.middleware';
import { TelegramController } from './telegram.controller';
import { ViewSubscribtionsScene } from './scenes/view-subscribtions.scene';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';
// import { TelegrafDynamicModule } from './telegraf.module';

@Module({
  imports: [GamerModule, CommonModule, AuthModule],
  providers: [
    TelegramService,
    TelegramUpdate,
    BindUserScene,
    ViewSubscribtionsScene,
  ],
  exports: [TelegramService],
  controllers: [TelegramController],
})
export class TelegramModule {}
