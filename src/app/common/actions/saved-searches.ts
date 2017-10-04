import { Action } from '@ngrx/store';
import { SearchData } from 'app/common/models';
import { ISavedSearch } from 'app/common/models/saved-search.model';

export const ActionTypes = {
  LOAD_SEARCHES: 'Load Saved Searches',
  LOAD_SEARCHES_COMPLETE: 'Load Saved Searches Complete',
  LOAD_SEARCHES_FAIL: 'Load Saved Searches Fail',
  SAVE_SEARCH: 'Save Saved Search',
  SAVE_SEARCH_COMPLETE: 'Save Saved Search Complete',
  SAVE_SEARCH_FAIL: 'Save Saved Search Fail',
  SET_CURRENT_SEARCH_ID: 'Set Current Saved Search ID',
  DELETE_SEARCH: 'Delete Saved Search',
  DELETE_SEARCH_COMPLETE: 'Delete Saved Search Complete',
  DELETE_SEARCH_FAIL: 'Delete Saved Search Fail'
};

export class LoadSearchesAction implements Action {
  public type = ActionTypes.LOAD_SEARCHES;
  constructor(public payload: string) { }
}

export class LoadSearchesCompleteAction implements Action {
  public type = ActionTypes.LOAD_SEARCHES_COMPLETE;
  constructor(public payload: any[]) { }
}

export class LoadSearchesFailAction implements Action {
  public type = ActionTypes.LOAD_SEARCHES_FAIL;
  constructor(public payload: any) { }
}

export class SaveSearchAction implements Action {
  public type = ActionTypes.SAVE_SEARCH;
  constructor(public payload: ISavedSearch) { }
}
export class SaveSearchCompleteAction implements Action {
  public type = ActionTypes.SAVE_SEARCH_COMPLETE;
  constructor(public payload: ISavedSearch) { }
}
export class SaveSearchFailAction implements Action {
  public type = ActionTypes.SAVE_SEARCH_FAIL;
  constructor(public payload: any) { }
}

export class SetCurrentSearchId implements Action {
  public type = ActionTypes.SET_CURRENT_SEARCH_ID;
  constructor(public payload: any) { }
}

export class DeleteSearchAction implements Action {
  public type = ActionTypes.DELETE_SEARCH;
  constructor(public payload: number) { }
}
export class DeleteSearchCompleteAction implements Action {
  public type = ActionTypes.DELETE_SEARCH_COMPLETE;
  constructor() {}
}
export class DeleteSearchFailAction implements Action {
  public type = ActionTypes.DELETE_SEARCH_FAIL;
  constructor(public payload: any) { }
}


export type Actions =
LoadSearchesAction |
LoadSearchesCompleteAction |
LoadSearchesFailAction |
SaveSearchAction |
SaveSearchCompleteAction |
SaveSearchFailAction |
SetCurrentSearchId;