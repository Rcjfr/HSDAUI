import { Component, OnInit, Input } from '@angular/core';
import { ISdaListView } from './../../common/models';
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
  public _sdaList: ISdaListView[];
  public _sdaListTotal: number;

  defaultPageSize = 4;
  defaultSortColumn = 'createDate';
  defaultSortOrder = -1;

  @Input()
  set sdaList(data: ISdaListView[]) {
    this._sdaList = data;
  }
  @Input()
  set sdaListTotal(data: number) {
    this._sdaListTotal = data;
  }

  constructor(private appStateService: AppStateService) { }

  get name(): ISdaListView[] {
    return this._sdaList;
  }

  loadTablePage(pageData: LazyLoadEvent) {
    if (!pageData) {
      pageData = {
        first: 0,
        rows: this.defaultPageSize,
        sortField: this.defaultSortColumn,
        sortOrder: this.defaultSortOrder
      }
    }
    console.log(pageData);
    //fire off an action
    this.appStateService.loadSdaList(pageData);

  }
}