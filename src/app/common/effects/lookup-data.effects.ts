import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { empty } from 'rxjs/Observable/empty';
import { of } from 'rxjs/observable/of';
import * as services from '@app/common/services/index';
import * as lookupData from '@app/common/actions/lookup-data';
import * as models from '@app/common/models';
import { from } from 'rxjs/observable/from';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class LookupDataEffects {
  @Effect()
  loadAlertCodes$: Observable<Action> = this.actions$
    .ofType(lookupData.ActionTypes.LOAD_LOOKUP_DATA)
    .pipe(
    switchMap(() => {
      return this.lookupDataService.getLookupData()
        .pipe(
        map((response: models.ILookupData) => {
          return new lookupData.LoadLookupDataCompleteAction(response);
        }),
        catchError((err) => {
          return of(new lookupData.LoadLookupDataFailedAction('Failed to load Lookup Data'));
        }));
    }));

  @Effect()
  loadFleetCheckTypes$: Observable<Action> = this.actions$
    .ofType(lookupData.ActionTypes.LOAD_FLEET_CHECK_TYPES)
    .pipe(
    map((action: lookupData.LoadFleetCheckTypesAction) => action.payload),
    switchMap((fleetType: string) => {
      if (!fleetType) {
        return of(new lookupData.LoadFleetCheckTypesCompleteAction([]));
      }

      return this.checkTypesService.getFleetCheckTypes(fleetType)
        .pipe(
        map((response: models.ICheckType[]) => {
          return new lookupData.LoadFleetCheckTypesCompleteAction(response);
        }),
        catchError((err) => {
          return of(new lookupData.LoadFleetCheckTypesFailAction('Failed to load Fleet Check Types'));
        }));
    }));

  @Effect()
  loadStations$: Observable<Action> = this.actions$
    .ofType(lookupData.ActionTypes.LOAD_STATIONS)
    .pipe(
    map((action: lookupData.LoadStationsAction) => action.payload),
    switchMap((token: string) => {
      return this.stationService.getStations(token)
        .pipe(
        map((response: models.IStation[]) => {
          return new lookupData.LoadStationsCompleteAction(response);
        }),
        catchError((err) => {
          return of(new lookupData.LoadStationsFailAction('Failed to load Stations'));
        }));
    }));

  @Effect({ dispatch: false })
  showToastrError$: any = this.actions$
    .ofType(
    lookupData.ActionTypes.LOAD_STATIONS_FAIL,
    lookupData.ActionTypes.LOAD_FLEET_CHECK_TYPES_FAIL,
    lookupData.ActionTypes.LOAD_LOOKUP_DATA_FAILED
  )
    .pipe(
    map(toPayload),
    map((payload: string) => {
      this.toastr.error(payload, 'ERROR');

      return null;
    }));


  constructor(private actions$: Actions,
    private checkTypesService: services.CheckTypesService,
    private stationService: services.StationService,
    private lookupDataService: services.LookupDataService,
    private toastr: ToastrService) {
  }
}
