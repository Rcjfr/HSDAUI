import { ActionReducer, Action } from '@ngrx/store';
import * as actions from '../actions/saved-searches';
import { SearchData } from 'app/common/models/search-data.model';
import { List } from 'immutable';

export interface State {
  loading: boolean;
  searches: List<SearchData>;
}

export function reducer(state: SearchData = new SearchData(), action: actions.Actions) {
  switch (action.type) {
    case actions.ActionTypes.LOAD_SEARCHES:
      {
        return state.merge({ loading: true });
      }
    case actions.ActionTypes.LOAD_SEARCHES_COMPLETE:
      {
        const act = action as actions.LoadSearchesCompleteAction;

        //loading: false
        return state.merge({ loading: false, searches: List.of(...act.payload) });
      }
    case actions.ActionTypes.SAVE_SEARCH:
      {
        return state.merge({ loading: true });
      }
    case actions.ActionTypes.SAVE_SEARCH_FAIL:
      {
        return state.merge({ loading: false });
      }
    case actions.ActionTypes.SAVE_SEARCH_COMPLETE:
      {
        const act = action as actions.SaveSearchCompleteAction;

        return state.merge({
          loading: false,
          searches: [...state.searches, act.payload]
        });
      }
    default: {
      return state;
    }
  }
};

// Selector Functions
export const getSearches = (state: State) => state.searches;