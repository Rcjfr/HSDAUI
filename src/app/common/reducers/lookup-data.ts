import { ActionReducer, Action } from '@ngrx/store';
import * as models from '@app/common/models';
import { LookupDataRecord, LookupDataFactory } from '@app/common/reducers/models/lookup-data';
import * as lookupDataActions from '@app/common/actions/lookup-data';
import { List, Record } from 'immutable';
import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
export interface State {
  loading: boolean;
  lookupData: models.ILookupData;
  fleetCheckTypes: List<models.ICheckType>;
  stations: List<models.IStation>;
}
export interface StateRecord extends TypedRecord<StateRecord>, State { }

export const stateFactory = makeTypedFactory<State, StateRecord>({
  loading: false,
  fleetCheckTypes: <List<models.ICheckType>>List.of(),
  stations: <List<models.IStation>>List.of(),
  lookupData: LookupDataFactory()
});

function makeInitialState() {
  return stateFactory();
}
export const reducer: ActionReducer<StateRecord> = (state: StateRecord = makeInitialState(), action: lookupDataActions.Actions) => {

  switch (action.type) {
    case lookupDataActions.ActionTypes.LOAD_LOOKUP_DATA:
    case lookupDataActions.ActionTypes.LOAD_FLEET_CHECK_TYPES:
    case lookupDataActions.ActionTypes.LOAD_STATIONS:
      {
        return state.merge({ loading: true });
      }
    case lookupDataActions.ActionTypes.LOAD_LOOKUP_DATA_FAILED:
      {
        return state.merge({ loading: false });
      }
    case lookupDataActions.ActionTypes.LOAD_LOOKUP_DATA_COMPLETE:
      {
        const act = action as lookupDataActions.LoadLookupDataCompleteAction;

        return state.merge({ loading: false, lookupData: LookupDataFactory(act.payload) });
      }
    case lookupDataActions.ActionTypes.LOAD_FLEET_CHECK_TYPES_COMPLETE:
      {
        const act = action as lookupDataActions.LoadFleetCheckTypesCompleteAction;

        return state.merge({ loading: false, fleetCheckTypes: List.of(...act.payload) });
      }
    case lookupDataActions.ActionTypes.LOAD_STATIONS_COMPLETE:
      {
        const act = action as lookupDataActions.LoadStationsCompleteAction;

        return state.merge({ loading: false, stations: List.of(...act.payload) });
      }
    default: {
      return state;
    }
  }
};

// Selector Functions
export const getAlertCodes = (state: State) => state.lookupData.alertCodes;
export const getLoading = (state: State) => state.loading;
export const getATACodes = (state: State) => state.lookupData.ataCodes;
export const getCheckTypes = (state: State) => state.lookupData.checkTypes;
export const getFleetCheckTypes = (state: State) => state.fleetCheckTypes;
export const getCorrosionLevels = (state: State) => state.lookupData.corrosionLevels;
export const getCorrosionTypes = (state: State) => state.lookupData.corrosionTypes;
export const getDepartments = (state: State) => state.lookupData.departments;
export const getDetectionMethods = (state: State) => state.lookupData.detectionMethods;
export const getStations = (state: State) => state.stations;
export const getDamageTypes = (state: State) => state.lookupData.damageTypes;
export const getCauseOfDamages = (state: State) => state.lookupData.causeOfDamages;
export const getFloorboardConditions = (state: State) => state.lookupData.floorBoardConditions;
export const getRepairDocuments = (state: State) => state.lookupData.repairDocumentTypes;
export const getRepairDescriptions = (state: State) => state.lookupData.repairDescriptionTypes;
export const getReasonsForChange = (state: State) => state.lookupData.corrosionLevelChangeReasons;
export const getDTEStatus = (state: State) => state.lookupData.dteStatus;
export const getRepairInspectionStatus = (state: State) => state.lookupData.repairInspectionStatus;
