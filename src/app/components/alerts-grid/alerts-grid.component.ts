import { Component, OnInit, Input } from '@angular/core';
import { ISdaListView } from './../../common/models';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'aa-alerts-grid',
  templateUrl: './alerts-grid.component.html',
  styleUrls: ['./alerts-grid.component.less']
})
export class AlertsGridComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject();
  public _sdaList: ISdaListView[];

  //@Input() sdaList: ISdaListView[];
  @Input()
  set sdaList(data: ISdaListView[]) {
    this._sdaList = data;
    this.dtTrigger.next();
  }

  get name(): ISdaListView[] { return this._sdaList; }


  dtOptions: DataTables.Settings = {};


  constructor() { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      searching: false,
      'paging': true,
      'ordering': true,
      'columnDefs': [{
        'targets': 7,
        'orderable': false
      }]
    };
  }
}
