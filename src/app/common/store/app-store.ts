import * as fromSelectedAlert from '../reducers/selected-alert';
import * as fromLookupData from '../reducers/lookup-data';
import * as fromLoggedInUser from '../reducers/logged-in-user';
// App-State
export interface AppStore {
    selectedAlert: fromSelectedAlert.State;
    lookupData: fromLookupData.State;
    user: fromLoggedInUser.State;
}
