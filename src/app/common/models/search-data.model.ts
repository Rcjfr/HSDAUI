import { Record } from 'immutable';
import { ISavedSearch } from '@app/common/models/saved-search.model';
export interface ISearchData {
  loading: boolean;
  searches: ISavedSearch[];
  currentSearchId: number;
}
