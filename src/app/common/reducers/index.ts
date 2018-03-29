import { ActionReducer, createSelector } from '@ngrx/store';
import { combineReducers, Action, ActionReducerMap } from '@ngrx/store';
import * as fromSelectedAlert from './selected-alert';
import * as fromLookupData from './lookup-data';
import * as fromLoggedInUser from './logged-in-user';
import * as fromSavedSearches from './saved-searches';
import { AppStore } from '../store/app-store';

//const reducers = {
//  selectedAlert: fromSelectedAlert.reducer,
//  lookupData: fromLookupData.reducer,
//  user: fromLoggedInUser.reducer,
//  savedSearches: fromSavedSearches.reducer
//};

//const combinedReducers: ActionReducer<AppStore> = combineReducers(reducers);
//// export const reducer: ActionReducer<AppStore> = function(state: AppStore, action: any) {
////     return combinedReducers(state, action);
//// };
//export function reducer(state: AppStore, action: Action): AppStore {
//  return combinedReducers(state, action);
//}

export const reducer: ActionReducerMap<AppStore> = {
  selectedAlert: fromSelectedAlert.reducer,
  lookupData: fromLookupData.reducer,
  user: fromLoggedInUser.reducer,
  savedSearches: fromSavedSearches.reducer
};


// Selector Functions
// Level 1
export const getSelectedAlertState = (state: AppStore) => state.selectedAlert;
export const getLookupDataState = (state: AppStore) => state.lookupData;
export const getUserDataState = (state: AppStore) => state.user;
export const getSavedSearchState = (state: AppStore) => state.savedSearches;

// Level 2
export const getSelectedSda = createSelector(getSelectedAlertState, fromSelectedAlert.getSelectedSda);
export const getSdaListResult = createSelector(getSelectedAlertState, fromSelectedAlert.getSdaListResult);
export const getSearchCriteria = createSelector(getSelectedAlertState, fromSelectedAlert.getSearchCriteria);
export const getAircraftInfo = createSelector(getSelectedAlertState, fromSelectedAlert.getAircraftInfo);
export const getSelectedAlertLoading = createSelector(getSelectedAlertState, fromSelectedAlert.getLoading);
export const getNoseNumbersLoading = createSelector(getSelectedAlertState, fromSelectedAlert.getNoseNumbersLoading);

export const getSelectedAlertSavedState = createSelector(getSelectedAlertState, fromSelectedAlert.getSavedState);
export const getLoadNewSdaState = createSelector(getSelectedAlertState, fromSelectedAlert.getLoadNewSdaState);
export const getNoseNumbers = createSelector(getSelectedAlertState, fromSelectedAlert.getNoseNumbers);
export const getChangeLog = createSelector(getSelectedAlertState, fromSelectedAlert.getChangeLog);
export const getCurrentSdaId = createSelector(getSelectedAlertState, fromSelectedAlert.getCurrentSdaId);
export const getNewSdaStatus = createSelector(getSelectedAlertState, fromSelectedAlert.getNewSdaStatus);
export const getLoadingText = createSelector(getSelectedAlertState, fromSelectedAlert.getLoadingText);

export const getLookupDataLoading = createSelector(getLookupDataState, fromLookupData.getLoading);
export const getAlertCodes = createSelector(getLookupDataState, fromLookupData.getAlertCodes);
export const getATACodes = createSelector(getLookupDataState, fromLookupData.getATACodes);
export const getCheckTypes = createSelector(getLookupDataState, fromLookupData.getCheckTypes);
export const getFleetCheckTypes = createSelector(getLookupDataState, fromLookupData.getFleetCheckTypes);
export const getCorrosionLevels = createSelector(getLookupDataState, fromLookupData.getCorrosionLevels);
export const getCorrosionTypes = createSelector(getLookupDataState, fromLookupData.getCorrosionTypes);
export const getDepartments = createSelector(getLookupDataState, fromLookupData.getDepartments);
export const getDetectionMethods = createSelector(getLookupDataState, fromLookupData.getDetectionMethods);
export const getStations = createSelector(getLookupDataState, fromLookupData.getStations);
export const getDamageTypes = createSelector(getLookupDataState, fromLookupData.getDamageTypes);
export const getCauseOfDamages = createSelector(getLookupDataState, fromLookupData.getCauseOfDamages);
export const getFloorboardConditions = createSelector(getLookupDataState, fromLookupData.getFloorboardConditions);
export const getRepairDescriptions = createSelector(getLookupDataState, fromLookupData.getRepairDescriptions);
export const getRepairDocuments = createSelector(getLookupDataState, fromLookupData.getRepairDocuments);
export const getReasonsForChange = createSelector(getLookupDataState, fromLookupData.getReasonsForChange);
export const getRepairInspectionStatus = createSelector(getLookupDataState, fromLookupData.getRepairInspectionStatus);
export const getDTEStatus = createSelector(getLookupDataState, fromLookupData.getDTEStatus);
export const getSdaStatus = createSelector(getLookupDataState, fromLookupData.getSdaStatus);


export const getUser = createSelector(getUserDataState, fromLoggedInUser.getUser);
export const getUserLoading = createSelector(getUserDataState, fromLoggedInUser.getLoading);

export const getSavedSearches = createSelector(getSavedSearchState, fromSavedSearches.getSearches);
export const getCurrentSearchId = createSelector(getSavedSearchState, fromSavedSearches.getCurrentSearchId);
