import { createAction, props, union } from '@ngrx/store';
import { GameType, IGamer } from 'src/app/interfaces';

export enum AnalyticsActionTypes {
  getRatingByWinsType = 'analytics/ratingByWins',
  getRatingByWinsToGamesType = 'analytics/ratingByWinsToGames',
  getRatingType = 'analytics/rating',
  getRatingSuccessType = 'analytics/getRatingSuccess',
  addManyType = 'analytics/addMany',

  errorType = 'analytics/error',
  loadingType = 'analytics/loading',
}

export const getRatingByWins = createAction(
  AnalyticsActionTypes.getRatingByWinsType,
  props<{
    gameType: GameType;
    query?: any;
  }>(),
);

export const getRatingByWinsToGames = createAction(
  AnalyticsActionTypes.getRatingByWinsToGamesType,
  props<{
    gameType: GameType;
    query?: any;
  }>(),
);

export const getRating = createAction(
  AnalyticsActionTypes.getRatingType,
  props<{
    gameType: GameType;
    query?: any;
  }>(),
);

export const getRatingSuccess = createAction(
  AnalyticsActionTypes.getRatingSuccessType,
  props<{ analytics: IGamer[] }>(),
);

export const addMany = createAction(
  AnalyticsActionTypes.addManyType,
  props<{ analytics: IGamer[] }>(),
);

export const error = createAction(
  AnalyticsActionTypes.errorType,
  props<{ error: string | null }>(),
);

export const loading = createAction(
  AnalyticsActionTypes.loadingType,
  props<{ loading: boolean }>(),
);

const all = union({
  error,
  getRatingByWins,
  getRatingByWinsToGames,
  getRating,
  getRatingSuccess,
  loading,
});

export type CoreActionsUnion = typeof all;
