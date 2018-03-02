import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ISearchCriteria} from '@app/common/models/search/search-criteria.model';
import { AppStateService } from '@app/common/services';

@Component({
  selector: 'aa-mrl-report-main',
  templateUrl: './mrl-report-main.component.html',
  styleUrls: ['./mrl-report-main.component.less']
})
export class MrlReportMainComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(private appStateService: AppStateService ) { }

  ngOnInit() {

  }


  loadMrlData(criteria: ISearchCriteria) {

     this.appStateService.loadMajorRepairList(criteria);
  }

  loadMrlExcelData(criteria: ISearchCriteria) {

    this.appStateService.exportMRLExcel(criteria);
 }

}
