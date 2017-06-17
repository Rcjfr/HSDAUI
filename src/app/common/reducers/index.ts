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
export const getSelectedAlert = compose(fromSelectedAlert.getSelectedAlert, getSelectedAlertState);
export const getAircraftInfo = compose(fromSelectedAlert.getAircraftInfo, getSelectedAlertState);
export const getSelectedAlertLoading = compose(fromSelectedAlert.getLoading, getSelectedAlertState);
export const getNoseNumbers = compose(fromSelectedAlert.getNoseNumbers, getSelectedAlertState);

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







