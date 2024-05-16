import { createReducer, on } from '@ngrx/store';
import * as actions from '@store/actions/load-acquisition-history.action'
import { ILoadAcquisitionHistoryState } from '@store/state/app.state';


export const initLoadAcquisitionHistory: ILoadAcquisitionHistoryState = {
  acquisitionHistoryLog: [],
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};
export const featureLoadAcquisitionHistory = createReducer(
  initLoadAcquisitionHistory,
  on(actions.loadAcquisitionHistoryAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.loadAcquisitionHistorySuccessAction, (state, { acquisitionHistoryLog }) => ({
    ...state,
    acquisitionHistoryLog,
    loading: false,
    completed: true,
    error: false,
    errorMessage: ''
  })),
  on(actions.loadAcquisitionHistoryFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.loadAcquisitionHistoryResetAction, () => initLoadAcquisitionHistory)
);
