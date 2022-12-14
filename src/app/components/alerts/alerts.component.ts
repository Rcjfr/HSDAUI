import { SearchType } from '@app/common/models/enumerations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AppStateService } from '@app/common/services';
import { List } from 'immutable';
import { delay } from 'rxjs/operators';
@Component({
  selector: 'aa-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.less']
})
export class AlertsComponent implements OnInit {
  loading$: Observable<boolean>;
  searchType: SearchType = SearchType.Regular;
  constructor(public appStateService: AppStateService) { }

  ngOnInit() {
    this.loading$ = Observable.combineLatest(
      this.appStateService.getLookupDataLoading(),
      this.appStateService.getUserLoading(),
      this.appStateService.getSelectedAlertLoading(),
      (a, b, c) => {
        return a || b || c || false;
      }).pipe(delay(0)); //https://blog.angular-university.io/angular-debugging/
    this.appStateService.getSearchType().subscribe( (result) => {
        switch (result) {
          case SearchType.MRR:
          this.searchType = SearchType.MRR;
          break;
          default:
          this.searchType = SearchType.Regular;
        }

      })
  }

}
