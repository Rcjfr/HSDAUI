import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ISdaListResult } from '../../common/models';
import { AppStateService } from '../../common/services';
import { List } from 'immutable';

@Component({
  selector: 'aa-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.less']
})
export class AlertsComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(public appStateService: AppStateService) { }

  ngOnInit() {
    this.loading$ = this.appStateService.getLookupDataLoading();
  }
}