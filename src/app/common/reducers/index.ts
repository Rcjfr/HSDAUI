import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import * as fromSelectedAlert from './selected-alert';
import {AppStore} from '../store/app-store';

const reducers = {
    selectedAlert: fromSelectedAlert.reducer
};

const combinedReducers: ActionReducer<AppStore> = combineReducers(reducers);

export const reducer: ActionReducer<AppStore> = (state: any, action: any) => {
    return combinedReducers(state, action);
};

// Selector Functions
// Level 1
export const getSelectedAlertState = (state: AppStore) => state.selectedAlert;

// Level 2
export const getSelectedAlert = compose(fromSelectedAlert.getSelectedAlert, getSelectedAlertState);
export const getSelectedAlertAircraftInfo = compose(fromSelectedAlert.getSelectedAlertAircraftInfo, getSelectedAlertState);
export const getSelectedAlertLoading = compose(fromSelectedAlert.getSelectedAlertLoading, getSelectedAlertState);
export const getSelectedAlertNoseNumbers = compose(fromSelectedAlert.getSelectedAlertNoseNumbers, getSelectedAlertState);
export const getSelectedAlertATACodes = compose(fromSelectedAlert.getSelectedAlertATACodes, getSelectedAlertState);
export const getSelectedAlertStations = compose(fromSelectedAlert.getSelectedAlertStations, getSelectedAlertState);







