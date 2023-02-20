import { InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IGamer, NamedScore, Round, RoundMember, UID } from 'src/app/interfaces';
import { SharedService } from 'src/app/services/shared.service';
import { GamesService } from '../games.service';

export const ROUND_COMPONENT = new InjectionToken<RoundBase>('roundComponent');

export interface RoundBase {
  playerId: UID;
  roundId: string;
  sharedService: SharedService;
  gamesService: GamesService;
  getMemberByPlayerId: (playerId: string) => RoundMember;
}

export interface RoundBaseWrapper {
  roundComponent: RoundBase;
  playerId: UID;
  roundId: string;
  sharedService: SharedService;
  getRoundById: (roundId: string) => Round;
  calcScores: (playerId: string) => number;
  getPlayerColor: (playerId: string) => string;
  getPlayerName: (playerId: string) => string;
  getMemberByPlayerId: (playerId: string) => RoundMember;
}

export interface RoundScoresLine extends RoundBase {
  addToScoresLine: (score: number) => void;
  removeFromScoresLine: (score: number) => void;
  addToNamedScoresLine: (namedScore: NamedScore, playerId?: UID) => void;
  removeFromNamedScoresLine: (namedScore: NamedScore) => void;
}

export interface RoundTBase extends RoundScoresLine, RoundBase {
  store: Store;
  rounds$: Observable<Round[]>;
}

export interface RoundLongest {
  longestRouteScoreEnv: number;
  onMarkLongestHandler: (e: any) => void;
}

export type Inverse = 1 | -1;

export interface RoundRoutes {
  routesScoresEnv: NamedScore[];
  inverse: Inverse;
  inverseScore: (e: any) => void;
}

export interface RoundCars {
  carsScoresEnv: {
    name: number;
    value: number;
  }[];
  calcQtyOfArrItems: (e: any) => void;
}
