import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ISdaListResult } from '../../common/models';
import { AppStateService } from '../../common/services';
import { List } from 'immutable';

@Component({
  selector: 'aa-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.less']
})
export class AlertsComponent implements OnInit, AfterViewInit {
  sdaListResult$: Observable<ISdaListResult>;
  searchCriteria$: Observable<ISdaListResult>;
  loading$: Observable<boolean>;

  constructor(public appStateService: AppStateService) { }

  ngOnInit() {
    this.loading$ = this.appStateService.getLookupDataLoading();

    this.appStateService.loadSdaList({PageData: undefined });

    //TODO - if this isn't called here we get the ExpressionChangedAfterItHasBeenCheckedError
    this.sdaListResult$ = this.appStateService.getSdaListResult();
    this.searchCriteria$ = this.appStateService.getSearchCriteria();
  }

  ngAfterViewInit() {
  }
}