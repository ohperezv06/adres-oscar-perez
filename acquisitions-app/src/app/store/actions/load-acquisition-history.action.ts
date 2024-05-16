import { createAction } from '@ngrx/store';
import { IAcquisitionHistoryLog } from '@commons/entities/acquisition.entities';

export const loadAcquisitionHistoryAction = createAction(
  '[ACQUISITIONS HISTORY / API] Acquisition History Load',
  (acquisitionId: number) => ({ acquisitionId })
);
export const loadAcquisitionHistorySuccessAction = createAction(
  '[ACQUISITIONS HISTORY / API] Load Acquisition History Success',
  (acquisitionHistoryLog: IAcquisitionHistoryLog[]) => ({ acquisitionHistoryLog })
);
export const loadAcquisitionHistoryFailAction = createAction(
  '[ACQUISITIONS HISTORY / API] Load Acquisition History Fail',
  (errorMessage: string) => ({ errorMessage })
);
export const loadAcquisitionHistoryResetAction = createAction(
  '[ACQUISITIONS HISTORY] Load Acquisition History Reset'
);