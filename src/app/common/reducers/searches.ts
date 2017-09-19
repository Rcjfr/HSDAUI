import { ActionReducer, Action } from '@ngrx/store';
// import { IAlert, ISdaListView, Status } from '../models';
// import { SdaRecord, sdaFactory } from './models/sda';
// import { SdaListResult, SdaSearchCriteria } from '../models';
// import { AircraftInfoRecord, aircraftInfoFactory } from './models/aircraft-info';
// import { ATACodeRecord, ATACodeFactory } from './models/ata-code';
// import { SavedStateRecord, SavedStateFactory } from './models/saved-state';
import * as selectedAlertActions from '../actions/selected-alert';
import { SearchData } from 'app/common/models/search-data.model';
// import { List, Record } from 'immutable';
// import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';

export interface State {
  // loading: boolean;
  searches: SearchData[];
}

export function reducer(state: SearchData = new SearchData(), action: selectedAlertActions.Actions) {
  // switch (action.type) {
  //   case selectedAlertActions.ActionTypes.LOAD_AIRCRAFT_INFO:
  //   case selectedAlertActions.ActionTypes.SAVE_SDA:
  //   case selectedAlertActions.ActionTypes.LOAD_SDA:
  //     {
  //       return state.merge({ loading: true });
  //     }
  //   default: {
  //     return state;
  //   }
  // }
};

// Selector Functions
export const getSearches = (state: State) => state.searches;

