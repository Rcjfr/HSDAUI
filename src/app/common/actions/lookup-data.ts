import { Action } from '@ngrx/store';
import * as models from '../models/index';


export const ActionTypes = {
  LOAD_ALERT_CODES: 'Load Alert Codes',
  LOAD_ALERT_CODES_COMPLETE: 'Load Alert Codes Complete',
  LOAD_ALERT_CODES_FAIL: 'Load Alert Codes Fail',

  LOAD_ATA_CODES: 'Load ATA Codes',
  LOAD_ATA_CODES_COMPLETE: 'Load ATA Codes Complete',
  LOAD_ATA_CODES_FAIL: 'Load ATA Codes Fail',

  LOAD_CHECK_TYPES: 'Load Check Types',
  LOAD_CHECK_TYPES_COMPLETE: 'Load Check Types Complete',
  LOAD_CHECK_TYPES_FAIL: 'Load Check Types Fail',

  LOAD_FLEET_CHECK_TYPES: 'Load Fleet Check Types',
  LOAD_FLEET_CHECK_TYPES_COMPLETE: 'Load Fleet Check Types Complete',
  LOAD_FLEET_CHECK_TYPES_FAIL: 'Load Fleet Check Types Fail',


  LOAD_CORROSION_LEVELS: 'Load Corrosion Levels',
  LOAD_CORROSION_LEVELS_COMPLETE: 'Load Corrosion Levels Complete',
  LOAD_CORROSION_LEVELS_FAIL: 'Load Corrosion Levels Fail',

  LOAD_CORROSION_TYPES: 'Load Corrosion Types',
  LOAD_CORROSION_TYPES_COMPLETE: 'Load Corrosion Types Complete',
  LOAD_CORROSION_TYPES_FAIL: 'Load Corrosion Types Fail',

  LOAD_DEPARTMENTS: 'Load Departments',
  LOAD_DEPARTMENTS_COMPLETE: 'Load Departments Complete',
  LOAD_DEPARTMENTS_FAIL: 'Load Departments Fail',

  LOAD_DETECTION_METHODS: 'Load Detection Methods',
  LOAD_DETECTION_METHODS_COMPLETE: 'Load Detection Methods Complete',
  LOAD_DETECTION_METHODS_FAIL: 'Load Detection Methods Fail',

  LOAD_STATIONS: 'Load Stations',
  LOAD_STATIONS_COMPLETE: 'Load Stations Complete',
  LOAD_STATIONS_FAIL: 'Load Stations Fail',

  LOAD_DAMAGE_TYPES: 'Load Damage Types',
  LOAD_DAMAGE_TYPES_COMPLETE: 'Load Damage Types Complete',
  LOAD_DAMAGE_TYPES_FAIL: 'Load Damage Types Fail',

  LOAD_CAUSE_OF_DAMAGES: 'Load Cause Of Damages',
  LOAD_CAUSE_OF_DAMAGES_COMPLETE: 'Load Cause Of Damages Complete',
  LOAD_CAUSE_OF_DAMAGES_FAIL: 'Load Cause Of Damages Fail',

  LOAD_FLOORBOARD_CONDITIONS: 'Load Floorboard Conditions',
  LOAD_FLOORBOARD_CONDITIONS_COMPLETE: 'Load Floorboard Conditions Complete',
  LOAD_FLOORBOARD_CONDITIONS_FAIL: 'Load Floorboard Conditions Fail',

  LOAD_REPAIR_DOCUMENT_TYPES: 'Load Repair Documents',
  LOAD_REPAIR_DOCUMENT_TYPES_COMPLETE: 'Load Repair Documents Complete',
  LOAD_REPAIR_DOCUMENT_TYPES_FAIL: 'Load Repair Documents Fail',

  LOAD_REPAIR_DESCRIPTION_TYPES: 'Load Repair Descriptions',
  LOAD_REPAIR_DESCRIPTION_TYPES_COMPLETE: 'Load Repair Descriptions Complete',
  LOAD_REPAIR_DESCRIPTION_TYPES_FAIL: 'Load Repair Descriptions Fail',

  LOAD_REASONS_FOR_CHANGE: 'Load Reasons for change',
  LOAD_REASONS_FOR_CHANGE_COMPLETE: 'Load Reasons for change Complete',
  LOAD_REASONS_FOR_CHANGE_FAIL: 'Load Reasons for change Fail',

  LOAD_DTE_STATUS: 'Load DTE Status',
  LOAD_DTE_STATUS_COMPLETE: 'Load DTE Status Complete',
  LOAD_DTE_STATUS_FAIL: 'Load DTE Status Fail',

  LOAD_REPAIR_INSPECTION_STATUS: 'Load Repair Inspection Status',
  LOAD_REPAIR_INSPECTION_STATUS_COMPLETE: 'Load Repair Inspection Status Complete',
  LOAD_REPAIR_INSPECTION_STATUS_FAIL: 'Load Repair Inspection Status Fail',



  LOAD_LOOKUP_DATA: 'Load All Lookup Data'
};

// Alert Codes
export class LoadAlertCodesAction implements Action {
  public type = ActionTypes.LOAD_ALERT_CODES;
  public payload: any;
  constructor() { }
}
export class LoadAlertCodesCompleteAction implements Action {
  public type = ActionTypes.LOAD_ALERT_CODES_COMPLETE;
  constructor(public payload: models.IAlertCode[]) { }
}
export class LoadAlertCodesFailAction implements Action {
  public type = ActionTypes.LOAD_ALERT_CODES_FAIL;
  constructor(public payload: any) { }
}
// ATA Codes
export class LoadATACodesAction implements Action {
  public type = ActionTypes.LOAD_ATA_CODES;
  public payload: any;
  constructor() { }
}
export class LoadATACodesCompleteAction implements Action {
  public type = ActionTypes.LOAD_ATA_CODES_COMPLETE;
  constructor(public payload: models.IATACode[]) { }
}
export class LoadATACodesFailAction implements Action {
  public type = ActionTypes.LOAD_ATA_CODES_FAIL;
  constructor(public payload: any) { }
}

// Check Types
export class LoadCheckTypesAction implements Action {
  public type = ActionTypes.LOAD_CHECK_TYPES;
  public payload: any;
  constructor() {
  }
}
export class LoadCheckTypesCompleteAction implements Action {
  public type = ActionTypes.LOAD_CHECK_TYPES_COMPLETE;
  constructor(public payload: models.ICheckType[]) { }
}
export class LoadCheckTypesFailAction implements Action {
  public type = ActionTypes.LOAD_CHECK_TYPES_FAIL;
  constructor(public payload: any) { }
}

export class LoadFleetCheckTypesAction implements Action {
  public type = ActionTypes.LOAD_FLEET_CHECK_TYPES;
  public payload: any;
  constructor(fleetType: string) {
    this.payload = fleetType;
  }
}
export class LoadFleetCheckTypesCompleteAction implements Action {
  public type = ActionTypes.LOAD_FLEET_CHECK_TYPES_COMPLETE;
  constructor(public payload: models.ICheckType[]) { }
}
export class LoadFleetCheckTypesFailAction implements Action {
  public type = ActionTypes.LOAD_FLEET_CHECK_TYPES_FAIL;
  constructor(public payload: any) { }
}



// Corrosion Levels
export class LoadCorrosionLevelsAction implements Action {
  public type = ActionTypes.LOAD_CORROSION_LEVELS;
  public payload: any;
  constructor() { }
}
export class LoadCorrosionLevelsCompleteAction implements Action {
  public type = ActionTypes.LOAD_CORROSION_LEVELS_COMPLETE;
  constructor(public payload: models.ICorrosionLevel[]) { }
}
export class LoadCorrosionLevelsFailAction implements Action {
  public type = ActionTypes.LOAD_CORROSION_LEVELS_FAIL;
  constructor(public payload: any) { }
}
// Corrosion Types
export class LoadCorrosionTypesAction implements Action {
  public type = ActionTypes.LOAD_CORROSION_TYPES;
  public payload: any;
  constructor() { }
}
export class LoadCorrosionTypesCompleteAction implements Action {
  public type = ActionTypes.LOAD_CORROSION_TYPES_COMPLETE;
  constructor(public payload: models.ICorrosionType[]) { }
}
export class LoadCorrosionTypesFailAction implements Action {
  public type = ActionTypes.LOAD_CORROSION_TYPES_FAIL;
  constructor(public payload: any) { }
}

// Departments
export class LoadDepartmentsAction implements Action {
  public type = ActionTypes.LOAD_DEPARTMENTS;
  public payload: any;
  constructor() { }
}
export class LoadDepartmentsCompleteAction implements Action {
  public type = ActionTypes.LOAD_DEPARTMENTS_COMPLETE;
  constructor(public payload: models.IDepartment[]) { }
}
export class LoadDepartmentsFailAction implements Action {
  public type = ActionTypes.LOAD_DEPARTMENTS_FAIL;
  constructor(public payload: any) { }
}

// Detection Methods
export class LoadDetectionMethodsAction implements Action {
  public type = ActionTypes.LOAD_DETECTION_METHODS;
  public payload: any;
  constructor() { }
}
export class LoadDetectionMethodsCompleteAction implements Action {
  public type = ActionTypes.LOAD_DETECTION_METHODS_COMPLETE;
  constructor(public payload: models.IDetectionMethod[]) { }
}
export class LoadDetectionMethodsFailAction implements Action {
  public type = ActionTypes.LOAD_DETECTION_METHODS_FAIL;
  constructor(public payload: any) { }
}

// Stations
export class LoadStationsAction implements Action {
  public type = ActionTypes.LOAD_STATIONS;
  public payload: any;
  constructor() { }
}
export class LoadStationsCompleteAction implements Action {
  public type = ActionTypes.LOAD_STATIONS_COMPLETE;
  constructor(public payload: models.IStation[]) { }
}
export class LoadStationsFailAction implements Action {
  public type = ActionTypes.LOAD_STATIONS_FAIL;
  constructor(public payload: any) { }
}

// Damage Types
export class LoadDamageTypesAction implements Action {
    public type = ActionTypes.LOAD_DAMAGE_TYPES;
    public payload: any;
    constructor() { }
}
export class LoadDamageTypesCompleteAction implements Action {
    public type = ActionTypes.LOAD_DAMAGE_TYPES_COMPLETE;
    constructor(public payload: models.IDamageType[]) { }
}
export class LoadDamageTypesFailAction implements Action {
    public type = ActionTypes.LOAD_DAMAGE_TYPES_FAIL;
    constructor(public payload: any) { }
}


// Cause Of Damages
export class LoadCauseOfDamagesAction implements Action {
    public type = ActionTypes.LOAD_CAUSE_OF_DAMAGES;
    public payload: any;
    constructor() { }
}
export class LoadCauseOfDamagesCompleteAction implements Action {
    public type = ActionTypes.LOAD_CAUSE_OF_DAMAGES_COMPLETE;
    constructor(public payload: models.ICauseOfDamage[]) { }
}
export class LoadCauseOfDamagesFailAction implements Action {
    public type = ActionTypes.LOAD_CAUSE_OF_DAMAGES_FAIL;
    constructor(public payload: any) { }
}


// Floorboard Condition
export class LoadFloorboardConditionsAction implements Action {
    public type = ActionTypes.LOAD_FLOORBOARD_CONDITIONS;
    public payload: any;
    constructor() { }
}
export class LoadFloorboardConditionsCompleteAction implements Action {
    public type = ActionTypes.LOAD_FLOORBOARD_CONDITIONS_COMPLETE;
    constructor(public payload: models.IFloorboardCondition[]) { }
}
export class LoadFloorboardConditionsFailAction implements Action {
    public type = ActionTypes.LOAD_FLOORBOARD_CONDITIONS_FAIL;
    constructor(public payload: any) { }
}


// Repair Documents
export class LoadRepairDocumentTypesAction implements Action {
    public type = ActionTypes.LOAD_REPAIR_DOCUMENT_TYPES;
    public payload: any;
    constructor() { }
}
export class LoadRepairDocumentTypesCompleteAction implements Action {
    public type = ActionTypes.LOAD_REPAIR_DOCUMENT_TYPES_COMPLETE;
    constructor(public payload: models.IRepairDocumentType[]) { }
}
export class LoadRepairDocumentTypesFailAction implements Action {
    public type = ActionTypes.LOAD_REPAIR_DOCUMENT_TYPES_FAIL;
    constructor(public payload: any) { }
}


// Repair Description
export class LoadRepairDescriptionTypesAction implements Action {
    public type = ActionTypes.LOAD_REPAIR_DESCRIPTION_TYPES;
    public payload: any;
    constructor() { }
}
export class LoadRepairDescriptionTypesCompleteAction implements Action {
    public type = ActionTypes.LOAD_REPAIR_DESCRIPTION_TYPES_COMPLETE;
    constructor(public payload: models.IRepairDescriptionType[]) { }
}
export class LoadRepairDescriptionTypesFailAction implements Action {
    public type = ActionTypes.LOAD_REPAIR_DESCRIPTION_TYPES_FAIL;
    constructor(public payload: any) { }
}

// Reasons for change
export class LoadReasonsForChangeAction implements Action {
  public type = ActionTypes.LOAD_REASONS_FOR_CHANGE;
  public payload: any;
  constructor() { }
}
export class LoadReasonsForChangeCompleteAction implements Action {
  public type = ActionTypes.LOAD_REASONS_FOR_CHANGE_COMPLETE;
  constructor(public payload: models.IReasonForChange[]) { }
}
export class LoadReasonsForChangeFailAction implements Action {
  public type = ActionTypes.LOAD_REASONS_FOR_CHANGE_FAIL;
  constructor(public payload: any) { }
}

//DTE Staus
export class LoadDTEStausAction implements Action {
  public type = ActionTypes.LOAD_DTE_STATUS;
  public payload: any;
  constructor() { }
}
export class LoadDTEStausCompleteAction implements Action {
  public type = ActionTypes.LOAD_DTE_STATUS_COMPLETE;
  constructor(public payload: models.IBaseLookUp[]) { }
}
export class LoadDTEStausFailAction implements Action {
  public type = ActionTypes.LOAD_DTE_STATUS_FAIL;
  constructor(public payload: any) { }
}

//Repair Inspection Status
export class LoadRepairInspectionStatusAction implements Action {
  public type = ActionTypes.LOAD_REPAIR_INSPECTION_STATUS;
  public payload: any;
  constructor() { }
}
export class LoadRepairInspectionStatusCompleteAction implements Action {
  public type = ActionTypes.LOAD_REPAIR_INSPECTION_STATUS_COMPLETE;
  constructor(public payload: models.IBaseLookUp[]) { }
}
export class LoadRepairInspectionStatusFailAction implements Action {
  public type = ActionTypes.LOAD_REPAIR_INSPECTION_STATUS_FAIL;
  constructor(public payload: any) { }
}


// Load Lookup Data
export class LoadLookupDataAction implements Action {
  public type = ActionTypes.LOAD_LOOKUP_DATA;
  public payload: any;
  constructor() { }
}


export type Actions =
  LoadAlertCodesAction |
  LoadAlertCodesCompleteAction |
  LoadAlertCodesFailAction |
  LoadATACodesAction |
  LoadATACodesCompleteAction |
  LoadATACodesFailAction |
  LoadCheckTypesAction |
  LoadCheckTypesCompleteAction |
  LoadCheckTypesFailAction |
  LoadCorrosionLevelsAction |
  LoadCorrosionLevelsCompleteAction |
  LoadCorrosionLevelsFailAction |
  LoadCorrosionTypesAction |
  LoadCorrosionTypesCompleteAction |
  LoadCorrosionTypesFailAction |
  LoadDepartmentsAction |
  LoadDepartmentsCompleteAction |
  LoadDepartmentsFailAction |
  LoadDetectionMethodsAction |
  LoadDetectionMethodsCompleteAction |
  LoadDetectionMethodsFailAction |
  LoadStationsAction |
  LoadStationsCompleteAction |
  LoadStationsFailAction |
  LoadDamageTypesAction |
  LoadDamageTypesCompleteAction |
  LoadDamageTypesFailAction |
  LoadCauseOfDamagesAction |
  LoadCauseOfDamagesCompleteAction |
  LoadCauseOfDamagesFailAction |
  LoadFloorboardConditionsAction |
  LoadFloorboardConditionsCompleteAction |
  LoadFloorboardConditionsFailAction |
  LoadRepairDocumentTypesAction |
  LoadRepairDocumentTypesCompleteAction |
  LoadRepairDocumentTypesFailAction |
  LoadRepairDescriptionTypesAction |
  LoadRepairDescriptionTypesCompleteAction |
  LoadRepairDescriptionTypesFailAction |
  LoadReasonsForChangeAction |
  LoadReasonsForChangeCompleteAction |
  LoadReasonsForChangeFailAction |
  LoadDTEStausAction |
  LoadDTEStausCompleteAction |
  LoadDTEStausFailAction |
  LoadRepairInspectionStatusAction |
  LoadRepairInspectionStatusCompleteAction |
  LoadRepairInspectionStatusFailAction |
  LoadLookupDataAction;