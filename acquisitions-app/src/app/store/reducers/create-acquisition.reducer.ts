import { createReducer, on } from '@ngrx/store';
import * as actions from '@store/actions/create-acquisition.action'
import { ICreateAcquisitionState } from '@store/state/app.state';


export const initCreateAcquisition: ICreateAcquisitionState = {
  confirmationMessage: '',
  loading: false,
  completed: false,
  error: false,
  errorMessage: ''
};
export const featureCreateAcquisition = createReducer(
  initCreateAcquisition,
  on(actions.createAcquisitionLoadAction, (state) => ({
    ...state,
    loading: true,
    completed: false,
    error: false,
    errorMessage: ''
  })),
  on(actions.createAcquisitionSuccessAction, (state, { confirmationMessage }) => ({
    ...state,
    confirmationMessage,
    loading: false,
    completed: true,
    error: false,
    errorMessage: ''
  })),
  on(actions.createAcquisitionFailAction, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    completed: false,
    error: true,
    errorMessage
  })),
  on(actions.createAcquisitionResetAction, () => initCreateAcquisition)
);
