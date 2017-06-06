import { Action } from '@ngrx/store';
import { Alert } from '../models/alert.model';
import * as models from '../../common/models/index';

export const ActionTypes = {
    LOAD_NOSE_NUMBERS: 'Load Nose Numbers',
    LOAD_NOSE_NUMBERS_COMPLETE: 'Load Nose Numbers Complete',
    LOAD_NOSE_NUMBERS_FAIL: 'Load Nose Numbers Fail',
    LOAD_AIRCRAFT_INFO: 'Load Aircraft Info',
    LOAD_AIRCRAFT_INFO_COMPLETE: 'Load Aircraft Info Complete',
    LOAD_AIRCRAFT_INFO_FAIL: 'Load Aircraft Info Fail'
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

export type Actions =
    LoadNoseNumbersAction |
    LoadNoseNumbersCompleteAction |
    LoadNoseNumbersFailAction |
    LoadAircraftInfoAction |
    LoadAircraftInfoCompleteAction |
    LoadAircraftInfoFailAction;

