import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IDTEMonitorItem } from '../../../../common/models';

@Component({
  selector: 'aa-dte-monitor-item',
  templateUrl: './dte-monitor-item.component.html',
  styleUrls: ['./dte-monitor-item.component.less']
})
export class DteMonitorItemComponent implements OnInit {
  @Input() editable = false;


  @Input() public index: number;

  @Input() public message: string;

  @Input() public item = new FormGroup({});

  @Output() public removed = new EventEmitter<number>();

  static initMonitorItem(val: IDTEMonitorItem): FormGroup {
    return new FormGroup({
      monitorItemDescription: new FormControl(val.monitorItemDescription, [Validators.maxLength(25)])
    });
  }

  constructor() { }

  ngOnInit() { }

  remove() {
    this.removed.emit(this.index);

    return false;
  }
}
