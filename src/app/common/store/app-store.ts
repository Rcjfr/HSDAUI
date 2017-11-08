import * as fromSelectedAlert from '@app/common/reducers/selected-alert';
import * as fromLookupData from '@app/common/reducers/lookup-data';
import * as fromLoggedInUser from '@app/common/reducers/logged-in-user';
import * as fromSavedSearches from '@app/common/reducers/saved-searches';

// App-State
export interface AppStore {
    selectedAlert: fromSelectedAlert.State;
    lookupData: fromLookupData.State;
    user: fromLoggedInUser.State;
    savedSearches: fromSavedSearches.State;
}
