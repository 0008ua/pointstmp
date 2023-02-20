import { Action, ActionReducer } from '@ngrx/store';
import * as HydrationActions from '../actions/hydration.actions';
import { State } from '../reducers';

const isHydrateSuccess = (
  action: Action,
): action is ReturnType<typeof HydrationActions.hydrateSuccess> => {
  return action.type === HydrationActions.hydrateSuccess.type;
};

export const hydrationMetaReducer = (reducer: ActionReducer<State>): ActionReducer<State> => {
  return (state, action) => {
    if (isHydrateSuccess(action)) {
      return { ...state, ...action.state };
    } else {
      return reducer(state, action);
    }
  };
};
