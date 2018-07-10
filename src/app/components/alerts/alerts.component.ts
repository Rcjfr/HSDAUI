import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AppStateService } from '@app/common/services';
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
    this.loading$ = Observable.combineLatest(
      this.appStateService.getLookupDataLoading(),
      this.appStateService.getUserLoading(),
      this.appStateService.getSdaLoading(), (a, b, c) => {
        return a || b || c;
      });
  }
}
