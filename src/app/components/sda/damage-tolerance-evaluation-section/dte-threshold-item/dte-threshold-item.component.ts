/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { IDTEThresholdItem } from '@app/common/models';
import * as models from '@app/common/models';
import { Observable } from 'rxjs/Observable';
import { AppStateService, AuthService } from '@app/common/services';
import { FormGroup, FormArray, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { DteThresholdItemsArrayComponent } from '../dte-threshold-items-array/dte-threshold-items-array.component';
import { Expressions } from '@app/common/validators/generic-validator';
@Component({
  selector: 'aa-dte-threshold-item',
  templateUrl: './dte-threshold-item.component.html',
  styleUrls: ['./dte-threshold-item.component.less']
})

export class DteThresholdItemComponent implements OnInit {
  @Input() editable = false;
  @Input() public index: number;
  @Input() public message: any;
  @Input() public item = new FormGroup({});

  @Output() public removed = new EventEmitter<number>();
  @Output() public tracked = new EventEmitter<number>();
  @Output() public updateTimeWhenDue = new EventEmitter<any>();

  static initThreshold(val: IDTEThresholdItem): FormGroup {
    return new FormGroup({

      isActiveTracking: new FormControl(val.isActiveTracking),
      thresholdTFC: new FormControl(val.thresholdTFC, [Validators.pattern('[0-9 ]+')]),
      thresholdTFH: new FormControl(val.thresholdTFH, [Validators.pattern('[0-9 ]+')]),
      thresholdDate: new FormControl(val.thresholdDate),
      thresholdStage1Duration: new FormControl(val.thresholdStage1Duration),
      wolt: new FormControl(val.wolt),
     });
  }
  constructor(private fb: FormBuilder, private appStateService: AppStateService, AuthService: AuthService) { }

  ngOnInit() {

  }

  remove() {
    this.removed.emit(this.index);

     return false;
  }

  track() {
    this.tracked.emit(this.index);
  }

  uTWD() {
    this.updateTimeWhenDue.emit();
  }

  clearThresholdInput() {

   if (this.item.get('thresholdStage1Duration')) {
      this.item.get('thresholdTFC').reset();
      this.item.get('thresholdTFH').reset();
      this.item.get('thresholdDate').reset();
    }

  }

  clearThresholdRadio() {

    if (this.item.get('thresholdTFC') || this.item.get('thresholdTFH') || this.item.get('thresholdDate')) {
      this.item.get('thresholdStage1Duration').reset();
    }

  }

}
