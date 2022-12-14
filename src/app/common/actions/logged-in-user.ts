import { Action } from '@ngrx/store';
import * as models from '@app/common/models/index';

export const ActionTypes = {
  LOAD_USER: 'Load Logged In User Details',
  LOAD_USER_COMPLETE: 'Load Logged In User Details Complete',
  LOAD_USER_FAIL: 'Load Logged In User Details Fail',
  LOGOUT: 'Logout User',
  OPERATION_FAILED: 'General Operation Failed Message',

};


export class LoadUserAction implements Action {
  public type = ActionTypes.LOAD_USER;
  public payload: any
  constructor() { }
}
export class LoadUserCompleteAction implements Action {
  public type = ActionTypes.LOAD_USER_COMPLETE;
  constructor(public payload: models.IUser) { }
}
export class LoadUserFailAction implements Action {
  public type = ActionTypes.LOAD_USER_FAIL;
  constructor(public payload: any) { }
}

export class OperationFailedAction implements Action {
  public type = ActionTypes.OPERATION_FAILED;
  public payload: any
  constructor() { }
}

export class LogOutAction implements Action {
  public type = ActionTypes.LOGOUT;
  public payload: any
  constructor() { }
}



export type Actions =
  LoadUserAction |
  LoadUserCompleteAction |
  LoadUserFailAction |
  OperationFailedAction |
  LogOutAction;

