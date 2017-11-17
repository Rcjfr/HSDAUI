import { ActionReducer, Action } from '@ngrx/store';
import { IAlert, ISdaListView, Status } from '@app/common/models';
import { SdaRecord, sdaFactory } from '@app/common/reducers/models/sda';
import { SdaListResult, SdaSearchCriteria, IAircraftInfo } from '@app/common/models';
import { AircraftInfoRecord, aircraftInfoFactory } from '@app/common/reducers/models/aircraft-info';
import { ATACodeRecord, ATACodeFactory } from '@app/common/reducers/models/ata-code';
import { SavedStateRecord, SavedStateFactory } from '@app/common/reducers/models/saved-state';
import * as selectedAlertActions from '@app/common/actions/selected-alert';
import { List, Record } from 'immutable';
import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';

export interface State {
  loading: boolean;
  savedState: SavedStateRecord,
  currentSdaId: number;
  loadNewSdaCounter: number,
  sda: SdaRecord;
  newSdaStatus: Status;
  noseNumbers: List<IAircraftInfo>;
  aircraftInfo: AircraftInfoRecord;
  sdaListResult: SdaListResult
  searchCriteria: SdaSearchCriteria
}
export interface StateRecord extends TypedRecord<StateRecord>, State { }

export const stateFactory = makeTypedFactory<State, StateRecord>({
  loading: false,
  savedState: null,
  loadNewSdaCounter: 0,
  currentSdaId: 0,
  sda: sdaFactory(),
  newSdaStatus: Status.Open,
  noseNumbers: List.of<AircraftInfoRecord>(),
  aircraftInfo: aircraftInfoFactory(),
  sdaListResult: new SdaListResult(),
  searchCriteria: new SdaSearchCriteria()
});

function makeInitialState() {
  return stateFactory();
}

export const reducer: ActionReducer<StateRecord> = (state: StateRecord = makeInitialState(), action: selectedAlertActions.Actions) => {
  switch (action.type) {
    case selectedAlertActions.ActionTypes.LOAD_AIRCRAFT_INFO:
    case selectedAlertActions.ActionTypes.SAVE_SDA:
    case selectedAlertActions.ActionTypes.LOAD_SDA:
      {
        return state.merge({ loading: true });
      }
    case selectedAlertActions.ActionTypes.LOAD_NEW_SDA:
      {
        return state.merge({ loadNewSdaCounter: state.loadNewSdaCounter + 1 });
      }
    case selectedAlertActions.ActionTypes.LOAD_SDA_COMPLETE:
      {
        const act = action as selectedAlertActions.LoadSdaCompleteAction;

        return state.merge({ loading: false, currentSdaId: act.payload.id, newSdaStatus: act.payload.status, sda: act.payload.id ? sdaFactory(act.payload) : sdaFactory() });
      }
      case selectedAlertActions.ActionTypes.SAVE_SDA_SEARCH_CRITERIA:
      {
        return state.merge({ loading: false, searchCriteria: action.payload });
      }
      case selectedAlertActions.ActionTypes.LOAD_SDAS:
      {
        return state.merge({ loading: true });
      }
    case selectedAlertActions.ActionTypes.LOAD_SDAS_COMPLETE:
      {
        const act = action as selectedAlertActions.LoadSdasCompleteAction;

        return state.merge({ loading: false, sdaListResult: new SdaListResult(act.payload) });
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
    case selectedAlertActions.ActionTypes.SAVE_SDA_COMPLETE:
      {
        const act = action as selectedAlertActions.SaveSdaCompleteAction;

        return state.merge({
          loading: false,
          sda: sdaFactory(act.payload.sda),
          newSdaStatus: act.payload.sda.status,
          savedState: SavedStateFactory(act.payload),
          currentSdaId: act.payload.sdaId
        });
      }
    case selectedAlertActions.ActionTypes.LOAD_NOSE_NUMBERS_COMPLETE:
      {
        const act = action as selectedAlertActions.LoadNoseNumbersCompleteAction;

        return state.merge({ loading: false, noseNumbers: List.of(...act.payload) });
      }
    case selectedAlertActions.ActionTypes.SET_SDA_NEW_STATUS:
      {
        const act = action as selectedAlertActions.SetSdaNewStatusAction;

        return state.merge({ newSdaStatus: act.payload });
      }
    case selectedAlertActions.ActionTypes.OPERATION_FAILED:
      {
        return state.merge({ loading: false });
      }
    default: {
      return state;
    }
  }
};

// Selector Functions
export const getSelectedSda = (state: State) => state.sda;
export const getSdaListResult = (state: State) => state.sdaListResult;
export const getLoading = (state: State) => state.loading;
export const getSavedState = (state: State) => state.savedState;
export const getLoadNewSdaState = (state: State) => state.loadNewSdaCounter;
export const getCurrentSdaId = (state: State) => state.currentSdaId;
export const getAircraftInfo = (state: State) => state.aircraftInfo;
export const getNoseNumbers = (state: State) => state.noseNumbers;
export const getSearchCriteria = (state: State) => state.searchCriteria;
export const getNewSdaStatus = (state: State) => state.newSdaStatus;

