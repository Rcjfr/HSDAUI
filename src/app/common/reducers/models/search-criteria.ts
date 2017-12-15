import { TypedRecord, makeTypedFactory } from 'typed-immutable-record';
import { ISearchCriteria } from '@app/common/models/search/search-criteria.model';

export interface ISearchCriteriaRecord extends TypedRecord<ISearchCriteriaRecord>, ISearchCriteria { }

export const SearchCriteriaRecordFactory = makeTypedFactory<ISearchCriteria, ISearchCriteriaRecord>({
  pageData: undefined,
  searchByAircraft: undefined,
  searchByCorrectiveAction: undefined,
  searchByCorrosion: undefined,
  searchByCpcpDisposition: undefined,
  searchByDateRange: undefined,
  searchByDefect: undefined,
  searchByDTE: undefined,
  searchByMaintenance: undefined,
  searchByOptions: undefined,
  searchByPart: undefined,
  reportColumns: undefined,
  searchBySda: undefined,
  searchByStatus: undefined
});
