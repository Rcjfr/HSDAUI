import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IDTEThresholdItem } from '../../../../common/models';
@Component({
  selector: 'aa-dte-threshold-item',
  templateUrl: './dte-threshold-item.component.html',
  styleUrls: ['./dte-threshold-item.component.less']
})
export class DteThresholdItemComponent implements OnInit {
  @Input() editable = false;

  @Input() public index: number;

  @Input() public message: any;

  @Input() public item: FormGroup;

  @Output() public removed: EventEmitter<number> = new EventEmitter<number>();

  static initThreshold(val: IDTEThresholdItem): FormGroup {
    return new FormGroup({
      inspectionThreshold: new FormControl(val.inspectionThreshold, [Validators.required, Validators.maxLength(50)]),
      inspectionInterval: new FormControl(val.inspectionInterval, [Validators.required, Validators.maxLength(50)]),
      inspectionMethod: new FormControl(val.inspectionMethod, [Validators.required, Validators.maxLength(50)])
    });
  }

  constructor() { }

  ngOnInit() { }

  remove() {
    this.removed.emit(this.index);

    return false;
  }
}
