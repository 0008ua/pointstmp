import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import * as fromPlayerActions from '../actions/player.actions';
import * as fromAppActions from '../actions/app.actions';
import * as fromPersistStoreReducer from '../reducers/persist-store.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class PlayerEffects {
  constructor(
    private actions$: Actions<fromPlayerActions.CoreActionsUnion>,
    private store: Store,
  ) {}
}
