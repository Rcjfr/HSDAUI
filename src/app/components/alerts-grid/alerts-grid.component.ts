import { Component, OnInit, Input } from '@angular/core';

import {IAlert} from './../../common/models';
import { State } from '@progress/kendo-data-query';

import {
  GridDataResult,
  DataStateChangeEvent
} from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-alerts-grid',
  templateUrl: './alerts-grid.component.html',
  styleUrls: ['./alerts-grid.component.less']
})
export class AlertsGridComponent implements OnInit {
  @Input() alerts: IAlert[];
  public state: State = {
    skip: 0,
    take: 5
  };
  constructor() { }

  ngOnInit() {
  }
  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    console.log(this.state);
  }
}
