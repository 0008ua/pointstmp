import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { selectUrlRouter, State } from '../reducers';
import * as HydrationActions from '../actions/hydration.actions';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { RouterState } from '@ngrx/router-store';
import { redirection } from '../actions/app.actions';

@Injectable()
export class HydrationEffects implements OnInitEffects {
  hydrate$ = createEffect(() => {
    return this.action$.pipe(
      ofType(HydrationActions.hydrate),
      switchMap(() => this.sharedService.getFromStorage('appState')),
      map((storageValue) => {
        if (storageValue) {
          const state = JSON.parse(storageValue);
          return HydrationActions.hydrateSuccess({ state });
        }
        return HydrationActions.hydrateFailure();
      }),
    );
  });

  navigate$ = createEffect(() => {
    return this.action$.pipe(
      ofType(HydrationActions.hydrateSuccess),
      concatLatestFrom(() => this.store.select(selectUrlRouter)),
      map(([action, url]) => {
        return redirection({ redirectionUrl: url });
      }),
    );
  });

  serialize$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(HydrationActions.hydrateSuccess, HydrationActions.hydrateFailure),
        switchMap(() => this.store),
        distinctUntilChanged(),
        switchMap((store: State) => {
          return this.sharedService.setToStorage(
            'appState',
            JSON.stringify({
              players: store.players,
              rounds: store.rounds,
              roundMembers: store.roundMembers,
              persistStore: store.persistStore,
              router: store.router,
            }),
          );
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private action$: Actions,
    private store: Store,
    private sharedService: SharedService,
    private router: Router,
  ) {}

  ngrxOnInitEffects(): Action {
    return HydrationActions.hydrate();
  }
}
