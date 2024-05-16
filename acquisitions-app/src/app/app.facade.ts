import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  ICreateAcquisitionState,
  IDeleteAcquisitionState,
  ILoadAcquisitionHistoryState,
  ILoadAcquisitionsState,
  IUpdateAcquisitionState,
  State
} from '@store/state/app.state';
import {
  acquisitionByIdSelector,
  acquisitionHistorySelector,
  acquisitionsSelector,
  createAcquisitionSelector,
  deleteAcquisitionSelector,
  updateAcquisitionSelector
} from '@store/selectors/acquisitions.selector';
import { loadAcquisitionsAction, loadAcquisitionsResetAction } from '@store/actions/load-acquisitions.action';
import { IAcquisition, IAcquisitionResponse } from '@commons/entities/acquisition.entities';
import { createAcquisitionLoadAction, createAcquisitionResetAction } from '@store/actions/create-acquisition.action';
import { deleteAcquisitionLoadAction, deleteAcquisitionResetAction } from '@store/actions/delete-acquisition.action';
import { updateAcquisitionLoadAction, updateAcquisitionResetAction } from '@store/actions/update-acquisition.action';
import {
  loadAcquisitionHistoryAction,
  loadAcquisitionHistoryResetAction
} from '@store/actions/load-acquisition-history.action';

@Injectable()
export class AppFacade {
  constructor(protected store: Store<State>) {
  }

  public acquisitions$: Observable<ILoadAcquisitionsState> = this.store.select(acquisitionsSelector);

  public createAcquisition$: Observable<ICreateAcquisitionState> = this.store.select(createAcquisitionSelector);

  public updateAcquisition$: Observable<IUpdateAcquisitionState> = this.store.select(updateAcquisitionSelector);

  public deleteAcquisition$: Observable<IDeleteAcquisitionState> = this.store.select(deleteAcquisitionSelector);

  public acquisitionHistory$: Observable<ILoadAcquisitionHistoryState> = this.store.select(acquisitionHistorySelector);

  public acquisitionById$(id: number): Observable<IAcquisitionResponse | undefined> {
    return this.store.select(acquisitionByIdSelector(id));
  }

  public getAcquisitions(): void {
    this.store.dispatch(loadAcquisitionsAction());
  }

  public createAcquisition(acquisition: IAcquisition): void {
    this.store.dispatch(createAcquisitionLoadAction(acquisition));
  }

  public updateAcquisition(acquisitionId: number, acquisition: IAcquisition): void {
    this.store.dispatch(updateAcquisitionLoadAction(acquisitionId, acquisition));
  }

  public deleteAcquisition(acquisitionId: number): void {
    this.store.dispatch(deleteAcquisitionLoadAction(acquisitionId));
  }

  public getAcquisitionHistory(acquisitionId: number): void {
    this.store.dispatch(loadAcquisitionHistoryAction(acquisitionId));
  }

  public resetGetAcquisitions(): void {
    this.store.dispatch(loadAcquisitionsResetAction());
  }

  public resetCreateAcquisition(): void {
    this.store.dispatch(createAcquisitionResetAction());
  }

  public resetUpdateAcquisition(): void {
    this.store.dispatch(updateAcquisitionResetAction());
  }

  public resetDeleteAcquisition(): void {
    this.store.dispatch(deleteAcquisitionResetAction());
  }

  public resetAcquisitionHistory(): void {
    this.store.dispatch(loadAcquisitionHistoryResetAction());
  }

}
