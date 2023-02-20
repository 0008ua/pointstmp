import { environment } from '../environments/environment';

type UserRoles = 'member' | 'guest';
export type UID = string;
export type UUID = string;
export type RoundMemberUUID = string;
export type Colors = 'red' | 'green' | 'blue' | 'black' | 'yellow';
export type GameType = keyof typeof environment.games;

export interface IUser {
  _id?: UID;
  name: string;
  password: string;
  role?: UserRoles;
  createdAt?: string;
  updatedAt?: string;
}

export interface IGamer {
  _id?: UID;
  owner?: UID;
  name: string;
  // uniqueName?: string;
  rating?: any;
  color: Colors;
  telegramCheckCode: string;
  telegramSubscriptionName: string;
  // telegramIds?: string[];
  // createdAt?: string;
  // updatedAt?: string;
}

export type IGamerTotal = IGamer & { totalScore: number };

export interface PlayersResult {
  _id: UID;
  score: number;
}

export interface IGame {
  _id?: UID;
  type: GameType;
  owner?: UID;
  rounds: {
    _id?: UID;
    players: PlayersResult[];
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export type ClientGame = Pick<IGame, '_id' | 'type'>;

export interface Round {
  _id: string;
  roundMembers: RoundMemberUUID[]; // RoundMember
  clientGame?: ClientGame;
  icon?: string;
  name: string;
  namePostfix: string;
}

export interface RoundWithTotal {
  _id: string;
  players: PlayersResult[];
}

export interface ResultRoundWithTotal extends RoundWithTotal {
  _id: 'result';
}

export interface RoundMember {
  _id: RoundMemberUUID;
  player: UID; // Player
  scoresLine: number[];
  namedScoresLine?: NamedScore[];
}

export interface RoundCfg {
  _id: string;
  icon: string;
  namePostfix: string;
  initialScoresLine: number[];
  initialNamedScoresLine?: NamedScore[];
}

export type PersistStore = {
  _id: GameType;
  players: IGamer[];
};

export interface NamedScore {
  name: string;
  value: number;
  picture?: string;
  total?: number;
}

export type RoundScoresNameType = 'r' | 's' | 'score';
export type RoundScoresOptionsType = 'r' | 's';
export type RoundScoresDisabledType = RoundScoresOptionsType[];
export type RoundScoresType = {
  [key: RoundMemberUUID]: {
    name: RoundScoresNameType;
    value: number;
    disabled: RoundScoresDisabledType;
    doubleZero: boolean;
    barrel: number;
  };
};

export interface RoundScores {
  [key: RoundMemberUUID]: number | string; // TODO: only number
}
