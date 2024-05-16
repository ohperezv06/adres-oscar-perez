import { createAction } from '@ngrx/store';

export const deleteAcquisitionLoadAction = createAction(
  '[DELETE ACQUISITION / API] Delete Acquisition Load',
  (acquisitionId: number) => ({ acquisitionId })
);
export const deleteAcquisitionSuccessAction = createAction(
  '[DELETE ACQUISITION / API] Delete Acquisition Success',
  (confirmationMessage: string) => ({ confirmationMessage })
);
export const deleteAcquisitionFailAction = createAction(
  '[DELETE ACQUISITION / API] Delete Acquisition Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const deleteAcquisitionResetAction = createAction(
  '[DELETE ACQUISITION] Delete Acquisition Reset'
);