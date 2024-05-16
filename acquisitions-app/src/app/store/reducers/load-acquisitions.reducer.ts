import { createReducer, on } from '@ngrx/store';
import * as actions from '@store/actions/load-acquisitions.action'
import { ILoadAcquisitionsState } from '@store/state/app.state';


export const initLoadAcquisitions: ILoadAcquisitionsState = {
  acquisitions: [],
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};
export const featureLoadAcquisitions = createReducer(
  initLoadAcquisitions,
  on(actions.loadAcquisitionsAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.loadAcquisitionsSuccessAction, (state, { acquisitions }) => ({
    ...state,
    acquisitions,
    loading: false,
    completed: true,
    error: false,
    errorMessage: ''
  })),
  on(actions.loadAcquisitionsFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.loadAcquisitionsResetAction, () => initLoadAcquisitions)
);
