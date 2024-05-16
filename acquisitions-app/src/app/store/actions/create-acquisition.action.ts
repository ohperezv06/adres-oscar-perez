import { createAction } from '@ngrx/store';
import { IAcquisition } from '@commons/entities/acquisition.entities';

export const createAcquisitionLoadAction = createAction(
  '[CREATE ACQUISITION / API] Create Acquisition Load',
  (acquisition: IAcquisition)=>({acquisition})
);
export const createAcquisitionSuccessAction = createAction(
  '[CREATE ACQUISITION / API] Create Acquisition Success',
  (confirmationMessage: string) => ({ confirmationMessage })
);
export const createAcquisitionFailAction = createAction(
  '[CREATE ACQUISITION / API] Create Acquisition Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const createAcquisitionResetAction = createAction(
  '[CREATE ACQUISITION] Create Acquisition Reset'
);