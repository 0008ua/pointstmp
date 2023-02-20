import { GameType } from '../entities/game.entity';

export class CreateGameDto {
  type: GameType;
  rounds: {
    _id: string;
    players: {
      _id: string;
      score: number;
    }[];
  }[];
}
