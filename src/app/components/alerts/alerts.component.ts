import { SearchType } from '@app/common/models/enumerations';
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
  searchType: SearchType = SearchType.Regular;
  constructor(public appStateService: AppStateService) { }

  ngOnInit() {
    this.loading$ = Observable.combineLatest(
      this.appStateService.getLookupDataLoading(),
      this.appStateService.getUserLoading(),
      (a, b) => {
        return a || b;
      });
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
