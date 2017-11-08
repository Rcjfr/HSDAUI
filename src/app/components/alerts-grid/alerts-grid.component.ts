import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ISdaListView } from '@app/common/models';
import { SdaSearchCriteria } from '@app/common/models';
import { Subject } from 'rxjs/Rx';
import { AppStateService } from '@app/common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { Subscription } from 'rxjs/Subscription';
import { SdaListResult } from '@app/common/models/sda-list-result.model';
import * as _ from 'lodash';
import { ScrollToService } from 'ng2-scroll-to-el';

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
  sdaListResult$: Observable<SdaListResult>;
  criteriaSubscription: Subscription;

  searchCriteria;
  sdaListResult = new SdaListResult({
    totalRecords: 0,
    records: []
  });
  skipNextLoad = false;

  //Default paging options
  defaultPageSize = 20;
  defaultSortColumn = 'createDate';
  defaultSortOrder = -1;


  constructor(private appStateService: AppStateService, private scrollToService: ScrollToService) { }

  ngOnInit() {
    this.sdaListResult$ = this.appStateService.getSdaListResult()
      .do(d => {
        if (d && d.toJS().totalRecords) {
          this.scrollToService.scrollTo('#searchResults');
        }
      })
      .map(listResult => {
        if (listResult) {
          return listResult.toJS();
        } else {
          return new SdaListResult();
        }
      });

      this.criteriaSubscription = this.appStateService.getSearchCriteria()
      .subscribe(criteria => {
        if (criteria) {
          let hasCriteria = false;
          const definedSections = _.pickBy(criteria.toJS(), _.identity);  //Get all defined properties (searchByDateRange, etc)
          _.forIn(definedSections, (value, key) => {
            if (!_.isEmpty(_.pickBy(value, _.identity))) {  //Get all defined sub-properties of that section (dateFrom, dateThrough, etc)
              hasCriteria = true;
            }
          });

          if (hasCriteria) {
            this.appStateService.loadSdaList(this.getDefaultPageData());
          }
          this.skipNextLoad = true;
        }
      });
  }

  ngOnDestroy() {
    this.criteriaSubscription.unsubscribe();
  }

  loadPageOfRecords(pageData: LazyLoadEvent) {
    // PrimeNG will fire this event the first time the table loads. We don't want to fire off a second service call to get results since that was already triggered
    if (this.skipNextLoad) {
      this.skipNextLoad = false;
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
