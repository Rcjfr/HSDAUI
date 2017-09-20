import * as fromSelectedAlert from '../reducers/selected-alert';
import * as fromLookupData from '../reducers/lookup-data';
import * as fromLoggedInUser from '../reducers/logged-in-user';
import * as fromSavedSearches from '../reducers/saved-searches';

// App-State
export interface AppStore {
    selectedAlert: fromSelectedAlert.State;
    lookupData: fromLookupData.State;
    user: fromLoggedInUser.State;
    savedSearches: fromSavedSearches.State;
}