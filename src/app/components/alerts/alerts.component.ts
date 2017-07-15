import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ISdaListView } from '../../common/models';
import { AppStateService } from "../../common/services";
import { List } from "immutable";

@Component({
  selector: 'aa-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.less']
})
export class AlertsComponent implements OnInit {
  sdaList$: Observable<List<ISdaListView>>;
  constructor(public appStateService: AppStateService) { }

  ngOnInit() {
    this.sdaList$ = this.appStateService.getSDAList(); 
    this.appStateService.loadSDAList();
  }

}
