import { ActionReducer, Action } from '@ngrx/store';
import * as models from '../models';
import * as lookupDataActions from '../actions/lookup-data';
import { List, Record } from 'immutable';
import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
export interface State {
  loading: boolean;
  alertCodes: List<models.IAlertCode>;
  ataCodes: List<models.IATACode>;
  checkTypes: List<models.ICheckType>;
  fleetCheckTypes: List<models.ICheckType>;
  corrosionLevels: List<models.ICorrosionLevel>;
  corrosionTypes: List<models.ICorrosionType>;
  departments: List<models.IDepartment>;
  detectionMethods: List<models.IDetectionMethod>;
  stations: List<models.IStation>;
  damageTypes: List<models.IDamageType>;
  causeOfDamages: List<models.ICauseOfDamage>;
  floorboardConditions: List<models.IFloorboardCondition>;
  repairDocuments: List<models.IRepairDocument>;
  repairDescriptions: List<models.IRepairDescription>;
  reasonsForChange: List<models.IReasonForChange>;
}
export interface StateRecord extends TypedRecord<StateRecord>, State { }

export const stateFactory = makeTypedFactory<State, StateRecord>({
  loading: false,
  alertCodes: <List<models.IAlertCode>>List.of(),
  ataCodes: <List<models.IATACode>>List.of(),
  checkTypes: <List<models.ICheckType>>List.of(),
  fleetCheckTypes: <List<models.ICheckType>>List.of(),
  corrosionLevels: <List<models.ICorrosionLevel>>List.of(),
  corrosionTypes: <List<models.ICorrosionType>>List.of(),
  departments: <List<models.IDepartment>>List.of(),
  detectionMethods: <List<models.IDetectionMethod>>List.of(),
  stations: <List<models.IStation>>List.of(),
  damageTypes: <List<models.IDamageType>>List.of(),
  causeOfDamages: <List<models.ICauseOfDamage>>List.of(),
  floorboardConditions: <List<models.IFloorboardCondition>>List.of(),
  repairDocuments: <List<models.IRepairDocument>>List.of(),
  repairDescriptions: <List<models.IRepairDescription>>List.of(),
  reasonsForChange: <List<models.IReasonForChange>>List.of()
});

function makeInitialState() {
  return stateFactory();
}
export const reducer: ActionReducer<StateRecord> = (state: StateRecord = makeInitialState(), action: lookupDataActions.Actions) => {

  switch (action.type) {
    case lookupDataActions.ActionTypes.LOAD_ALERT_CODES:
    case lookupDataActions.ActionTypes.LOAD_ATA_CODES:
    case lookupDataActions.ActionTypes.LOAD_CHECK_TYPES:
    case lookupDataActions.ActionTypes.LOAD_FLEET_CHECK_TYPES:
    case lookupDataActions.ActionTypes.LOAD_CORROSION_LEVELS:
    case lookupDataActions.ActionTypes.LOAD_CORROSION_TYPES:
    case lookupDataActions.ActionTypes.LOAD_DEPARTMENTS:
    case lookupDataActions.ActionTypes.LOAD_DETECTION_METHODS:
    case lookupDataActions.ActionTypes.LOAD_STATIONS:
    case lookupDataActions.ActionTypes.LOAD_DAMAGE_TYPES:
    case lookupDataActions.ActionTypes.LOAD_CAUSE_OF_DAMAGES:
    case lookupDataActions.ActionTypes.LOAD_FLOORBOARD_CONDITIONS:
    case lookupDataActions.ActionTypes.LOAD_REPAIR_DOCUMENTS:
    case lookupDataActions.ActionTypes.LOAD_REPAIR_DESCRIPTIONS:
    case lookupDataActions.ActionTypes.LOAD_REASONS_FOR_CHANGE:
      {
        return state.merge({ loading: true });
      }
    case lookupDataActions.ActionTypes.LOAD_ALERT_CODES_COMPLETE:
      {
        const act = action as lookupDataActions.LoadAlertCodesCompleteAction;
        return state.merge({ loading: false, alertCodes: List.of(...act.payload) });
      }
    case lookupDataActions.ActionTypes.LOAD_ATA_CODES_COMPLETE:
      {
        const act = action as lookupDataActions.LoadATACodesCompleteAction;
        return state.merge({ loading: false, ataCodes: List.of(...act.payload) });
      }
    case lookupDataActions.ActionTypes.LOAD_FLEET_CHECK_TYPES_COMPLETE:
      {
        const act = action as lookupDataActions.LoadFleetCheckTypesCompleteAction;
        return state.merge({ loading: false, fleetCheckTypes: List.of(...act.payload) });
      }
    case lookupDataActions.ActionTypes.LOAD_CHECK_TYPES_COMPLETE:
      {
        const act = action as lookupDataActions.LoadCheckTypesCompleteAction;
        return state.merge({ loading: false, checkTypes: List.of(...act.payload) });
      }
    case lookupDataActions.ActionTypes.LOAD_CORROSION_LEVELS_COMPLETE:
      {
        const act = action as lookupDataActions.LoadCorrosionLevelsCompleteAction;
        return state.merge({ loading: false, corrosionLevels: List.of(...act.payload) });
      }
    case lookupDataActions.ActionTypes.LOAD_CORROSION_TYPES_COMPLETE:
      {
        const act = action as lookupDataActions.LoadCorrosionTypesCompleteAction;
        return state.merge({ loading: false, corrosionTypes: List.of(...act.payload) });
      }
    case lookupDataActions.ActionTypes.LOAD_DEPARTMENTS_COMPLETE:
      {
        const act = action as lookupDataActions.LoadDepartmentsCompleteAction;
        return state.merge({ loading: false, departments: List.of(...act.payload) });
      }
    case lookupDataActions.ActionTypes.LOAD_DETECTION_METHODS_COMPLETE:
      {
        const act = action as lookupDataActions.LoadDetectionMethodsCompleteAction;
        return state.merge({ loading: false, detectionMethods: List.of(...act.payload) });
      }
    case lookupDataActions.ActionTypes.LOAD_STATIONS_COMPLETE:
      {
        const act = action as lookupDataActions.LoadStationsCompleteAction;
        return state.merge({ loading: false, stations: List.of(...act.payload) });
      }
    case lookupDataActions.ActionTypes.LOAD_DAMAGE_TYPES_COMPLETE:
      {
        const act = action as lookupDataActions.LoadDamageTypesCompleteAction;
        return state.merge({ loading: false, damageTypes: List.of(...act.payload) });
      }
    case lookupDataActions.ActionTypes.LOAD_CAUSE_OF_DAMAGES_COMPLETE:
      {
        const act = action as lookupDataActions.LoadCauseOfDamagesCompleteAction;
        return state.merge({ loading: false, causeOfDamages: List.of(...act.payload) });
      }
    case lookupDataActions.ActionTypes.LOAD_FLOORBOARD_CONDITIONS_COMPLETE:
      {
        const act = action as lookupDataActions.LoadFloorboardConditionsCompleteAction;
        return state.merge({ loading: false, floorboardConditions: List.of(...act.payload) });
      }
    case lookupDataActions.ActionTypes.LOAD_REPAIR_DOCUMENTS_COMPLETE:
      {
        const act = action as lookupDataActions.LoadRepairDocumentsCompleteAction;
        return state.merge({ loading: false, repairDocuments: List.of(...act.payload) });
      }
    case lookupDataActions.ActionTypes.LOAD_REPAIR_DESCRIPTIONS_COMPLETE:
      {
        const act = action as lookupDataActions.LoadRepairDescriptionsCompleteAction;
        return state.merge({ loading: false, repairDescriptions: List.of(...act.payload) });
      }
    case lookupDataActions.ActionTypes.LOAD_REASONS_FOR_CHANGE_COMPLETE:
      {
        const act = action as lookupDataActions.LoadReasonsForChangeCompleteAction;
        return state.merge({ loading: false, reasonsForChange: List.of(...act.payload) });
      }
    default: {
      return state;
    }
  }
};

// Selector Functions
export const getAlertCodes = (state: State) => state.alertCodes;
export const getLoading = (state: State) => state.loading;
export const getATACodes = (state: State) => state.ataCodes;
export const getCheckTypes = (state: State) => state.checkTypes;
export const getFleetCheckTypes = (state: State) => state.fleetCheckTypes;
export const getCorrosionLevels = (state: State) => state.corrosionLevels;
export const getCorrosionTypes = (state: State) => state.corrosionTypes;
export const getDepartments = (state: State) => state.departments;
export const getDetectionMethods = (state: State) => state.detectionMethods;
export const getStations = (state: State) => state.stations;
export const getDamageTypes = (state: State) => state.damageTypes;
export const getCauseOfDamages = (state: State) => state.causeOfDamages;
export const getFloorboardConditions = (state: State) => state.floorboardConditions;
export const getRepairDocuments = (state: State) => state.repairDocuments;
export const getRepairDescriptions = (state: State) => state.repairDescriptions;
export const getReasonsForChange = (state: State) => state.reasonsForChange;
