import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/Observable/empty';
import { of } from 'rxjs/observable/of';
import * as selectedAlert from '../actions/selected-alert';
import * as services from '../services/index';
import * as models from '../models/index';
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
                                                      // tslint:disable-next-line:max-line-length
                                                      return of(new selectedAlert.LoadAircraftInfoFailAction('Failed to load aircraft Info.'));
                                                    });
                                            });
    @Effect()
    showToastrError$: any = this.actions$
                                              .ofType(selectedAlert.ActionTypes.LOAD_AIRCRAFT_INFO_FAIL,
                                                      selectedAlert.ActionTypes.LOAD_NOSE_NUMBERS_FAIL)
                                              .map((action: Action) => this.toastr.error(<string>action.payload, 'ERROR'));
constructor(private actions$: Actions,
                private aircraftService: services.AircraftService,
                private toastr: ToastsManager) {
                }

}
