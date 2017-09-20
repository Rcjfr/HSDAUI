import { Action } from '@ngrx/store';
import { SearchData } from 'app/common/models';

export const ActionTypes = {
  LOAD_SEARCHES: 'Load Searches',
  LOAD_SEARCHES_COMPLETE: 'Load SDAs Complete',
  LOAD_SEARCHES_FAIL: 'Load SDAs Fail',
  SAVE_SEARCH: 'Set Search',
  SAVE_SEARCH_COMPLETE: 'Set Search Complete',
  SAVE_SEARCH_FAIL: 'Set Search Fail'
};

export class LoadSearchesAction implements Action {
  public type = ActionTypes.LOAD_SEARCHES;
  constructor() { }
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
  constructor(public payload: any) { }
}
export class SaveSearchCompleteAction implements Action {
  public type = ActionTypes.SAVE_SEARCH;
  constructor(public payload: any) { }
}
export class SaveSearchFailAction implements Action {
  public type = ActionTypes.SAVE_SEARCH;
  constructor(public payload: any) { }
}


export type Actions =
LoadSearchesAction |
LoadSearchesCompleteAction |
LoadSearchesFailAction |
SaveSearchAction |
SaveSearchCompleteAction |
SaveSearchFailAction;