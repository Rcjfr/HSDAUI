import { Action } from '@ngrx/store';
import * as models from '../models/index';

export const ActionTypes = {
  LOAD_NOSE_NUMBERS: 'Load Nose Numbers',
  LOAD_NOSE_NUMBERS_COMPLETE: 'Load Nose Numbers Complete',
  LOAD_NOSE_NUMBERS_FAIL: 'Load Nose Numbers Fail',
  LOAD_AIRCRAFT_INFO: 'Load Aircraft Info',
  LOAD_AIRCRAFT_INFO_COMPLETE: 'Load Aircraft Info Complete',
  LOAD_AIRCRAFT_INFO_FAIL: 'Load Aircraft Info Fail',
  SAVE_SDA: 'Save SDA',
  SAVE_SDA_COMPLETE: 'Save SDA Complete',
  SAVE_SDA_FAIL: 'Save SDA Fail',
  LOAD_SDAS: 'Load SDAs',
  LOAD_SDAS_COMPLETE: 'Load SDAs Complete',
  LOAD_SDAS_FAIL: 'Load SDAs Fail',
  LOAD_SDA: 'Load SDA',
  LOAD_SDA_COMPLETE: 'Load SDA Complete',
  LOAD_SDA_FAIL: 'Load SDA Fail',
  LOAD_NEW_SDA: 'Load New SDA',
  SAVE_SDA_SEARCH_CRITERIA: 'Update SDA Search Criteria',
  SET_SDA_NEW_STATUS: 'Set SDA new status'

};


export class LoadNoseNumbersAction implements Action {
  public type = ActionTypes.LOAD_NOSE_NUMBERS;
  constructor(public payload: string) { }
}
export class LoadNoseNumbersCompleteAction implements Action {
  public type = ActionTypes.LOAD_NOSE_NUMBERS_COMPLETE;
  constructor(public payload: Array<string>) { }
}
export class LoadNoseNumbersFailAction implements Action {
  public type = ActionTypes.LOAD_NOSE_NUMBERS_FAIL;
  constructor(public payload: any) { }
}

export class LoadAircraftInfoAction implements Action {
  public type = ActionTypes.LOAD_AIRCRAFT_INFO;
  constructor(public payload: string) { }
}
export class LoadAircraftInfoCompleteAction implements Action {
  public type = ActionTypes.LOAD_AIRCRAFT_INFO_COMPLETE;
  constructor(public payload: models.IAircraftInfo) { }
}
export class LoadAircraftInfoFailAction implements Action {
  public type = ActionTypes.LOAD_AIRCRAFT_INFO_FAIL;
  constructor(public payload: any) { }
}

export class SaveSdaAction implements Action {
  public type = ActionTypes.SAVE_SDA;
  constructor(public payload: models.ISda) { }
}
export class SaveSdaCompleteAction implements Action {
  public type = ActionTypes.SAVE_SDA_COMPLETE;
  constructor(public payload: models.ISavedState) { }
}
export class SaveSdaFailAction implements Action {
  public type = ActionTypes.SAVE_SDA_FAIL;
  constructor(public payload: any) { }
}

export class LoadSdasAction implements Action {
  public type = ActionTypes.LOAD_SDAS;
  constructor(public payload: any) { }
}
export class SaveSdaSearchCriteria implements Action {
  public type = ActionTypes.SAVE_SDA_SEARCH_CRITERIA;
  constructor(public payload: models.ISdaSearchCriteria) { }
}
export class LoadSdasCompleteAction implements Action {
  public type = ActionTypes.LOAD_SDAS_COMPLETE;
  constructor(public payload: models.ISdaListResult) { }
}
export class LoadSdasFailAction implements Action {
  public type = ActionTypes.LOAD_SDAS_FAIL;
  constructor(public payload: any) { }
}

export class LoadSdaAction implements Action {
  public type = ActionTypes.LOAD_SDA;
  constructor(public payload: number) { }
}
export class LoadSdaCompleteAction implements Action {
  public type = ActionTypes.LOAD_SDA_COMPLETE;
  constructor(public payload: models.ISda) { }
}
export class LoadSdaFailAction implements Action {
  public type = ActionTypes.LOAD_SDA_FAIL;
  constructor(public payload: any) { }
}
export class LoadNewSdaAction implements Action {
  public type = ActionTypes.LOAD_NEW_SDA;
  public payload: any
  constructor() { }
}
export class SetSdaNewStatusAction implements Action {
  public type = ActionTypes.SET_SDA_NEW_STATUS;
  constructor(public payload: models.Status) { }
}

export type Actions =
  LoadNoseNumbersAction |
  LoadNoseNumbersCompleteAction |
  LoadNoseNumbersFailAction |
  LoadAircraftInfoAction |
  LoadAircraftInfoCompleteAction |
  LoadAircraftInfoFailAction |
  SaveSdaAction |
  SaveSdaCompleteAction |
  SaveSdaFailAction |
  LoadSdasAction |
  SaveSdaSearchCriteria |
  LoadSdasCompleteAction |
  LoadSdasFailAction |
  LoadSdaAction |
  LoadSdaCompleteAction |
  LoadSdaFailAction |
  LoadNewSdaAction |
  SetSdaNewStatusAction;

