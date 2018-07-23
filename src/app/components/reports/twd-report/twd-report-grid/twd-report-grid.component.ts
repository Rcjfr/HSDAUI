import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
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
import * as moment from 'moment';

@Component({
  selector: 'aa-twd-report-grid',
  templateUrl: './twd-report-grid.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./twd-report-grid.component.less']
})
export class TwdReportGridComponent implements OnInit {
  @ViewChild('dataTable') dataTable: DataGrid;
  twdListResult$: Observable<ISdaListResultRecord>;
  criteriaSubscription: Subscription;
  Math = Math;
  searchCriteria;
  twdListResult = SdaListResultFactory({
    totalRecords: 0,
    records: []
  });
   defaultSortColumn = 'dueInDays';
   defaultSortOrder = 1;

  constructor(private appStateService: AppStateService, private scrollToService: ScrollToService
    , private sdaExportService: SdaExportService) { }

  ngOnInit() {
    this.twdListResult$ = this.appStateService.getTwdList()
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

   }



}
