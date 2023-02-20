import { HttpException, HttpStatus } from '@nestjs/common';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

export enum GameType {
  Rummy = 'rummy',
  Uno = 'uno',
  Thousand = 'thousand',
  Train = 'train',
}

@Schema({
  timestamps: true,
  collection: 'games',
  statics: {
    async createGame(game: Game): Promise<any> {
      try {
        return this.create(game);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    },
  },
})
export class Game {
  @Prop({ required: true })
  owner: string;

  @Prop({ required: true, enum: GameType })
  type: GameType;

  @Prop({ type: () => [Round] })
  rounds: Round[];
}

class Score {
  @Prop({ required: true, default: 0 })
  score: number;
}

class Round {
  @Prop({ type: () => [Score] })
  players: Score[];
}

export type GameDocument = HydratedDocument<Game>;
export interface GameModel extends Model<GameDocument> {
  createGame(game: Game): Promise<any>;
}

export const GameSchema = SchemaFactory.createForClass(Game);
