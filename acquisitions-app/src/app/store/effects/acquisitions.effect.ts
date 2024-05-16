import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, first, map, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import * as loadAcquisitionsActions from '@store/actions/load-acquisitions.action';
import * as createAcquisitionActions from '@store/actions/create-acquisition.action';
import * as updateAcquisitionActions from '@store/actions/update-acquisition.action';
import * as deleteAcquisitionActions from '@store/actions/delete-acquisition.action';
import * as loadAcquisitionHistoryActions from '@store/actions/load-acquisition-history.action';
import { AcquisitionsService } from '@commons/services/acquisitions.service';
import { IAcquisitionHistoryLog, IAcquisitionResponse } from '@commons/entities/acquisition.entities';


@Injectable()
export class AcquisitionsEffect {
  constructor(
    private actions$: Actions,
    private acquisitionsService: AcquisitionsService
  ) {
  }

  loadAcquisitions: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAcquisitionsActions.loadAcquisitionsAction),
      switchMap((action) => {
        return this.acquisitionsService.getAcquisitions().pipe(
          first(),
          map((resp: IAcquisitionResponse[]) =>
            resp
              ? loadAcquisitionsActions.loadAcquisitionsSuccessAction(resp)
              : loadAcquisitionsActions.loadAcquisitionsFailAction('No se encontraron adquisiciones')
          ),
          catchError((error) =>
            of(
              loadAcquisitionsActions.loadAcquisitionsFailAction('problemas en el servicio')
            )
          )
        );
      })
    )
  );

  createAcquisition: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(createAcquisitionActions.createAcquisitionLoadAction),
      switchMap((action) => {
        return this.acquisitionsService.createAcquisition(action.acquisition).pipe(
          first(),
          map((resp: string) =>
            resp
              ? createAcquisitionActions.createAcquisitionSuccessAction(resp)
              : createAcquisitionActions.createAcquisitionFailAction('No fue posible crear la adquisicion')
          ),
          catchError((error) =>
            of(
              createAcquisitionActions.createAcquisitionFailAction(error)
            )
          )
        );
      })
    )
  );

  updateAcquisition: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAcquisitionActions.updateAcquisitionLoadAction),
      switchMap((action) => {
        return this.acquisitionsService.updateAcquisition(action.acquisitionId, action.acquisition).pipe(
          first(),
          map((resp: string) =>
            resp
              ? updateAcquisitionActions.updateAcquisitionSuccessAction(resp)
              : updateAcquisitionActions.updateAcquisitionFailAction('Esta adquisicion no existe')
          ),
          catchError((error) =>
            of(
              updateAcquisitionActions.updateAcquisitionFailAction(error)
            )
          )
        );
      })
    )
  );

  deleteAcquisition: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteAcquisitionActions.deleteAcquisitionLoadAction),
      switchMap((action) => {
        return this.acquisitionsService.deleteAcquisition(action.acquisitionId).pipe(
          first(),
          map((resp: string) =>
            resp
              ? deleteAcquisitionActions.deleteAcquisitionSuccessAction(resp)
              : deleteAcquisitionActions.deleteAcquisitionFailAction(resp)
          ),
          catchError((error) =>
            of(
              deleteAcquisitionActions.deleteAcquisitionFailAction(error)
            )
          )
        );
      })
    )
  );

  loadAcquisitionHistory: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAcquisitionHistoryActions.loadAcquisitionHistoryAction),
      switchMap((action) => {
        return this.acquisitionsService.getAcquisitionHistoryById(action.acquisitionId).pipe(
          first(),
          map((resp: IAcquisitionHistoryLog[]) =>
            resp
              ? loadAcquisitionHistoryActions.loadAcquisitionHistorySuccessAction(resp)
              : loadAcquisitionHistoryActions.loadAcquisitionHistoryFailAction('No se encontraron adquisiciones')
          ),
          catchError((error) =>
            of(
              loadAcquisitionHistoryActions.loadAcquisitionHistoryFailAction('problemas en el servicio')
            )
          )
        );
      })
    )
  );

}