import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { GameType, IGame, IGamer } from 'src/app/interfaces';

export const STAT_COMPONENT = new InjectionToken<StatBase>('statComponent');

export interface Stat {
  _id: string;
  icon: string;
  name: string;
}

export interface StatBase {
  analytics$: Observable<IGamer[]>;
  gameType: GameType;
  stat: Stat;
  math: Math;
}
