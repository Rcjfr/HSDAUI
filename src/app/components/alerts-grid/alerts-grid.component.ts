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
  sdaListResult: ISdaListResult = { totalRecords: 0, records: List<ISdaListResult>() };
  doShowTable = false;

  defaultPageSize = 20;
  defaultSortColumn = 'createDate';
  defaultSortOrder = -1;

  constructor(private appStateService: AppStateService) { }

  ngOnInit() {
    this.sdaListResult$ = this.appStateService.getSdaListResult();
    this.searchCriteria$ = this.appStateService.getSearchCriteria();

    this.sdaListResult$.skip(1)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(d => {
        this.sdaListResult = d;
      });

    this.searchCriteria$.skip(1)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(d => {
        this.searchCriteria = d;
        this.doShowTable = true;
      });
  }

  ngOnDestroy() {
    //from: https://stackoverflow.com/questions/38008334/angular-rxjs-when-should-i-unsubscribe-from-subscription
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  //this method will trigger when the table is initialized the first time (which happens once we have search criteria in the store)
  loadPageOfRecords(pageData: LazyLoadEvent) {
    if (!pageData) {
      pageData = {
        first: 0,
        rows: this.defaultPageSize,
        sortField: this.defaultSortColumn,
        sortOrder: this.defaultSortOrder
      }
    }

    const postData = this.searchCriteria.toJS();
    postData.PageData = pageData;
    this.appStateService.loadSdaList(postData);
  }
}