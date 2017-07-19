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
    .map((action: selectedAlert.SaveSDAAction) => action.payload)
    .switchMap((sda: models.ISda) => {
      return this.sdaService.saveSda(sda)
        .map((sdaid: number) => {
          return new selectedAlert.SaveSDACompleteAction(sdaid);
        })
        .catch((err) => {
          return of(new selectedAlert.SaveSDAFailAction('Failed to save SDA.'));
        });
    });
  @Effect()
  loadSdas$: Observable<Action> = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_SDAS)
    .map((action: selectedAlert.LoadSDAsAction) => action.payload)
    .switchMap(() => {
      return this.sdaService.getAllSda()
        .map((data: models.ISdaListView[]) => {
          return new selectedAlert.LoadSDAsCompleteAction(data);
        })
        .catch((err) => {
          return of(new selectedAlert.LoadSDAsFailAction('Failed to load SDAs.'));
        });
    });
  @Effect()
  loadSda$: Observable<Action> = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_SDA)
    .map((action: selectedAlert.LoadSDAAction) => action.payload)
    .switchMap((sdaId: number) => {
      return this.sdaService.getSda(sdaId)
        .map((data: models.ISda) => {
          return new selectedAlert.LoadSDACompleteAction(data);
        })
        .catch((err) => {
          return of(new selectedAlert.LoadSDAFailAction('Failed to load SDA.'));
        });
    });
  @Effect() navigateHome$: any = this.actions$
    .ofType(selectedAlert.ActionTypes.SAVE_SDA_COMPLETE)
    .map(() => this.router.navigate(['/alerts']));
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
