import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/Observable/empty';
import { of } from 'rxjs/observable/of';
import * as selectedAlert from '../actions/selected-alert';
import * as services from '../services';
import * as models from '../models';
import '../rxjs-extensions';
@Injectable()
export class AlertEffects {

  @Effect()
  loadNoseNumbers$: Observable<Action> = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_NOSE_NUMBERS)
    .map((action: selectedAlert.LoadNoseNumbersAction) => action.payload)
    .switchMap((search: string) => {
      return this.aircraftService.queryNoseNumbers(search)
        .map((noseNumbers: string[]) => {
          return new selectedAlert.LoadNoseNumbersCompleteAction(noseNumbers);
        })
        .catch((err) => {
          return of(new selectedAlert.LoadNoseNumbersFailAction('Failed to load Nose Numbers'));
        });
    });
  @Effect()
  loadAircraftInfo$: Observable<Action> = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_AIRCRAFT_INFO)
    .map((action: selectedAlert.LoadAircraftInfoAction) => action.payload)
    .switchMap((noseNumber: string) => {
      return this.aircraftService.getAircraftInfo(noseNumber)
        .map((aircraftInfo: models.IAircraftInfo) => {
          return new selectedAlert.LoadAircraftInfoCompleteAction(aircraftInfo);
        })
        .catch((err) => {
          return of(new selectedAlert.LoadAircraftInfoFailAction('Failed to load aircraft Info.'));
        });
    });
  @Effect()
  saveSda$: Observable<Action> = this.actions$
    .ofType(selectedAlert.ActionTypes.SAVE_SDA)
    .map((action: selectedAlert.SaveSdaAction) => action.payload)
    .switchMap((sda: models.ISda) => {
      return this.sdaService.saveSda(sda)
        .map((sdaid: number) => {
          return new selectedAlert.SaveSdaCompleteAction(sdaid);
        })
        .catch((err) => {
          return of(new selectedAlert.SaveSdaFailAction('Failed to save SDA.'));
        });
    });
  @Effect()
  loadSdas$: Observable<Action> = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_SDAS)
    .map((action: selectedAlert.LoadSdasAction) => action.payload)
    .switchMap(() => {
      return this.sdaService.getAllSda()
        .map((data: models.ISdaListView[]) => {
          return new selectedAlert.LoadSdasCompleteAction(data);
        })
        .catch((err) => {
          return of(new selectedAlert.LoadSdasFailAction('Failed to load SDAs.'));
        });
    });
  @Effect()
  loadSda$: Observable<Action> = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_SDA)
    .map((action: selectedAlert.LoadSdaAction) => action.payload)
    .switchMap((sdaId: number) => {
      if (sdaId === 0) {
        return of(new selectedAlert.LoadSdaCompleteAction({}));
      }

      return this.sdaService.getSda(sdaId)
        .map((data: models.ISda) => {
          return new selectedAlert.LoadSdaCompleteAction(data);
        })
        .catch((err) => {
          return of(new selectedAlert.LoadSdaFailAction('Failed to load SDA.'));
        });
    });
  @Effect() navigateHome$: any = this.actions$
    .ofType(selectedAlert.ActionTypes.SAVE_SDA_COMPLETE)
    .map((action: selectedAlert.SaveSdaCompleteAction) => {
      this.toastr.success('SDA Details saved successfully.', 'Success');

      return new selectedAlert.LoadSdaAction(action.payload);
    });
  @Effect()
  showToastrError$: any = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_AIRCRAFT_INFO_FAIL,
    selectedAlert.ActionTypes.LOAD_NOSE_NUMBERS_FAIL,
    selectedAlert.ActionTypes.SAVE_SDA_FAIL,
    selectedAlert.ActionTypes.LOAD_SDAS_FAIL,
    selectedAlert.ActionTypes.LOAD_SDA_FAIL)
    .map((action: Action) => this.toastr.error(<string>action.payload, 'ERROR'));
  constructor(private actions$: Actions,
    private aircraftService: services.AircraftService,
    private sdaService: services.SdaService,
    private router: Router,
    private toastr: ToastsManager) {
  }

}
