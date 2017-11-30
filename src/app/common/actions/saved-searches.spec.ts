import { Action } from '@ngrx/store';
import * as models from '@app/common/models/index';
import * as savedSearchesActions from '@app/common/actions/saved-searches';
import { MockStore } from '@app/common/store/mock-store';
describe('Saved Searches Actions', () => {
  let mockStore: MockStore<any>;
  beforeEach(() => {
    mockStore = new MockStore({});

  });
  it('LoadSearchesAction should handle LOAD_SEARCHES action',
    () => {
      const action = new savedSearchesActions.LoadSearchesAction('123456');

      expect(action.type).toBe(savedSearchesActions.ActionTypes.LOAD_SEARCHES);
      expect(action.payload).toBe('123456');
    });

  it('LoadSearchesCompleteAction should handle LOAD_SEARCHES_COMPLETE action',
    () => {

      const action = new savedSearchesActions.LoadSearchesCompleteAction([{ badgeNumber: '00123456', criteria: '', isDefault: false, name: 'saved search', searchId: 1 }]);

      expect(action.type).toBe(savedSearchesActions.ActionTypes.LOAD_SEARCHES_COMPLETE);
      expect(action.payload[0].badgeNumber).toBe('00123456');
    });

  it('LoadSearchesFailAction should handle LOAD_SEARCHES_FAIL action',
    () => {
      const action = new savedSearchesActions.LoadSearchesFailAction('ERROR');

      expect(action.type).toBe(savedSearchesActions.ActionTypes.LOAD_SEARCHES_FAIL);
      expect(action.payload).toBe('ERROR');
    });

  it('SaveSearchAction should handle SAVE_SEARCH action',
    () => {
      const action = new savedSearchesActions.SaveSearchAction({ badgeNumber: '00123456', criteria: '', isDefault: false, name: 'saved search', searchId: 0 });

      expect(action.type).toBe(savedSearchesActions.ActionTypes.SAVE_SEARCH);
      expect(action.payload.badgeNumber).toBe('00123456');
    });

  it('SaveSearchCompleteAction should handle SAVE_SEARCH_COMPLETE action',
    () => {

      const action = new savedSearchesActions.SaveSearchCompleteAction({ badgeNumber: '00123456', criteria: '', isDefault: false, name: 'saved search', searchId: 1 });

      expect(action.type).toBe(savedSearchesActions.ActionTypes.SAVE_SEARCH_COMPLETE);
      expect(action.payload.badgeNumber).toBe('00123456');
    });

  it('SaveSearchFailAction should handle SAVE_SEARCH_FAIL action',
    () => {
      const action = new savedSearchesActions.SaveSearchFailAction('ERROR');

      expect(action.type).toBe(savedSearchesActions.ActionTypes.SAVE_SEARCH_FAIL);
      expect(action.payload).toBe('ERROR');
    });
  it('SetCurrentSearchId should handle SET_CURRENT_SEARCH_ID action',
    () => {
      const action = new savedSearchesActions.SetCurrentSearchId(1);

      expect(action.type).toBe(savedSearchesActions.ActionTypes.SET_CURRENT_SEARCH_ID);
      expect(action.payload).toBe(1);
    });
  it('DeleteSearchAction should handle DELETE_SEARCH action',
    () => {
      const action = new savedSearchesActions.DeleteSearchAction(1);

      expect(action.type).toBe(savedSearchesActions.ActionTypes.DELETE_SEARCH);
      expect(action.payload).toBe(1);
    });

  it('DeleteSearchCompleteAction should handle DELETE_SEARCH_COMPLETE action',
    () => {

      const action = new savedSearchesActions.DeleteSearchCompleteAction();

      expect(action.type).toBe(savedSearchesActions.ActionTypes.DELETE_SEARCH_COMPLETE);
      expect(action.payload).toBeUndefined();
    });

  it('DeleteSearchFailAction should handle DELETE_SEARCH_FAIL action',
    () => {
      const action = new savedSearchesActions.DeleteSearchFailAction('ERROR');

      expect(action.type).toBe(savedSearchesActions.ActionTypes.DELETE_SEARCH_FAIL);
      expect(action.payload).toBe('ERROR');
    });

});
