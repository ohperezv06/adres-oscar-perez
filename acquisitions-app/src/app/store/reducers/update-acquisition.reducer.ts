import { createReducer, on } from '@ngrx/store';
import * as actions from '@store/actions/update-acquisition.action'
import { IUpdateAcquisitionState } from '@store/state/app.state';

export const initUpdateAcquisition: IUpdateAcquisitionState = {
  confirmationMessage: '',
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};
export const featureUpdateAcquisition = createReducer(
  initUpdateAcquisition,
  on(actions.updateAcquisitionLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.updateAcquisitionSuccessAction, (state, { confirmationMessage }) => ({
    ...state,
    confirmationMessage,
    loading: false,
    completed: true,
    error: false,
    errorMessage: ''
  })),
  on(actions.updateAcquisitionFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.updateAcquisitionResetAction, () => initUpdateAcquisition)
);
