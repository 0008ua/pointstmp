import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { PersistStore } from '../../interfaces';

export const loadPersistStores = createAction(
  '[PersistStore/API] Load PersistStores',
  props<{ persistStores: PersistStore[] }>(),
);

export const addPersistStore = createAction(
  '[PersistStore/API] Add PersistStore',
  props<{ persistStore: PersistStore }>(),
);

export const upsertPersistStore = createAction(
  '[PersistStore/API] Upsert PersistStore',
  props<{ persistStore: PersistStore }>(),
);

export const addPersistStores = createAction(
  '[PersistStore/API] Add PersistStores',
  props<{ persistStores: PersistStore[] }>(),
);

export const upsertPersistStores = createAction(
  '[PersistStore/API] Upsert PersistStores',
  props<{ persistStores: PersistStore[] }>(),
);

export const updatePersistStore = createAction(
  '[PersistStore/API] Update PersistStore',
  props<{ persistStore: Update<PersistStore> }>(),
);

export const updatePersistStores = createAction(
  '[PersistStore/API] Update PersistStores',
  props<{ persistStores: Update<PersistStore>[] }>(),
);

export const deletePersistStore = createAction(
  '[PersistStore/API] Delete PersistStore',
  props<{ id: string }>(),
);

export const deletePersistStores = createAction(
  '[PersistStore/API] Delete PersistStores',
  props<{ ids: string[] }>(),
);

export const clearPersistStores = createAction('[PersistStore/API] Clear PersistStores');
