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
  @Input() searchCriteria: any;

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
    //const searchCriteria2 = this.appStateService.getSearchCriteria();
    //console.log(this.searchCriteria.toJS());
    //this.appStateService.loadSdaList({ PageData: pageData });

    const postData = this.searchCriteria.toJS();
    postData.PageData = pageData;
    this.appStateService.loadSdaList(postData);
  }
}