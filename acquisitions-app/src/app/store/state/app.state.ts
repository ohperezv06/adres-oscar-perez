import { IAcquisitionHistoryLog, IAcquisitionResponse } from '@commons/entities/acquisition.entities';


export const acquisitionsFeatureName = 'app';

export interface ILoadAcquisitionsState {
  acquisitions: IAcquisitionResponse[];
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface ICreateAcquisitionState {
  confirmationMessage: string | null;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IUpdateAcquisitionState {
  confirmationMessage: string | null;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IDeleteAcquisitionState {
  confirmationMessage: string | null;
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface ILoadAcquisitionHistoryState {
  acquisitionHistoryLog: IAcquisitionHistoryLog[];
  loading: boolean;
  completed: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IAppState {
  loadAcquisitions: ILoadAcquisitionsState;
  createAcquisition: ICreateAcquisitionState;
  updateAcquisition: IUpdateAcquisitionState;
  deleteAcquisition: IDeleteAcquisitionState;
  loadAcquisitionHistory: ILoadAcquisitionHistoryState;
}

export type State = Readonly<{
  app: {
    loadAcquisitions: ILoadAcquisitionsState;
    createAcquisition: ICreateAcquisitionState;
    updateAcquisition: IUpdateAcquisitionState;
    deleteAcquisition: IDeleteAcquisitionState;
    loadAcquisitionHistory: ILoadAcquisitionHistoryState;
  }
}>;