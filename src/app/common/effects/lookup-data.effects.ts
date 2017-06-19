import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/Observable/empty';
import { of } from 'rxjs/observable/of';
import * as services from '../services/index';
import * as lookupData from '../actions/lookup-data';
import { ATACodesService } from '../services/ata-codes.service';
import * as models from '../models';
import '../rxjs-extensions';
@Injectable()
export class LookupDataEffects {
  @Effect()
    loadLookupDatas$: Observable<Action> = this.actions$
                                              .ofType(lookupData.ActionTypes.LOAD_LOOKUP_DATA)
                                              .mergeMap(() =>
                                                Observable.from([
                                                new lookupData.LoadAlertCodesAction(),
                                                new lookupData.LoadATACodesAction(),
                                                new lookupData.LoadCheckTypesAction(),
                                                new lookupData.LoadCorrosionLevelsAction(),
                                                new lookupData.LoadCorrosionTypesAction(),
                                                new lookupData.LoadDepartmentsAction(),
                                                new lookupData.LoadDetectionMethodsAction(),
                                                new lookupData.LoadStationsAction(),
                                                new lookupData.LoadDamageTypesAction(),
                                                new lookupData.LoadRepairedDescribeAction()
                                                ]
                                              ));
    @Effect()
    loadAlertCodes$: Observable<Action> = this.actions$
                                              .ofType(lookupData.ActionTypes.LOAD_ALERT_CODES)
                                              .switchMap(() => {
                                                  return this.alertCodesService.getAllAlertCodes()
                                                          .map((response: models.IAlertCode[]) => {
                                                          return new lookupData.LoadAlertCodesCompleteAction(response);
                                              })
                                              .catch((err) => {
                                                      return of(new lookupData.LoadAlertCodesFailAction('Failed to load Alert Codes'));
                                                    });
                                            });
    @Effect()
    loadATACodes$: Observable<Action> = this.actions$
                                              .ofType(lookupData.ActionTypes.LOAD_ATA_CODES)
                                              .switchMap(() => {
                                                  return this.ataCodesService.getATACodes()
                                                          .map((response: models.IATACode[]) => {
                                                          return new lookupData.LoadATACodesCompleteAction(response);
                                              })
                                              .catch((err) => {
                                                      return of(new lookupData.LoadATACodesFailAction('Failed to load ATA Codes'));
                                                    });
                                            });
    @Effect()
    loadCheckTypes$: Observable<Action> = this.actions$
                                              .ofType(lookupData.ActionTypes.LOAD_CHECK_TYPES)
                                              .map((action: lookupData.LoadCheckTypesAction) => action.payload)
                                              .switchMap(() => {
                                                  return this.checkTypesService.getAllCheckTypes()
                                                          .map((response: models.ICheckType[]) => {
                                                          return new lookupData.LoadCheckTypesCompleteAction(response);
                                              })
                                              .catch((err) => {
                                                      return of(new lookupData.LoadCheckTypesFailAction('Failed to load Check Types'));
                                                    });
                                            });
@Effect()
    loadFleetCheckTypes$: Observable<Action> = this.actions$
                                              .ofType(lookupData.ActionTypes.LOAD_FLEET_CHECK_TYPES)
                                              .map((action: lookupData.LoadFleetCheckTypesAction) => action.payload)
                                              .switchMap((fleetType: string) => {
                                                  return this.checkTypesService.getFleetCheckTypes(fleetType)
                                                          .map((response: models.ICheckType[]) => {
                                                          return new lookupData.LoadFleetCheckTypesCompleteAction(response);
                                              })
                                              .catch((err) => {
                                                      return of(new lookupData.LoadFleetCheckTypesFailAction('Failed to load Fleet Check Types'));
                                                    });
                                            });
@Effect()
    loadCorrosionLevels$: Observable<Action> = this.actions$
                                              .ofType(lookupData.ActionTypes.LOAD_CORROSION_LEVELS)
                                              .switchMap(() => {
                                                  return this.corrosionLevelService.getAllCorrosionLevels()
                                                          .map((response: models.ICorrosionLevel[]) => {
                                                          return new lookupData.LoadCorrosionLevelsCompleteAction(response);
                                              })
                                              .catch((err) => {
                                                      return of(
                                                        new lookupData.LoadCorrosionLevelsFailAction('Failed to load Corrosion Levels')
                                                                );
                                                    });
                                            });
@Effect()
    loadCorrosionTypes$: Observable<Action> = this.actions$
                                              .ofType(lookupData.ActionTypes.LOAD_CORROSION_TYPES)
                                              .switchMap(() => {
                                                  return this.corrosionTypeService.getAllCorrosionTypes()
                                                          .map((response: models.ICorrosionType[]) => {
                                                          return new lookupData.LoadCorrosionTypesCompleteAction(response);
                                              })
                                              .catch((err) => {
                                                      return of(
                                                        new lookupData.LoadCorrosionTypesFailAction('Failed to load Corrosion Types')
                                                                );
                                                    });
                                            });
@Effect()
    loadDepartments$: Observable<Action> = this.actions$
                                              .ofType(lookupData.ActionTypes.LOAD_DEPARTMENTS)
                                              .switchMap(() => {
                                                  return this.departmentService.getAllDepartments()
                                                          .map((response: models.IDepartment[]) => {
                                                          return new lookupData.LoadDepartmentsCompleteAction(response);
                                              })
                                              .catch((err) => {
                                                      return of(
                                                        new lookupData.LoadDepartmentsFailAction('Failed to load Departments')
                                                                );
                                                    });
                                            });
@Effect()
    loadDetectionMethods$: Observable<Action> = this.actions$
                                              .ofType(lookupData.ActionTypes.LOAD_DETECTION_METHODS)
                                              .switchMap(() => {
                                                  return this.detectionMethodService.getAllDetectionMethods()
                                                          .map((response: models.IDetectionMethod[]) => {
                                                          return new lookupData.LoadDetectionMethodsCompleteAction(response);
                                              })
                                              .catch((err) => {
                                                      return of(
                                                        new lookupData.LoadDetectionMethodsFailAction('Failed to load Detection Methods')
                                                                );
                                                    });
                                            });


    @Effect()
    loadStations$: Observable<Action> = this.actions$
                                              .ofType(lookupData.ActionTypes.LOAD_STATIONS)
                                              .switchMap(() => {
                                                  return this.stationService.getAllStations()
                                                          .map((response: models.IStation[]) => {
                                                          return new lookupData.LoadStationsCompleteAction(response);
                                              })
                                              .catch((err) => {
                                                      return of(new lookupData.LoadStationsFailAction('Failed to load Stations'));
                                                    });
  });
  @Effect()
  loadDamageTypes$: Observable<Action> = this.actions$
    .ofType(lookupData.ActionTypes.LOAD_DAMAGE_TYPES)
    .switchMap(() => {
      return this.damageTypesService.getAllDamageTypes()
        .map((response: models.IDamageType[]) => {
          return new lookupData.LoadDamageTypesCompleteAction(response);
        })
        .catch((err) => {
          return of(new lookupData.LoadDamageTypesFailAction('Failed to load Damage Types'));
        });
        });

  @Effect()
  loadRepairedDescribe$: Observable<Action> = this.actions$
      .ofType(lookupData.ActionTypes.LOAD_REPAIRED_DESCRIBE)
      .switchMap(() => {
          return this.repairedDescribeService.getAllRepairedDescribe()
              .map((response: models.IRepairedDescribe[]) => {
                  return new lookupData.LoadRepairedDescribeCompleteAction(response);
              })
              .catch((err) => {
                  return of(new lookupData.LoadRepairedDescribeFailAction('Failed to load Repaired Describe'));
              });
      });
    @Effect()
    showToastrError$: any = this.actions$
                                              .ofType(lookupData.ActionTypes.LOAD_ALERT_CODES_FAIL,
                                                      lookupData.ActionTypes.LOAD_ATA_CODES_FAIL,
                                                      lookupData.ActionTypes.LOAD_CHECK_TYPES_FAIL,
                                                      lookupData.ActionTypes.LOAD_CORROSION_LEVELS_FAIL,
                                                      lookupData.ActionTypes.LOAD_CORROSION_TYPES_FAIL,
                                                      lookupData.ActionTypes.LOAD_DEPARTMENTS_FAIL,
                                                      lookupData.ActionTypes.LOAD_DETECTION_METHODS_FAIL,
                                                      lookupData.ActionTypes.LOAD_STATIONS_FAIL,
                                                      lookupData.ActionTypes.LOAD_DAMAGE_TYPES_FAIL,
                                                      lookupData.ActionTypes.LOAD_REPAIRED_DESCRIBE_FAIL
                                                      )
      .map((action: Action) => this.toastr.error(<string>action.payload, 'ERROR'));


constructor(private actions$: Actions,
                private alertCodesService: services.AlertCodeService,
                private ataCodesService: services.ATACodesService,
                private corrosionLevelService: services.CorrosionLevelService,
                private corrosionTypeService: services.CorrosionTypeService,
                private departmentService: services.DepartmentService,
                private detectionMethodService: services.DetectionMethodService,
                private checkTypesService: services.CheckTypesService,
                private stationService: services.StationService,
                private damageTypesService: services.DamageTypeService,
                private repairedDescribeService: services.RepairedDescribeService,
                private toastr: ToastsManager) {
                }

}
