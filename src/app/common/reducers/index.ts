import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { combineReducers, Action } from '@ngrx/store';
import * as fromSelectedAlert from './selected-alert';
import * as fromLookupData from './lookup-data';
import { AppStore } from '../store/app-store';

const reducers = {
  selectedAlert: fromSelectedAlert.reducer,
  lookupData: fromLookupData.reducer
};

const combinedReducers: ActionReducer<AppStore> = combineReducers(reducers);
// export const reducer: ActionReducer<AppStore> = function(state: AppStore, action: any) {
//     return combinedReducers(state, action);
// };
export function reducer(state: AppStore, action: Action): AppStore {
  return combinedReducers(state, action);
}

// Selector Functions
// Level 1
export const getSelectedAlertState = (state: AppStore) => state.selectedAlert;
export const getLookupDataState = (state: AppStore) => state.lookupData;

// Level 2
export const getSelectedSda = compose(fromSelectedAlert.getSelectedSda, getSelectedAlertState);
export const getSdaListResult = compose(fromSelectedAlert.getSdaListResult, getSelectedAlertState);
export const getSearchCriteria = compose(fromSelectedAlert.getSearchCriteria, getSelectedAlertState);
export const getAircraftInfo = compose(fromSelectedAlert.getAircraftInfo, getSelectedAlertState);
export const getSelectedAlertLoading = compose(fromSelectedAlert.getLoading, getSelectedAlertState);
export const getSelectedAlertSavedState = compose(fromSelectedAlert.getSavedState, getSelectedAlertState);
export const getLoadNewSdaState = compose(fromSelectedAlert.getLoadNewSdaState, getSelectedAlertState);
export const getNoseNumbers = compose(fromSelectedAlert.getNoseNumbers, getSelectedAlertState);
export const getCurrentSdaId = compose(fromSelectedAlert.getCurrentSdaId, getSelectedAlertState);

export const getLookupDataLoading = compose(fromLookupData.getLoading, getLookupDataState);
export const getAlertCodes = compose(fromLookupData.getAlertCodes, getLookupDataState);
export const getATACodes = compose(fromLookupData.getATACodes, getLookupDataState);
export const getCheckTypes = compose(fromLookupData.getCheckTypes, getLookupDataState);
export const getFleetCheckTypes = compose(fromLookupData.getFleetCheckTypes, getLookupDataState);
export const getCorrosionLevels = compose(fromLookupData.getCorrosionLevels, getLookupDataState);
export const getCorrosionTypes = compose(fromLookupData.getCorrosionTypes, getLookupDataState);
export const getDepartments = compose(fromLookupData.getDepartments, getLookupDataState);
export const getDetectionMethods = compose(fromLookupData.getDetectionMethods, getLookupDataState);
export const getStations = compose(fromLookupData.getStations, getLookupDataState);
export const getDamageTypes = compose(fromLookupData.getDamageTypes, getLookupDataState);
export const getCauseOfDamages = compose(fromLookupData.getCauseOfDamages, getLookupDataState);
export const getFloorboardConditions = compose(fromLookupData.getFloorboardConditions, getLookupDataState);
export const getRepairDescriptions = compose(fromLookupData.getRepairDescriptions, getLookupDataState);
export const getRepairDocuments = compose(fromLookupData.getRepairDocuments, getLookupDataState);
export const getReasonsForChange = compose(fromLookupData.getReasonsForChange, getLookupDataState);
export const getRepairInspectionStatus = compose(fromLookupData.getRepairInspectionStatus, getLookupDataState);
export const getDTEStatus = compose(fromLookupData.getDTEStatus, getLookupDataState);