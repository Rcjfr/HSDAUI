import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ISearchCriteria} from '@app/common/models/search/search-criteria.model';
import { AppStateService } from '@app/common/services';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Component({
  selector: 'aa-twd-report-main',
  templateUrl: './twd-report-main.component.html',
  styleUrls: ['./twd-report-main.component.less']
})
export class TwdReportMainComponent implements OnInit {
  loading$ = new BehaviorSubject(true);
  constructor(private appStateService: AppStateService ) { }

  ngOnInit() {
    this.appStateService.getSdaLoading().subscribe(d => setTimeout(() => this.loading$.next(d), 0));
  }


  loadTwd(criteria: ISearchCriteria) {
    this.appStateService.loadTwdList(criteria);
  }

  loadTwdPdf(criteria: ISearchCriteria) {

     this.appStateService.exportTwdPdf(criteria);
  }

  loadTwdExcel(criteria: ISearchCriteria) {

    this.appStateService.exportTwdExcel(criteria);
 }

}
