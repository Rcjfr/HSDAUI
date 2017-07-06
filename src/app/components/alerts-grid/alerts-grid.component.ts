import { Component, OnInit, Input } from '@angular/core';

import {IAlert} from './../../common/models';
import { Subject } from 'rxjs/Rx';
@Component({
  selector: 'app-alerts-grid',
  templateUrl: './alerts-grid.component.html',
  styleUrls: ['./alerts-grid.component.less']
})
export class AlertsGridComponent implements OnInit {
  @Input() alerts: IAlert[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<number>=new Subject();

  
  constructor() { }

  ngOnInit():void {
this.dtOptions = {
        pagingType:"full_numbers",
        pageLength:5,
        searching:false,
        "paging":   true,
        "ordering": true,
        "columnDefs": [ {
          "targets": 7,
          "orderable": false
        } ]
    };
    this.dtTrigger.next(1); //TODO: this approach is not working 
  }
}
