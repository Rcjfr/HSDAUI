import { AppStateService } from '../app-state.service';
import { Observable } from 'rxjs/Rx';
import { List } from 'immutable';
import { ISdaRecord, SdaFactory } from '@app/common/reducers/models/sda';
import { ISavedSearch } from '@app/common/models/saved-search.model';

export class MockSavedSearchStateService extends AppStateService {
  constructor() {
    super(null);
  }

  getSavedSearches() {
    return Observable.of(<List<ISavedSearch>>List.of());
  }

  getCurrentSearchId() {
    return 1;
  }
}
