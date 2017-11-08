import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/Observable/empty';
import { of } from 'rxjs/observable/of';
import * as selectedAlert from '@app/common/actions/selected-alert';
import * as services from '@app/common/services';
import * as models from '@app/common/models';
import * as fromRoot from '@app/common/reducers';
import '@app/common/rxjs-extensions';
import { SdaListResult } from '@app/common/models';


@Injectable()
export class AlertEffects {

  @Effect()
  loadNoseNumbers$ = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_NOSE_NUMBERS)
    .map((action: selectedAlert.LoadNoseNumbersAction) => action.payload)
    .switchMap((search: string) => {
      return this.aircraftService.queryNoseNumbers(search)
        .map((data: models.IAircraftInfo[]) => {
          return new selectedAlert.LoadNoseNumbersCompleteAction(data);
        })
        .catch((err) => {
          return of(new selectedAlert.LoadNoseNumbersFailAction('Failed to load Nose Numbers'));
        });
    });

  @Effect()
  loadAircraftInfo$ = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_AIRCRAFT_INFO)
    .map((action: selectedAlert.LoadAircraftInfoAction) => action.payload)
    .switchMap((noseNumber: string) => {
      return this.aircraftService.getAircraftInfo(noseNumber)
        .map((aircraftInfo: models.IAircraftInfo) => {
          return new selectedAlert.LoadAircraftInfoCompleteAction(aircraftInfo);
        })
        .catch((err) => {
          return Observable.from([
            new selectedAlert.LoadAircraftInfoFailAction('Failed to load aircraft information. Please check the aircraft # or try again by clicking refresh button.'),
            new selectedAlert.LoadAircraftInfoCompleteAction(
              {
                noseNumber: noseNumber,
                cycles: '', fleet: '', manufacturer: '',
                model: '', serialNo: '', totalShipTime: ''
              })]);

        });
    });

  @Effect()
  saveSda$ = this.actions$
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
  loadSdas$ = this.actions$
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
  loadSda$ = this.actions$
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

  @Effect()
  showToastrError$ = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_AIRCRAFT_INFO_FAIL,
    selectedAlert.ActionTypes.LOAD_NOSE_NUMBERS_FAIL,
    selectedAlert.ActionTypes.SAVE_SDA_FAIL,
    selectedAlert.ActionTypes.LOAD_SDAS_FAIL
    )
    .switchMap((action: Action) => {
      this.toastr.error(<string>action.payload, 'ERROR');

      return of(new selectedAlert.OperationFailedAction());
    });

  @Effect({ dispatch: false })
  showLoadSdaFailError$ = this.actions$
    .ofType(selectedAlert.ActionTypes.LOAD_SDA_FAIL)
    .map((action: Action) => {
      this.toastr.error(<string>action.payload, 'ERROR');
      this.router.navigate(['/alerts']);

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
