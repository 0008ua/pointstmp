import { GameType, UID } from '../../app.interfaces';

export interface RatingRequest {
  userId: UID;
  gameType: GameType;
}
