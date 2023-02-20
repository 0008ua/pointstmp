import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './entities/game.entity';
import { TelegramModule } from 'src/telegram/telegram.module';
import { GamerModule } from 'src/gamer/gamer.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    TelegramModule,
    GamerModule,
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
