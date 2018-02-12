import * as search from '.';

export interface ISearchCriteria {
  pageData: any;
  searchByAircraft: search.ISearchByAircraft;
  searchByCorrectiveAction: search.ISearchByCorrectiveAction;
  searchByCorrosion: search.ISearchByCorrosion;
  searchByCpcpDisposition: search.ISearchByCpcpDisposition;
  searchByDateRange: search.ISearchByDateRange;
  searchByDefect: search.ISearchByDefect;
  searchByDTE: search.ISearchByDTE;
  searchByMaintenance: search.ISearchByMaintenance;
  searchByOptions: search.ISearchByOptions;
  searchByPart: search.ISearchByPart;
  reportColumns: search.IReportColumn[];
  searchBySda: search.ISearchBySda;
  searchByStatus: search.ISearchByStatus;
}
