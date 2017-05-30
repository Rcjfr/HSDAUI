import { Action } from '@ngrx/store';
import { Alert } from '../models/alert.model';
import { AircraftInfo } from '../../common/models/aircraft-info.model';
import { ATACode } from '../../common/models/ata-code.model';
import { IStation } from '../../common/models/station.model';

export const ActionTypes = {
    LOAD_NOSE_NUMBERS: 'Load Nose Numbers',
    LOAD_NOSE_NUMBERS_COMPLETE: 'Load Nose Numbers Complete',
    LOAD_NOSE_NUMBERS_FAIL: 'Load Nose Numbers Fail',
    LOAD_AIRCRAFT_INFO: 'Load Aircraft Info',
    LOAD_AIRCRAFT_INFO_COMPLETE: 'Load Aircraft Info Complete',
    LOAD_AIRCRAFT_INFO_FAIL: 'Load Aircraft Info Fail',
    LOAD_ATA_CODES: 'Load ATA Codes',
    LOAD_ATA_CODES_COMPLETE: 'Load ATA Codes Complete',
    LOAD_ATA_CODES_FAIL: 'Load ATA Codes Fail',
    LOAD_STATIONS: 'Load Stations',
    LOAD_STATIONS_COMPLETE: 'Load Stations Complete',
    LOAD_STATIONS_FAIL: 'Load Stations Fail'
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
    constructor(public payload: AircraftInfo) { }
}
export class LoadAircraftInfoFailAction implements Action {
    public type = ActionTypes.LOAD_AIRCRAFT_INFO_FAIL;
    constructor(public payload: any) { }
}

export class LoadATACodesAction implements Action {
    public type = ActionTypes.LOAD_ATA_CODES;
    public payload: any;
    constructor() { }
}
export class LoadATACodesCompleteAction implements Action {
    public type = ActionTypes.LOAD_ATA_CODES_COMPLETE;
    constructor(public payload: ATACode[]) { }
}
export class LoadATACodesFailAction implements Action {
    public type = ActionTypes.LOAD_ATA_CODES_FAIL;
    constructor(public payload: any) { }
}
export class LoadStationsAction implements Action {
    public type = ActionTypes.LOAD_STATIONS;
    public payload: any;
    constructor() { }
}
export class LoadStationsCompleteAction implements Action {
    public type = ActionTypes.LOAD_STATIONS_COMPLETE;
    constructor(public payload: IStation[]) { }
}
export class LoadStationsFailAction implements Action {
    public type = ActionTypes.LOAD_STATIONS_FAIL;
    constructor(public payload: any) { }
}


export type Actions =
    LoadNoseNumbersAction |
    LoadNoseNumbersCompleteAction |
    LoadNoseNumbersFailAction |
    LoadAircraftInfoAction |
    LoadAircraftInfoCompleteAction |
    LoadAircraftInfoFailAction |
    LoadATACodesAction |
    LoadATACodesCompleteAction |
    LoadATACodesFailAction |
    LoadStationsAction |
    LoadStationsCompleteAction |
    LoadStationsFailAction;

