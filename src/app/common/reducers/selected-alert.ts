import { ActionReducer, Action } from '@ngrx/store';
import { IAlert,ISdaListView } from '../models';
import { SdaRecord, sdaFactory } from './models/sda';
import { AircraftInfoRecord, aircraftInfoFactory } from './models/aircraft-info';
import { ATACodeRecord, ATACodeFactory } from './models/ata-code';
import * as selectedAlertActions from '../actions/selected-alert';
import { List, Record } from 'immutable';
import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';

export interface State {
  loading: boolean;
  sda: SdaRecord;
  noseNumbers: List<string>;
  aircraftInfo: AircraftInfoRecord;
  sdaList: List<ISdaListView>;
}
export interface StateRecord extends TypedRecord<StateRecord>, State { }

export const stateFactory = makeTypedFactory<State, StateRecord>({
  loading: false,
  sda: sdaFactory(),
  noseNumbers: <List<string>>List.of(),
  aircraftInfo: aircraftInfoFactory(),
  sdaList: <List<ISdaListView>>List.of(),
});

function makeInitialState() {
  return stateFactory();
}
export const reducer: ActionReducer<StateRecord> = (state: StateRecord = makeInitialState(), action: selectedAlertActions.Actions) => {
  switch (action.type) {
    case selectedAlertActions.ActionTypes.LOAD_AIRCRAFT_INFO:
    case selectedAlertActions.ActionTypes.SAVE_SDA:
      {
        return state.merge({ loading: true });
      }
    case selectedAlertActions.ActionTypes.LOAD_SDAS_COMPLETE:
      {
        const act = action as selectedAlertActions.LoadSDAsCompleteAction;
        return state.merge({ loading: false, sdaList: List.of(...act.payload) });
    }
    case selectedAlertActions.ActionTypes.LOAD_AIRCRAFT_INFO_COMPLETE:
      {
        const act = action as selectedAlertActions.LoadAircraftInfoCompleteAction;

        return state.merge({ loading: false, aircraftInfo: aircraftInfoFactory(act.payload) });
      }
    case selectedAlertActions.ActionTypes.LOAD_AIRCRAFT_INFO_FAIL:
    case selectedAlertActions.ActionTypes.SAVE_SDA_FAIL:
      {
        return state.merge({ loading: false });
      }
    case selectedAlertActions.ActionTypes.LOAD_NOSE_NUMBERS_COMPLETE:
      {
        const act = action as selectedAlertActions.LoadNoseNumbersCompleteAction;

        return state.merge({ loading: false, noseNumbers: List.of(...act.payload) });
      }
    default: {
      return state;
    }
  }
};

// Selector Functions
export const getSelectedAlert = (state: State) => state.sda;
export const getSDAList = (state: State) => state.sdaList;
export const getLoading = (state: State) => state.loading;
export const getAircraftInfo = (state: State) => state.aircraftInfo;
export const getNoseNumbers = (state: State) => state.noseNumbers;

