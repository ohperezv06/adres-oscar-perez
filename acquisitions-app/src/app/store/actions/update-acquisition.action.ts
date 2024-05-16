import { createAction } from '@ngrx/store';
import { IAcquisition } from '@commons/entities/acquisition.entities';

export const updateAcquisitionLoadAction = createAction(
  '[UPDATE ACQUISITION / API] Update Acquisition Load',
  (acquisitionId: number, acquisition: IAcquisition) => ({ acquisitionId, acquisition })
);
export const updateAcquisitionSuccessAction = createAction(
  '[UPDATE ACQUISITION / API] Update Acquisition Success',
  (confirmationMessage: string) => ({ confirmationMessage })
);
export const updateAcquisitionFailAction = createAction(
  '[UPDATE ACQUISITION / API] Update Acquisition Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const updateAcquisitionResetAction = createAction(
  '[UPDATE ACQUISITION] Update Acquisition Reset'
);