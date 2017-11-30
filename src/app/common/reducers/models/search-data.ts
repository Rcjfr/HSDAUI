import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { ISearchData } from '@app/common/models/search-data.model';

export interface ISearchDataRecord extends TypedRecord<ISearchDataRecord>, ISearchData { }

export const SearchDataRecordFactory = makeTypedFactory<ISearchData, ISearchDataRecord>({
  loading: false,
  searches: [],
  currentSearchId: undefined
});
