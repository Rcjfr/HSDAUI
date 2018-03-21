import { ActionReducer, Action } from '@ngrx/store';
import { IUserRecord, UserRecordFactory } from '@app/common/reducers/models/user';
import * as userActions from '@app/common/actions/logged-in-user';
import { List, Record } from 'immutable';
import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';

export interface State {
  loading: boolean;
  user: IUserRecord
}
export interface StateRecord extends TypedRecord<StateRecord>, State { }

export const stateFactory = makeTypedFactory<State, StateRecord>({
  loading: false,
  user: null
});

function makeInitialState() {
  return stateFactory();
}
export const reducer: ActionReducer<StateRecord> = (state: StateRecord = makeInitialState(), action: userActions.Actions) => {
  switch (action.type) {
    case userActions.ActionTypes.LOAD_USER:
      {
        return state.merge({ loading: true });
      }
    case userActions.ActionTypes.LOAD_USER_COMPLETE:
      {
        const act = action as userActions.LoadUserCompleteAction;

        return state.merge({ loading: false, user: UserRecordFactory(act.payload) });
      }
    case userActions.ActionTypes.OPERATION_FAILED:
      {
        return state.merge({ loading: false });
      }
    default: {
      return state;
    }
  }
};

// Selector Functions
export const getLoading = (state: State) => state.loading;
export const getUser = (state: State) => state.user;

