import { ActionReducer, Action } from '@ngrx/store';
import * as actions from '@app/common/actions/saved-searches';
import { SearchData } from '@app/common/models/search-data.model';
import { List } from 'immutable';
import { ISavedSearch } from '@app/common/models/saved-search.model';

export interface State {
  loading: boolean;
  searches: List<ISavedSearch>;
  currentSearchId: number;  //Current saved search (what's currently in the form - not neccesarily searched on yet so not always the criteria currently loaded in the results)
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
          searches: [...state.searches, act.payload],
          currentSearchId: act.payload.searchId
        });
      }
    case actions.ActionTypes.SET_CURRENT_SEARCH_ID:
      {
        const act = action as actions.SetCurrentSearchId;

        return state.merge({ currentSearchId: act.payload });
      }
    default: {
      return state;
    }
  }
};

// Selector Functions
export const getSearches = (state: State) => state.searches;
export const getCurrentSearchId = (state: State) => state.currentSearchId;
