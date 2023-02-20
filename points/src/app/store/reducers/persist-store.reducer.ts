import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { GameType, PersistStore } from '../../interfaces';
import * as PersistStoreActions from '../actions/persist-store.actions';

export const persistStoresFeatureKey = 'persistStore';

export interface State extends EntityState<PersistStore> {
  // additional entities state properties
}

export const adapter: EntityAdapter<PersistStore> = createEntityAdapter<PersistStore>({
  selectId: (storage: PersistStore) => storage._id,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(PersistStoreActions.addPersistStore, (state, action) =>
    adapter.addOne(action.persistStore, state),
  ),
  on(PersistStoreActions.upsertPersistStore, (state, action) =>
    adapter.upsertOne(action.persistStore, state),
  ),
  on(PersistStoreActions.addPersistStores, (state, action) =>
    adapter.addMany(action.persistStores, state),
  ),
  on(PersistStoreActions.upsertPersistStores, (state, action) =>
    adapter.upsertMany(action.persistStores, state),
  ),
  on(PersistStoreActions.updatePersistStore, (state, action) =>
    adapter.updateOne(action.persistStore, state),
  ),
  on(PersistStoreActions.updatePersistStores, (state, action) =>
    adapter.updateMany(action.persistStores, state),
  ),
  on(PersistStoreActions.deletePersistStore, (state, action) =>
    adapter.removeOne(action.id, state),
  ),
  on(PersistStoreActions.deletePersistStores, (state, action) =>
    adapter.removeMany(action.ids, state),
  ),
  on(PersistStoreActions.loadPersistStores, (state, action) =>
    adapter.setAll(action.persistStores, state),
  ),
  on(PersistStoreActions.clearPersistStores, (state) => adapter.removeAll(state)),
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectFeature = createFeatureSelector<State>(persistStoresFeatureKey);
export const selectAllPersistStore = createSelector(selectFeature, selectAll);
export const selectEntitiesRounds = createSelector(selectFeature, selectEntities);
export const selectByIdPersistStore = (id: GameType) =>
  createSelector(selectEntitiesRounds, (entities) => entities[id]);
