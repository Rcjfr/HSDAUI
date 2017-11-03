import { Action } from '@ngrx/store';
import * as models from '../models/index';
import * as loggedInUserActions from './logged-in-user';
import { MockStore } from '../store/mock-store';
describe('LoggedInUser Actions', () => {
  let action: loggedInUserActions.Actions;
  let mockStore: MockStore<any>;
  beforeEach(() => {
    mockStore = new MockStore({});

  });
  it('LoadUserAction should handle LOAD_USER action',
    () => {
      action = new loggedInUserActions.LoadUserAction();

      expect(action.type).toBe(loggedInUserActions.ActionTypes.LOAD_USER);
      expect(action.payload).toBeUndefined();
    });

  it('LoadUserCompleteAction should handle LOAD_USER_COMPLETE action',
    () => {
      const user: models.IUser = {
        sm_user: '00123456',
        sm_user_email: 'firstname.lastname@aa.com',
        sm_user_firstname: 'FirstName',
        sm_user_lastname: 'LastName',
        access_token: 'TOKEN', roles: ['QC_Inspector']
      };
      action = new loggedInUserActions.LoadUserCompleteAction(user);

      expect(action.type).toBe(loggedInUserActions.ActionTypes.LOAD_USER_COMPLETE);
      expect(action.payload.sm_user).toBe('00123456');
    });

  it('LoadUserAction should handle LOAD_USER action',
    () => {
      action = new loggedInUserActions.LoadUserFailAction('ERROR');

      expect(action.type).toBe(loggedInUserActions.ActionTypes.LOAD_USER_FAIL);
      expect(action.payload).toBe('ERROR');
    });

});
