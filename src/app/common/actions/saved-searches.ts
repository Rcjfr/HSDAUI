import { Action } from '@ngrx/store';
import { SearchData } from 'app/common/models';
import { ISavedSearch } from 'app/common/models/saved-search.model';

export const ActionTypes = {
  LOAD_SEARCHES: 'Load Search Filters',
  LOAD_SEARCHES_COMPLETE: 'Load Search Filters Complete',
  LOAD_SEARCHES_FAIL: 'Load Search Filters Fail',
  SAVE_SEARCH: 'Save Search Filters',
  SAVE_SEARCH_COMPLETE: 'Save Search Filters Complete',
  SAVE_SEARCH_FAIL: 'Save Search Filters Fail',
  SET_CURRENT_SEARCH_ID: 'Set Current Search ID',
  DELETE_SEARCH: 'Delete Search Filters',
  DELETE_SEARCH_COMPLETE: 'Delete Search Filters Complete',
  DELETE_SEARCH_FAIL: 'Delete Search Filters Fail'
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