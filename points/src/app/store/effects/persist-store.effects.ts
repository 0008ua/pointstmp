import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  distinctUntilChanged,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { State } from '../reducers';
import * as fromPlayerReducer from '../reducers/player.reducer';
import * as fromRoundMemberReducer from '../reducers/round-member.reducer';
import * as fromRoundReducer from '../reducers/round.reducer';
import * as fromAppReducer from '../reducers/app.reducer';
import * as fromPersistStoreReducer from '../reducers/persist-store.reducer';
import * as fromPersistStoreActions from '../actions/persist-store.actions';
import * as fromAppActions from '../actions/app.actions';
import * as fromPlayerActions from '../actions/player.actions';

import { SharedService } from 'src/app/services/shared.service';

@Injectable()
export class PersistStoreEffects {
  upsertPersistStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        fromPlayerActions.addPlayer,
        fromPlayerActions.addPlayers,
        fromPlayerActions.clearPlayers,
        fromPlayerActions.deletePlayer,
        fromPlayerActions.deletePlayers,
        fromPlayerActions.loadPlayers,
        fromPlayerActions.updatePlayer,
        fromPlayerActions.updatePlayer,
        fromPlayerActions.updatePlayers,
        fromPlayerActions.upsertPlayer,
        fromPlayerActions.upsertPlayers,
      ),
      concatLatestFrom(() => [
        this.store.select(fromAppReducer.selectGameType),
        this.store.select(fromPlayerReducer.selectAllPlayers),
      ]),
      map(([_, gameType, players]) => {
        if (!gameType) {
          return fromAppActions.nop();
        }
        return fromPersistStoreActions.upsertPersistStore({
          persistStore: { _id: gameType, players },
        });
      }),
    );
  });

  getFromPersistStore = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAppActions.clearGame),
      concatLatestFrom(() => this.store.select(fromAppReducer.selectGameType)),
      concatLatestFrom(([action, gameType]) =>
        this.store.select(fromPersistStoreReducer.selectByIdPersistStore(gameType)),
      ),
      map(([action, persistStore]) => {
        if (persistStore && persistStore.players) {
          return fromPlayerActions.loadPlayers({ players: persistStore.players });
        } else {
          return fromPlayerActions.clearPlayers();
        }
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
    private sharedService: SharedService,
  ) {}
}
