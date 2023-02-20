import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Round } from '../../interfaces';
import * as RoundActions from '../actions/round.actions';

export const roundsFeatureKey = 'rounds';

export interface State extends EntityState<Round> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Round> = createEntityAdapter<Round>({
  selectId: (round: Round) => round._id,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(RoundActions.addRound, (state, action) => adapter.addOne(action.round, state)),
  on(RoundActions.upsertRound, (state, action) => adapter.upsertOne(action.round, state)),
  on(RoundActions.addRounds, (state, action) => adapter.addMany(action.rounds, state)),
  on(RoundActions.upsertRounds, (state, action) => adapter.upsertMany(action.rounds, state)),
  on(RoundActions.updateRound, (state, action) => adapter.updateOne(action.round, state)),
  on(RoundActions.updateRounds, (state, action) => adapter.updateMany(action.rounds, state)),
  on(RoundActions.deleteRound, (state, action) => adapter.removeOne(action.id, state)),
  on(RoundActions.deleteRounds, (state, action) => adapter.removeMany(action.ids, state)),
  on(RoundActions.loadRounds, (state, action) => adapter.setAll(action.rounds, state)),
  on(RoundActions.clearRounds, (state) => adapter.removeAll(state)),
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectFeature = createFeatureSelector<State>(roundsFeatureKey);
export const selectAllRounds = createSelector(selectFeature, selectAll);
export const selectEntitiesRounds = createSelector(selectFeature, selectEntities);
export const selectByIdRound = (id: string) =>
  createSelector(selectEntitiesRounds, (entities) => entities[id]);
