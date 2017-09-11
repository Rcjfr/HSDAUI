import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
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
    this.loading$ = Observable.merge(this.appStateService.getLookupDataLoading(), this.appStateService.getUserLoading());
  }
}
