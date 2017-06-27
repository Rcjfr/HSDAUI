import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { IAlertResult } from "app/common/models";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.less']
})
export class AlertsComponent implements OnInit {
  alerts$: Observable<IAlertResult[]>;
  constructor() { }

  ngOnInit() {
    this.alerts$ = Observable.of([
      {
        sdaId: '123456',
        createDate: new Date(),
        aircraftNo: 'A380',
        station: 'DFW',
        nonRoutineNo: '1',
        routineNo: '23',
        statusText: 'Open'
      },
      {
        sdaId: '123457',
        createDate: new Date(),
        aircraftNo: 'A380',
        station: 'DFW',
        nonRoutineNo: '1',
        routineNo: '23',
        statusText: 'Open'
      },
      {
        sdaId: '123458',
        createDate: new Date(),
        aircraftNo: 'A380',
        station: 'DFW',
        nonRoutineNo: '1',
        routineNo: '23',
        statusText: 'Open'
      },
      {
        sdaId: '123459',
        createDate: new Date(),
        aircraftNo: 'A380',
        station: 'PHX',
        nonRoutineNo: '1',
        routineNo: '23',
        statusText: 'Open'
      },
      {
        sdaId: '123456',
        createDate: new Date(),
        aircraftNo: 'A380',
        station: 'DFW',
        nonRoutineNo: '1',
        routineNo: '23',
        statusText: 'Open'
      },
      {
        sdaId: '123460',
        createDate: new Date(),
        aircraftNo: 'A380',
        station: 'PHX',
        nonRoutineNo: '1',
        routineNo: '23',
        statusText: 'Open'
      },
      {
        sdaId: '123472',
        createDate: new Date(),
        aircraftNo: 'A380',
        station: 'DFW',
        nonRoutineNo: '1',
        routineNo: '23',
        statusText: 'Open'
      },
      {
        sdaId: '123492',
        createDate: new Date(),
        aircraftNo: 'A380',
        station: 'PHX',
        nonRoutineNo: '1',
        routineNo: '23',
        statusText: 'Open'
      }
    ]);
  }

}
