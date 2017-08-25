import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ISdaListResult, ISdaListView } from './../../common/models';
import { SdaSearchCriteria } from './../../common/models';
import { Subject } from 'rxjs/Rx';
import { AppStateService } from '../../common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { Subscription } from 'rxjs/Subscription';

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
  sdaListResult$: Observable<ISdaListResult>;
  searchCriteria$: Observable<SdaSearchCriteria>;

  searchCriteria;
  sdaListResult: ISdaListResult = {
    totalRecords: 0,
    records: List<ISdaListResult>()
  };
  showTable = false;

  //Default paging options
  defaultPageSize = 20;
  defaultSortColumn = 'createDate';
  defaultSortOrder = -1;

  skipLoad = false;

  resultSubscription: Subscription;
  criteriaSubscription: Subscription;

  constructor(private appStateService: AppStateService) {}

  ngOnInit() {
    this.sdaListResult$ = this.appStateService.getSdaListResult();
    this.searchCriteria$ = this.appStateService.getSearchCriteria();

    // TODO - try to get this back to async, update to record
    this.resultSubscription = this.sdaListResult$
      .subscribe(results => {
        this.sdaListResult = results;
        this.showTable = true;
      });

    this.criteriaSubscription = this.searchCriteria$.skip(1)
      .subscribe(d => {
        this.skipLoad = true;
        this.appStateService.loadSdaList(this.getDefaultPageData());
      });
  }

  ngOnDestroy() {
    this.resultSubscription.unsubscribe();
    this.criteriaSubscription.unsubscribe();
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