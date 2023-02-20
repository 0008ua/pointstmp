import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import * as fromRoundActions from '../actions/round.actions';
import * as fromAppActions from '../actions/app.actions';
import * as fromPersistStoreReducer from '../reducers/persist-store.reducer';

import { Store } from '@ngrx/store';

@Injectable()
export class RoundEffects {
  // clearGame = createEffect(() => {
  //     return this.actions$.pipe(
  //         ofType(fromAppActions.clearGame),
  //         map((_) => fromRoundActions.clearRounds()),
  //     );
  // });

  // loadGame = createEffect(() => {
  //     return this.actions$.pipe(
  //         ofType(fromAppActions.loadGame),
  //         map(({ rounds }) => fromRoundActions.loadRounds({ rounds })),
  //     );
  // });

  constructor(private actions$: Actions<fromRoundActions.CoreActionsUnion>, private store: Store) {}
}
