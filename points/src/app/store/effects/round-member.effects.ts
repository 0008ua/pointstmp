import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { filter, map, tap } from 'rxjs/operators';

import * as fromRoundMemberActions from '../actions/round-member.actions';
import * as fromAppActions from '../actions/app.actions';
import * as fromRoundMemberReducer from '../reducers/round-member.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RoundMemberEffects {
  updateRoundMembersSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromRoundMemberActions.updateRoundMembers),
      concatLatestFrom(() => this.store.select(fromRoundMemberReducer.selectAllRoundMembers)),
      map(([action, roundMembers]) =>
        fromRoundMemberActions.updateRoundMembersSuccess({ roundMembers }),
      ),
    );
  });

  addRoundMembersSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromRoundMemberActions.addRoundMembers),
      map(({ roundMembers }) => fromRoundMemberActions.addRoundMembersSuccess({ roundMembers })),
    );
  });

  // loadGame = createEffect(() => {
  //     return this.actions$.pipe(
  //         ofType(fromAppActions.loadGame),
  //         map(({roundMembers}) => fromRoundMemberActions.loadRoundMembers({roundMembers})),
  //     );
  // });

  constructor(
    private actions$: Actions<fromRoundMemberActions.CoreActionsUnion>,
    private store: Store,
  ) {}
}
