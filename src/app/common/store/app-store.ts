import * as fromSelectedAlert from '../reducers/selected-alert';
import * as fromLookupData from '../reducers/lookup-data';
// App-State
export interface AppStore {
    selectedAlert: fromSelectedAlert.State;
    lookupData: fromLookupData.State;
}
