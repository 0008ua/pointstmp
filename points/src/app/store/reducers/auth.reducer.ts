import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../interfaces';
import * as fromAuthActions from '../actions/auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const authFeatureKey = 'auth';

export interface State {
  user: IUser;
  error: any;
  redirectionUrl: string | null;
  loading: boolean;
}

export const initialState: State = {
  user: null,
  error: null,
  redirectionUrl: null,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(
    fromAuthActions.storeUserFromTokenSuccess,
    (state, { user }): State => ({
      ...state,
      user,
      error: null,
    }),
  ),
  on(
    fromAuthActions.error,
    (state, { error }): State => ({
      ...state,
      error,
    }),
  ),
  on(
    fromAuthActions.loading,
    (state, { loading }): State => ({
      ...state,
      loading,
    }),
  ),
  on(
    fromAuthActions.redirection,
    (state, { redirectionUrl }): State => ({
      ...state,
      redirectionUrl,
    }),
  ),
);

const selectFeature = createFeatureSelector<State>(authFeatureKey);

export const selectUser = createSelector(selectFeature, (state) => state.user);
export const selectUserRole = createSelector(selectFeature, (state) => state.user?.role);
export const selectRedirectionUrl = createSelector(selectFeature, (state) => state.redirectionUrl);
