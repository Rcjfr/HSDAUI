﻿import { ActionReducer, Action } from '@ngrx/store';
import { Alert } from '../models/alert.model';
import {AlertRecord, alertFactory} from './models/alert';
import {AircraftInfoRecord, aircraftInfoFactory} from './models/aircraftInfo';
import { AircraftInfo } from '../models/aircraft-info.model';
import * as selectedAlert from '../actions/selected-alert';
import { List, Record } from 'immutable';
import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
export interface State {
    loading: boolean;
    alert: AlertRecord;
    noseNumbers: List<string>;
    aircraftInfo: AircraftInfoRecord;
}
export interface StateRecord extends TypedRecord<StateRecord>, State { }

 export const stateFactory = makeTypedFactory<State, StateRecord>({
        loading: false,
        alert: alertFactory(),
        noseNumbers: <List<string>>List.of(),
        aircraftInfo: aircraftInfoFactory()
 });

function makeInitialState() {
    return stateFactory();
}
export function reducer(state: StateRecord = makeInitialState(), action: selectedAlert.Actions): StateRecord {
    switch (action.type) {
        case selectedAlert.ActionTypes.LOAD_AIRCRAFT_INFO:
        {
           return state.merge({loading: true});
        }
        case selectedAlert.ActionTypes.LOAD_AIRCRAFT_INFO_COMPLETE:
        {
           const act = action as selectedAlert.LoadAircraftInfoCompleteAction;
           return state.merge({loading: false, aircraftInfo: aircraftInfoFactory(act.payload)});
        }
        case selectedAlert.ActionTypes.LOAD_AIRCRAFT_INFO_FAIL:
        {
            return state.merge({loading: false});
        }
        case selectedAlert.ActionTypes.LOAD_NOSE_NUMBERS_COMPLETE:
        {
            const act = action as selectedAlert.LoadNoseNumbersCompleteAction;
            return state.merge({loading: false, noseNumbers: List.of(act.payload)});
        }
        default: {
            return state;
        }
    }
}

// Selector Functions
export const getSelectedAlert = (state: State) => state.alert;
export const getSelectedAlertLoading = (state: State) => state.loading;
export const getSelectedAlertAircraftInfo = (state: State) => state.aircraftInfo;
export const getSelectedAlertNoseNumbers = (state: State) => state.noseNumbers;
