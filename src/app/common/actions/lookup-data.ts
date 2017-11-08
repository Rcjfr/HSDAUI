import { Action } from '@ngrx/store';
import * as models from '@app/common/models/index';


export const ActionTypes = {
  LOAD_FLEET_CHECK_TYPES: 'Load Fleet Check Types',
  LOAD_FLEET_CHECK_TYPES_COMPLETE: 'Load Fleet Check Types Complete',
  LOAD_FLEET_CHECK_TYPES_FAIL: 'Load Fleet Check Types Fail',


  LOAD_STATIONS: 'Load Stations',
  LOAD_STATIONS_COMPLETE: 'Load Stations Complete',
  LOAD_STATIONS_FAIL: 'Load Stations Fail',

  LOAD_LOOKUP_DATA: 'Load All Lookup Data',
  LOAD_LOOKUP_DATA_COMPLETE: 'Load All Lookup Data Complete',
  LOAD_LOOKUP_DATA_FAILED: 'Load All Lookup Data Failed'
};

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

// Stations
export class LoadStationsAction implements Action {
  public type = ActionTypes.LOAD_STATIONS;
  constructor(public payload: string) { }
}
export class LoadStationsCompleteAction implements Action {
  public type = ActionTypes.LOAD_STATIONS_COMPLETE;
  constructor(public payload: models.IStation[]) { }
}
export class LoadStationsFailAction implements Action {
  public type = ActionTypes.LOAD_STATIONS_FAIL;
  constructor(public payload: any) { }
}

// Load Lookup Data
export class LoadLookupDataAction implements Action {
  public type = ActionTypes.LOAD_LOOKUP_DATA;
  public payload: any;
  constructor() { }
}

export class LoadLookupDataCompleteAction implements Action {
  public type = ActionTypes.LOAD_LOOKUP_DATA_COMPLETE;
  constructor(public payload: models.ILookupData) { }
}

export class LoadLookupDataFailedAction implements Action {
  public type = ActionTypes.LOAD_LOOKUP_DATA_FAILED;
  constructor(public payload: string) { }
}


export type Actions =
  LoadStationsAction |
  LoadStationsCompleteAction |
  LoadStationsFailAction |
  LoadFleetCheckTypesAction |
  LoadFleetCheckTypesCompleteAction |
  LoadFleetCheckTypesFailAction |
  LoadLookupDataAction |
  LoadLookupDataCompleteAction |
  LoadLookupDataFailedAction;
