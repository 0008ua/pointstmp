import { Action, createAction, props, union } from '@ngrx/store';
import { IUser } from 'src/app/interfaces';

export enum AuthActionTypes {
  storeTokenType = 'auth/storeToken',
  storeTokenSuccessType = 'auth/storeTokenSuccess',

  storeUserFromTokenType = 'auth/storeUserFromToken',
  storeUserFromTokenSuccessType = 'auth/storeUserFromTokenSuccess',

  signinType = 'auth/signin',
  signinSuccessType = 'auth/signinSuccess',
  signupType = 'auth/signup',

  logoutType = 'auth/logout',

  redirectionType = 'auth/redirection',

  errorType = 'auth/error',
  loadingType = 'auth/loading',
}

export const storeToken = createAction(AuthActionTypes.storeTokenType, props<{ token: string }>());

export const storeUserFromToken = createAction(AuthActionTypes.storeUserFromTokenType);

export const storeUserFromTokenSuccess = createAction(
  AuthActionTypes.storeUserFromTokenSuccessType,
  props<{ user: IUser }>(),
);

export const signin = createAction(AuthActionTypes.signinType, props<{ user: IUser }>());

export const signinSuccess = createAction(
  AuthActionTypes.signinSuccessType,
  props<{ token: string }>(),
);

export const signup = createAction(AuthActionTypes.signupType, props<{ user?: IUser }>());

export const logout = createAction(AuthActionTypes.logoutType);

export const redirection = createAction(
  AuthActionTypes.redirectionType,
  props<{ redirectionUrl: string | null }>(),
);

export const error = createAction(AuthActionTypes.errorType, props<{ error: string }>());

export const loading = createAction(AuthActionTypes.loadingType, props<{ loading: boolean }>());

const all = union({
  storeToken,
  storeUserFromToken,
  storeUserFromTokenSuccess,
  signin,
  signup,
  error,
  loading,
  redirection,
  logout,
});

export type CoreActionsUnion = typeof all;
