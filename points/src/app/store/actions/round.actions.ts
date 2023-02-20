import { createAction, props, union } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Round } from '../../interfaces';

export const loadRounds = createAction('[Round/API] Load Rounds', props<{ rounds: Round[] }>());

export const addRound = createAction('[Round/API] Add Round', props<{ round: Round }>());

export const upsertRound = createAction('[Round/API] Upsert Round', props<{ round: Round }>());

export const addRounds = createAction('[Round/API] Add Rounds', props<{ rounds: Round[] }>());

export const upsertRounds = createAction('[Round/API] Upsert Rounds', props<{ rounds: Round[] }>());

export const updateRound = createAction(
  '[Round/API] Update Round',
  props<{ round: Update<Round> }>(),
);

export const updateRounds = createAction(
  '[Round/API] Update Rounds',
  props<{ rounds: Update<Round>[] }>(),
);

export const deleteRound = createAction('[Round/API] Delete Round', props<{ id: string }>());

export const deleteRounds = createAction('[Round/API] Delete Rounds', props<{ ids: string[] }>());

export const clearRounds = createAction('[Round/API] Clear Rounds');

const all = union({
  loadRounds,
  addRound,
  upsertRound,
  addRounds,
  upsertRounds,
  updateRound,
  updateRounds,
  deleteRound,
  deleteRounds,
  clearRounds,
});

export type CoreActionsUnion = typeof all;
