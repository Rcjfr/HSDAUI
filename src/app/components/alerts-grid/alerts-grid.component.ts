import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { ISdaListView, ILazyLoadEvent } from '@app/common/models';
import { Subject } from 'rxjs/Rx';
import { AppStateService, SdaExportService } from '@app/common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { Subscription } from 'rxjs/Subscription';
import { ISdaListResultRecord, SdaListResultFactory } from '@app/common/reducers/models/sda-list-result';
import * as _ from 'lodash';
import { ScrollToService } from 'ng2-scroll-to-el';
import { DataGrid } from 'primeng/datagrid';



@Component({
  selector: 'aa-alerts-grid',
  templateUrl: './alerts-grid.component.html',
  styleUrls: ['./alerts-grid.component.less']
})
export class AlertsGridComponent implements OnInit, OnDestroy {
  @ViewChild('dataTable') dataTable: DataGrid;
  sdaListResult$: Observable<ISdaListResultRecord>;
  criteriaSubscription: Subscription;
  Math = Math;
  searchCriteria;
  sdaListResult = SdaListResultFactory({
    totalRecords: 0,
    records: []
  });
  skipNextLoad = false;

  //Default paging options
  defaultPageSize = 20;
  defaultSortColumn = 'createDate';
  defaultSortOrder = -1;


  constructor(private appStateService: AppStateService, private scrollToService: ScrollToService
    , private sdaExportService: SdaExportService) { }

  ngOnInit() {
    this.sdaListResult$ = this.appStateService.getSdaListResult()
      .do(d => {
        if (d && d.totalRecords) {
          this.scrollToService.scrollTo('#searchResults');
        }
      })
      .map(listResult => {
        if (listResult) {
          return listResult;
        } else {
          return SdaListResultFactory();
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

            this.dataTable.rows = this.defaultPageSize;
            this.appStateService.loadSdaList(this.getDefaultPageData());
          }
          //this.skipNextLoad = true;
        }
      });
  }

  ngOnDestroy() {
    this.criteriaSubscription.unsubscribe();
  }

  loadPageOfRecords(pageData: ILazyLoadEvent) {
    // PrimeNG will fire this event the first time the table loads. We don't want to fire off a second service call to get results since that was already triggered
    if (this.skipNextLoad) {
      this.skipNextLoad = false;
    } else {
    this.appStateService.loadSdaList(this.getPageData(pageData));
    }
  }

  getPageData(pageData: ILazyLoadEvent): ILazyLoadEvent {
    if (!pageData) {
      return this.getDefaultPageData();
    }

    return pageData;
  }

  getDefaultPageData(): ILazyLoadEvent {
    return {
      first: 0,
      rows: this.defaultPageSize,
      sortField: this.defaultSortColumn,
      sortOrder: this.defaultSortOrder
    }
  }

  exportPdf(sdaId: number): boolean {
    this.appStateService.exportPDF([sdaId]);

    return false;
  }
}
