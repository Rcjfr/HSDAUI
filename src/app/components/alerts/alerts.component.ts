import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { IAlertResult } from "app/common/models";

@Component({
  selector: 'aa-alerts',
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
        station: 'PHX',
        nonRoutineNo: '12',
        routineNo: '233',
        statusText: 'Open'
      },
      {
        sdaId: '123458',
        createDate: new Date(),
        aircraftNo: 'A380',
        station: 'DFW',
        nonRoutineNo: '1',
        routineNo: '23',
        statusText: 'Completed'
      },
      {
        sdaId: '123459',
        createDate: new Date(),
        aircraftNo: 'A380',
        station: 'PHX',
        nonRoutineNo: '1',
        routineNo: '23',
        statusText: 'Audited'
      },
      {
        sdaId: '123456',
        createDate: new Date(),
        aircraftNo: 'A380',
        station: 'DFW',
        nonRoutineNo: '15',
        routineNo: '123',
        statusText: 'Open'
      },
      {
        sdaId: '123460',
        createDate: new Date(),
        aircraftNo: 'A380',
        station: 'PHX',
        nonRoutineNo: '221',
        routineNo: '2223',
        statusText: 'Open'
      },
      {
        sdaId: '123472',
        createDate: new Date(),
        aircraftNo: 'A380',
        station: 'DFW',
        nonRoutineNo: '17',
        routineNo: '2133',
        statusText: 'Open'
      },
      {
        sdaId: '123492',
        createDate: new Date(),
        aircraftNo: 'A380',
        station: 'PHX',
        nonRoutineNo: '17',
        routineNo: '235',
        statusText: 'Open'
      }
    ]);
  }

}
