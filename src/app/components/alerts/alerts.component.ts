﻿import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ISdaListView } from '../../common/models';
import { AppStateService } from '../../common/services';
import { List } from 'immutable';

@Component({
  selector: 'aa-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.less']
})
export class AlertsComponent implements OnInit {
  sdaList$: Observable<ISdaListView[]>;
  sdaListTotal$: Observable<number>;
  loading$: Observable<boolean>;
  constructor(public appStateService: AppStateService) { }

  ngOnInit() {
    this.sdaList$ = this.appStateService.getSdaList().map(d => d && d.toJS());
    this.sdaListTotal$ = this.appStateService.getSdaListTotal();
    this.loading$ = Observable.merge(this.appStateService.getSelectedAlertLoading(), this.appStateService.getLookupDataLoading());
    this.appStateService.loadSdaList(null);
  }

}
