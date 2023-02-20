import { createAction, props, union } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { IGamer } from '../../interfaces';

export const loadPlayers = createAction(
  '[Player/API] Load Players',
  props<{ players: IGamer[] }>(),
);

export const addPlayer = createAction('[Player/API] Add Player', props<{ player: IGamer }>());

export const upsertPlayer = createAction('[Player/API] Upsert Player', props<{ player: IGamer }>());

export const addPlayers = createAction('[Player/API] Add Players', props<{ players: IGamer[] }>());

export const upsertPlayers = createAction(
  '[Player/API] Upsert Players',
  props<{ players: IGamer[] }>(),
);

export const updatePlayer = createAction(
  '[Player/API] Update Player',
  props<{ player: Update<IGamer> }>(),
);

export const updatePlayers = createAction(
  '[Player/API] Update Players',
  props<{ players: Update<IGamer>[] }>(),
);

export const deletePlayer = createAction('[Player/API] Delete Player', props<{ id: string }>());

export const deletePlayers = createAction(
  '[Player/API] Delete Players',
  props<{ ids: string[] }>(),
);

export const clearPlayers = createAction('[Player/API] Clear Players');

const all = union({
  loadPlayers,
  addPlayer,
  upsertPlayer,
  addPlayers,
  upsertPlayers,
  updatePlayer,
  updatePlayers,
  deletePlayer,
  deletePlayers,
  clearPlayers,
});

export type CoreActionsUnion = typeof all;
