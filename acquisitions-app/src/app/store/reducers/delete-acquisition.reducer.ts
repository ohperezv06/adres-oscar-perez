import { createReducer, on } from '@ngrx/store';
import * as actions from '@store/actions/delete-acquisition.action'
import { IDeleteAcquisitionState } from '@store/state/app.state';

export const initDeleteAcquisition: IDeleteAcquisitionState = {
  confirmationMessage: '',
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};
export const featureDeleteAcquisition = createReducer(
  initDeleteAcquisition,
  on(actions.deleteAcquisitionLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.deleteAcquisitionSuccessAction, (state, { confirmationMessage }) => ({
    ...state,
    confirmationMessage,
    loading: false,
    completed: true,
    error: false,
    errorMessage: ''
  })),
  on(actions.deleteAcquisitionFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.deleteAcquisitionResetAction, () => initDeleteAcquisition)
);
