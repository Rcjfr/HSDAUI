import { ActionReducer, Action } from '@ngrx/store';
import * as models from '../models';
import * as lookupDataActions from '../actions/lookup-data';
import { List, Record } from 'immutable';
import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
export interface State {
  loading: boolean;
  alertCodes: models.IAlertCode[];
  ATACodes: models.IATACode[];
  checkTypes: models.ICheckType[];
  corrosionLevels: models.ICorrosionLevel[];
  corrossionTypes: models.ICorrosionType[];
  departments: models.IDepartment[];
  detectionMethods: models.IDetectionMethod[];
  stations: models.IStation[];
}
export interface StateRecord extends TypedRecord<StateRecord>, State { }

export const stateFactory = makeTypedFactory<State, StateRecord>({
  loading: false,
  alertCodes: [],
  ATACodes: [],
  checkTypes: [],
  corrosionLevels: [],
  corrossionTypes: [],
  departments: [],
  detectionMethods: [],
  stations: []
});

function makeInitialState() {
  return stateFactory();
}
export const reducer: ActionReducer<StateRecord> = (state: StateRecord = makeInitialState(), action: lookupDataActions.Actions) => {
  switch (action.type) {
    case lookupDataActions.ActionTypes.LOAD_ALERT_CODES:
    case lookupDataActions.ActionTypes.LOAD_ATA_CODES:
    case lookupDataActions.ActionTypes.LOAD_CHECK_TYPES:
    case lookupDataActions.ActionTypes.LOAD_CORROSION_LEVELS:
    case lookupDataActions.ActionTypes.LOAD_CORROSION_TYPES:
    case lookupDataActions.ActionTypes.LOAD_DEPARTMENTS:
    case lookupDataActions.ActionTypes.LOAD_DETECTION_METHODS:
    case lookupDataActions.ActionTypes.LOAD_STATIONS:
      {
        return state.merge({ loading: true });
      }
      case lookupDataActions.ActionTypes.LOAD_ALERT_CODES_COMPLETE:
      {
        const act = action as lookupDataActions.LoadAlertCodesCompleteAction;
        return state.merge({ loading: false, alertCodes: act.payload });
      }
    case lookupDataActions.ActionTypes.LOAD_ATA_CODES_COMPLETE:
      {
        const act = action as lookupDataActions.LoadATACodesCompleteAction;
        return state.merge({ loading: false, ATACodes: act.payload });
      }
    case lookupDataActions.ActionTypes.LOAD_CHECK_TYPES_COMPLETE:
      {
        const act = action as lookupDataActions.LoadCheckTypesCompleteAction;
        return state.merge({ loading: false, checkTypes: act.payload });
      }
    case lookupDataActions.ActionTypes.LOAD_CORROSION_LEVELS_COMPLETE:
      {
        const act = action as lookupDataActions.LoadCorrosionLevelsCompleteAction;
        return state.merge({ loading: false, corrosionLevels: act.payload });
      }
    case lookupDataActions.ActionTypes.LOAD_CORROSION_TYPES_COMPLETE:
      {
        const act = action as lookupDataActions.LoadCorrosionTypesCompleteAction;
        return state.merge({ loading: false, corrosionTypes: act.payload });
      }
    case lookupDataActions.ActionTypes.LOAD_DEPARTMENTS_COMPLETE:
      {
        const act = action as lookupDataActions.LoadDepartmentsCompleteAction;
        return state.merge({ loading: false, departments: act.payload });
      }
      case lookupDataActions.ActionTypes.LOAD_DETECTION_METHODS_COMPLETE:
      {
        const act = action as lookupDataActions.LoadDetectionMethodsCompleteAction;
        return state.merge({ loading: false, detectionMethods: act.payload });
      }
    case lookupDataActions.ActionTypes.LOAD_STATIONS_COMPLETE:
      {
        const act = action as lookupDataActions.LoadStationsCompleteAction;
        return state.merge({ loading: false, stations: act.payload });
      }
    default: {
      return state;
    }
  }
};

// Selector Functions
export const getAlertCodes = (state: State) => state.alertCodes;
export const getLoading = (state: State) => state.loading;
export const getATACodes = (state: State) => state.ATACodes;
export const getCheckTypes = (state: State) => state.checkTypes;
export const getCorrosionLevels = (state: State) => state.corrosionLevels;
export const getCorrosionTypes = (state: State) => state.corrossionTypes;
export const getDepartments = (state: State) => state.departments;
export const getDetectionMethods = (state: State) => state.detectionMethods;
export const getStations = (state: State) => state.stations;
