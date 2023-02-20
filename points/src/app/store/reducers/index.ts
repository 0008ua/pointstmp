import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { AuthService } from 'src/app/modules/auth/auth.service';

import { environment } from '../../../environments/environment';
import * as fromAuth from './auth.reducer';
import * as fromRounds from './round.reducer';
import * as fromRoundMembers from './round-member.reducer';
import { hydrationMetaReducer } from './hydration.reducer';
import * as fromPlayers from './player.reducer';
import * as fromAnalytics from './analytics.reducer';
import * as fromApp from './app.reducer';
import * as fromPersistStore from './persist-store.reducer';
import { routerReducer } from '@ngrx/router-store';
import { getSelectors, RouterReducerState, RouterState } from '@ngrx/router-store';

export interface State {
  auth: fromAuth.State;
  rounds: fromRounds.State;
  roundMembers: fromRoundMembers.State;
  players: fromPlayers.State;
  analytics: fromAnalytics.State;
  app: fromApp.State;
  persistStore: fromPersistStore.State;
  router: RouterReducerState<any>; // typeof routerReducer;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  rounds: fromRounds.reducer,
  roundMembers: fromRoundMembers.reducer,
  players: fromPlayers.reducer,
  analytics: fromAnalytics.reducer,
  app: fromApp.reducer,
  router: routerReducer,
  persistStore: fromPersistStore.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [hydrationMetaReducer]
  : [hydrationMetaReducer];

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getSelectors();

export const selectFeature = createFeatureSelector<RouterReducerState<any>>('router');
export const selectUrlRouter = createSelector(
  (state: State) => state,
  (value) => value.router.state.url,
);
// export const selectUrlRouter = createSelector((state: State) => state.ngrxRouter, selectUrl);
// export const selectUrlRouter = createSelector(selectFeature, selectUrl);
// export const selectFragmentRouter = createSelector(selectFeature, selectFragment);
