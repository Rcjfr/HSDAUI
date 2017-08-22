import { Component, OnInit, Input } from '@angular/core';
import { ISdaListResult } from './../../common/models';
import { Subject } from 'rxjs/Rx';
import { AppStateService } from '../../common/services';

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
export class AlertsGridComponent {
  @Input() sdaListResult: ISdaListResult;

  defaultPageSize = 4;
  defaultSortColumn = 'createDate';
  defaultSortOrder = -1;

  constructor(private appStateService: AppStateService) { }

  loadTablePage(pageData: LazyLoadEvent) {
    if (!pageData) {
      pageData = {
        first: 0,
        rows: this.defaultPageSize,
        sortField: this.defaultSortColumn,
        sortOrder: this.defaultSortOrder
      }
    }

    //TODO - this is getting fired the first time the table loads
    this.appStateService.loadSdaList(pageData);
  }
}