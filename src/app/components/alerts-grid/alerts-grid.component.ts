import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ISdaListResult } from './../../common/models';
import { Subject } from 'rxjs/Rx';
import { AppStateService } from '../../common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';

export interface LazyLoadEvent {
  first?: number;
  rows?: number;
  sortField?: string;
  sortOrder?: number;
}

@Component({
  selector: 'aa-alerts-grid',
  templateUrl: './alerts-grid.component.html',
  styleUrls: ['./alerts-grid.component.less']
})
export class AlertsGridComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  sdaListResult$: Observable<ISdaListResult>;
  searchCriteria$: Observable<ISdaListResult>;

  searchCriteria;
  sdaListResult: ISdaListResult = {
    totalRecords: 0,
    records: List<ISdaListResult>()
  };
  showTable = false;

  //Default paging options
  defaultPageSize = 4;
  defaultSortColumn = 'createDate';
  defaultSortOrder = -1;

  skipLoad = false;

  constructor(private appStateService: AppStateService) {}

  ngOnInit() {
    this.sdaListResult$ = this.appStateService.getSdaListResult();
    this.searchCriteria$ = this.appStateService.getSearchCriteria();

    this.sdaListResult$.skip(1)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(results => {
        this.sdaListResult = results;
        this.showTable = true;
      });

    this.searchCriteria$.skip(1)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(d => {
        this.skipLoad = true;
        this.appStateService.loadSdaList(this.getDefaultPageData());
      });
  }

  ngOnDestroy() {
    //from: https://stackoverflow.com/questions/38008334/angular-rxjs-when-should-i-unsubscribe-from-subscription
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadPageOfRecords(pageData: LazyLoadEvent) {
    // PrimeNG will fire this event the first time the table loads. We don't want to fire off a second service call to get results since that was already triggered
    if (this.skipLoad) {
      this.skipLoad = false;
    } else {
      this.appStateService.loadSdaList(this.getPageData(pageData));
    }
  }

  getPageData(pageData) {
    if (!pageData) {
      return this.getDefaultPageData();
    }

    return pageData;
  }

  getDefaultPageData() {
    return {
      first: 0,
      rows: this.defaultPageSize,
      sortField: this.defaultSortColumn,
      sortOrder: this.defaultSortOrder
    }
  }
}