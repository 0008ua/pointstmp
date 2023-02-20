import { ParseMode } from 'telegraf/typings/core/types/typegram';

export interface Message {
  chatId: string;
  text: string;
}

export interface MessageThousandRound extends Message {
  currentScore: string;
  totalScore: string;
}

// export type SendMessageType<T> = (message: T, parse_mode?: ParseMode) => void

export interface MessageThousandRoundDto {
  gamerId: string;
  currentScore: string;
  totalScore: string;
}
