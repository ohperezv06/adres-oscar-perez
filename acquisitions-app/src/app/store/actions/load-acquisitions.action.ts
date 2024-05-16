import { createAction } from '@ngrx/store';
import { IAcquisitionResponse } from '@commons/entities/acquisition.entities';

export const loadAcquisitionsAction = createAction(
  '[ACQUISITIONS / API] Acquisitions Load'
);
export const loadAcquisitionsSuccessAction = createAction(
  '[ACQUISITIONS / API] Load Acquisitions Success',
  (acquisitions: IAcquisitionResponse[]) => ({ acquisitions })
);
export const loadAcquisitionsFailAction = createAction(
  '[ACQUISITIONS / API] Load Acquisitions Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const loadAcquisitionsResetAction = createAction(
  '[ACQUISITIONS] Load Acquisitions Reset'
);