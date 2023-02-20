import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { RoundMember } from '../../interfaces';
import * as RoundMemberActions from '../actions/round-member.actions';

export const roundMembersFeatureKey = 'roundMembers';

export type State = EntityState<RoundMember>;

export const adapter: EntityAdapter<RoundMember> = createEntityAdapter<RoundMember>({
  selectId: (roundMember: RoundMember) => roundMember._id,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(RoundMemberActions.addRoundMember, (state, action) =>
    adapter.addOne(action.roundMember, state),
  ),
  on(RoundMemberActions.upsertRoundMember, (state, action) =>
    adapter.upsertOne(action.roundMember, state),
  ),
  on(RoundMemberActions.addRoundMembers, (state, action) =>
    adapter.addMany(action.roundMembers, state),
  ),
  on(RoundMemberActions.upsertRoundMembers, (state, action) =>
    adapter.upsertMany(action.roundMembers, state),
  ),
  on(RoundMemberActions.updateRoundMember, (state, action) =>
    adapter.updateOne(action.roundMember, state),
  ),
  on(RoundMemberActions.updateRoundMembers, (state, action) =>
    adapter.updateMany(action.roundMembers, state),
  ),
  on(RoundMemberActions.deleteRoundMember, (state, action) => adapter.removeOne(action.id, state)),
  on(RoundMemberActions.deleteRoundMembers, (state, action) =>
    adapter.removeMany(action.ids, state),
  ),
  on(RoundMemberActions.loadRoundMembers, (state, action) =>
    adapter.setAll(action.roundMembers, state),
  ),
  on(RoundMemberActions.clearRoundMembers, (state) => adapter.removeAll(state)),
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectFeature = createFeatureSelector<State>(roundMembersFeatureKey);
export const selectAllRoundMembers = createSelector(selectFeature, selectAll);
export const selectEntitiesRoundMembers = createSelector(selectFeature, selectEntities);
export const selectByIdRoundMember = (id: string) =>
  createSelector(selectEntitiesRoundMembers, (entities) => entities[id]);
