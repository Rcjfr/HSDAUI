import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/Observable/empty';
import { of } from 'rxjs/observable/of';
import * as selectedAlert from '../actions/selected-alert';
import * as services from '../services';
import * as models from '../models';
import * as fromRoot from '../reducers';
import '../rxjs-extensions';
import { SdaListResult } from '../models';


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
        .map((updatedSda: models.ISda) => {
          this.appStateService.notifySavedSda({ sdaId: updatedSda.id, newSda: !sda.id, Timestamp: new Date() });

          return new selectedAlert.SaveSdaCompleteAction({ sda: updatedSda, sdaId: updatedSda.id, newSda: !sda.id, Timestamp: new Date() });
        })
        .catch((err) => {
          return of(new selectedAlert.SaveSdaFailAction('Failed to save SDA.'));
        });
    });

    //TODO - Melinda saving for research
// @Effect()
//   saveSearchCriteria$: Observable<Action> = this.actions$
//     .ofType(selectedAlert.ActionTypes.SAVE_SDA_SEARCH_CRITERIA)
//     // .map((action: selectedAlert.SaveSdaSearchCriteria) => action.payload)
//    .map(action => { return new selectedAlert.LoadSdasAction(undefined) } );
//     // .switchMap((searchCriteria) => {
//     //   return new selectedAlert.LoadSdasAction(undefined);
//     //   // return new selectedAlert.LoadSdasAction(searchCriteria.toJS());
//     // });

  @Effect()
  loadSdas$: Observable<Action> = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_SDAS)
    .map((action: selectedAlert.LoadSdasAction) => action.payload)
    .withLatestFrom(this.appStateService.getSearchCriteria())
    .switchMap(([payload, searchCriteria]) => {
      const criteria = searchCriteria.toJS();
      criteria.PageData = payload;

      return this.sdaService.searchSda(criteria)
        .map((data: SdaListResult) => {
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

  //@Effect() navigateHome$: any = this.actions$
  //  .ofType(selectedAlert.ActionTypes.SAVE_SDA_COMPLETE)
  //  .map((action: selectedAlert.SaveSdaCompleteAction) =>this.toastr.success('SDA Details saved successfully.', 'Success'));

  @Effect({ dispatch: false })
  showToastrError$: any = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_AIRCRAFT_INFO_FAIL,
    selectedAlert.ActionTypes.LOAD_NOSE_NUMBERS_FAIL,
    selectedAlert.ActionTypes.SAVE_SDA_FAIL,
    selectedAlert.ActionTypes.LOAD_SDAS_FAIL,
    selectedAlert.ActionTypes.LOAD_SDA_FAIL)
    .map((action: Action) => {
      this.toastr.error(<string>action.payload, 'ERROR');
      return null;
    });


  constructor(private actions$: Actions,
    private aircraftService: services.AircraftService,
    private sdaService: services.SdaService,
    private appStateService: services.AppStateService,
    private router: Router,
    private toastr: ToastrService) {
  }

}
