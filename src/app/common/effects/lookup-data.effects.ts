import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
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
        new lookupData.LoadCauseOfDamagesAction(),
        new lookupData.LoadFloorboardConditionsAction(),
        new lookupData.LoadRepairDocumentsAction(),
        new lookupData.LoadRepairDescriptionsAction(),
        new lookupData.LoadReasonsForChangeAction(),
        new lookupData.LoadDTEStausAction(),
        new lookupData.LoadRepairInspectionStatusAction()
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
  loadCauseOfDamages$: Observable<Action> = this.actions$
    .ofType(lookupData.ActionTypes.LOAD_CAUSE_OF_DAMAGES)
    .switchMap(() => {
      return this.causeOfDamageService.getAllCauseOfDamages()
        .map((response: models.ICauseOfDamage[]) => {
          return new lookupData.LoadCauseOfDamagesCompleteAction(response);
        })
        .catch((err) => {
          return of(new lookupData.LoadCauseOfDamagesFailAction('Failed to load Cause Of Damages'));
        });
    });

  @Effect()
  loadFloorBoardConditions$: Observable<Action> = this.actions$
    .ofType(lookupData.ActionTypes.LOAD_FLOORBOARD_CONDITIONS)
    .switchMap(() => {
      return this.floorboardConditionService.getAllfloorboardConditions()
        .map((response: models.IFloorboardCondition[]) => {
          return new lookupData.LoadFloorboardConditionsCompleteAction(response);
        })
        .catch((err) => {
          return of(new lookupData.LoadFloorboardConditionsFailAction('Failed to load Floorboard Conditions'));
        });
    });

  @Effect()
  loadRepairDocuments$: Observable<Action> = this.actions$
    .ofType(lookupData.ActionTypes.LOAD_REPAIR_DOCUMENTS)
    .switchMap(() => {
      return this.repairDocumentService.getAllRepairDocuments()
        .map((response: models.IRepairDocument[]) => {
          return new lookupData.LoadRepairDocumentsCompleteAction(response);
        })
        .catch((err) => {
          return of(new lookupData.LoadRepairDocumentsFailAction('Failed to load Repair Documents'));
        });
    });

  @Effect()
  loadRepairDescriptions$: Observable<Action> = this.actions$
    .ofType(lookupData.ActionTypes.LOAD_REPAIR_DESCRIPTIONS)
    .switchMap(() => {
      return this.repairDescriptionService.getAllRepairDescriptions()
        .map((response: models.IRepairDescription[]) => {
          return new lookupData.LoadRepairDescriptionsCompleteAction(response);
        })
        .catch((err) => {
          return of(new lookupData.LoadRepairDescriptionsFailAction('Failed to load Repaired Describe'));
        });
    });

  @Effect()
  loadReasonsForChange$: Observable<Action> = this.actions$
    .ofType(lookupData.ActionTypes.LOAD_REASONS_FOR_CHANGE)
    .switchMap(() => {
      return this.reasonsForChangeService.getAllReasonsForChange()
        .map((response: models.IReasonForChange[]) => {
          return new lookupData.LoadReasonsForChangeCompleteAction(response);
        })
        .catch((err) => {
          return of(new lookupData.LoadReasonsForChangeFailAction('Failed to load Reasons for change'));
        });
    });

  @Effect()
  loadDTEStaus$: Observable<Action> = this.actions$
    .ofType(lookupData.ActionTypes.LOAD_DTE_STATUS)
    .switchMap(() => {
      return this.dteStatusService.getAllDTEStatus()
        .map((response: models.IBaseLookUp[]) => {
          return new lookupData.LoadDTEStausCompleteAction(response);
        })
        .catch((err) => {
          return of(new lookupData.LoadDTEStausFailAction('Failed to load Reasons for DTE Staus'));
        });
    });

  @Effect()
  loadRepairInspectionStatus$: Observable<Action> = this.actions$
    .ofType(lookupData.ActionTypes.LOAD_REPAIR_INSPECTION_STATUS)
    .switchMap(() => {
      return this.repairInspectionStatusService.getAllRepairInspectionStatus()
        .map((response: models.IBaseLookUp[]) => {
          return new lookupData.LoadRepairInspectionStatusCompleteAction(response);
        })
        .catch((err) => {
          return of(new lookupData.LoadRepairInspectionStatusFailAction('Failed to load Repair Inspection Status'));
        });
    });

  @Effect({ dispatch: false })
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
    lookupData.ActionTypes.LOAD_CAUSE_OF_DAMAGES_FAIL,
    lookupData.ActionTypes.LOAD_FLOORBOARD_CONDITIONS_FAIL,
    lookupData.ActionTypes.LOAD_REPAIR_DOCUMENTS_FAIL,
    lookupData.ActionTypes.LOAD_REPAIR_DESCRIPTIONS_FAIL,
    lookupData.ActionTypes.LOAD_REASONS_FOR_CHANGE_FAIL,
    lookupData.ActionTypes.LOAD_DTE_STATUS_FAIL,
    lookupData.ActionTypes.LOAD_REPAIR_INSPECTION_STATUS_FAIL
    )
    .map((action: Action) => {
      this.toastr.error(<string>action.payload, 'ERROR');
      return null;
    });


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
    private causeOfDamageService: services.CauseOfDamageService,
    private floorboardConditionService: services.FloorboardConditionService,
    private repairDocumentService: services.RepairDocumentService,
    private repairDescriptionService: services.RepairDescriptionService,
    private reasonsForChangeService: services.ReasonForChangeService,
    private dteStatusService: services.DteStatusService,
    private repairInspectionStatusService: services.RepairInspectionStatusService,
    private toastr: ToastrService) {
  }
}
