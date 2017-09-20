import { ActionReducer, Action } from '@ngrx/store';
// import { IAlert, ISdaListView, Status } from '../models';
// import { SdaRecord, sdaFactory } from './models/sda';
// import { SdaListResult, SdaSearchCriteria } from '../models';
// import { AircraftInfoRecord, aircraftInfoFactory } from './models/aircraft-info';
// import { ATACodeRecord, ATACodeFactory } from './models/ata-code';
// import { SavedStateRecord, SavedStateFactory } from './models/saved-state';
import * as actions from '../actions/saved-searches';
import { SearchData } from 'app/common/models/search-data.model';
import { List } from 'immutable';
// import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';

export interface State {
  loading: boolean;
  searches: List<SearchData>;
}

export function reducer(state: SearchData = new SearchData(), action: actions.Actions) {
  switch (action.type) {
    // case actions.ActionTypes.LOAD_SEARCHES:
    //   {
    //     return state.merge({ loading: true });
    //   }
      case actions.ActionTypes.LOAD_SEARCHES_COMPLETE:
      {
        const act = action as actions.LoadSearchesCompleteAction;

        //loading: false
        return state.merge({ searches: List.of(...act.payload) });
      }
    default: {
      return state;
    }
  }
};

// Selector Functions
export const getSearches = (state: State) => state.searches;

