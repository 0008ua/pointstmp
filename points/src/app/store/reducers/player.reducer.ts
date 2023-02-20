import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IGamer } from '../../interfaces';
import * as PlayerActions from '../actions/player.actions';

export const playersFeatureKey = 'players';

export interface State extends EntityState<IGamer> {
  // additional entities state properties
}

export const adapter: EntityAdapter<IGamer> = createEntityAdapter<IGamer>({
  selectId: (player: IGamer) => player._id,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(PlayerActions.addPlayer, (state, action) => adapter.addOne(action.player, state)),
  on(PlayerActions.upsertPlayer, (state, action) => adapter.upsertOne(action.player, state)),
  on(PlayerActions.addPlayers, (state, action) => adapter.addMany(action.players, state)),
  on(PlayerActions.upsertPlayers, (state, action) => adapter.upsertMany(action.players, state)),
  on(PlayerActions.updatePlayer, (state, action) => adapter.updateOne(action.player, state)),
  on(PlayerActions.updatePlayers, (state, action) => adapter.updateMany(action.players, state)),
  on(PlayerActions.deletePlayer, (state, action) => adapter.removeOne(action.id, state)),
  on(PlayerActions.deletePlayers, (state, action) => adapter.removeMany(action.ids, state)),
  on(PlayerActions.loadPlayers, (state, action) => adapter.setAll(action.players, state)),
  on(PlayerActions.clearPlayers, (state) => adapter.removeAll(state)),
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectFeature = createFeatureSelector<State>(playersFeatureKey);
export const selectAllPlayers = createSelector(selectFeature, selectAll);
export const selectEntitiesPlayers = createSelector(selectFeature, selectEntities);
export const selectByIdPlayer = (id: string) =>
  createSelector(selectEntitiesPlayers, (entities) => entities[id]);
