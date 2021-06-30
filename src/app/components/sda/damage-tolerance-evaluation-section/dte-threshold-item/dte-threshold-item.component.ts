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
 
  static initThreshold(val: IDTEThresholdItem): FormGroup {
    
    return new FormGroup({
    
      IsActiveTracking: new FormControl(val.IsActiveTracking, [Validators.maxLength(50)]),
      ThresholdTFC: new FormControl(val.ThresholdTFC, [Validators.maxLength(50)]),
      ThresholdTFH: new FormControl(val.ThresholdTFH, [Validators.maxLength(50)]),
      ThresholdDate: new FormControl(val.ThresholdDate, [Validators.maxLength(50)]),
      ThresholdStage1Duration: new FormControl(val.ThresholdStage1Duration, [Validators.maxLength(50)]),
      WOL: new FormControl(val.WOL, [Validators.maxLength(50)]),
      
    });
 
  }
  constructor(private fb: FormBuilder, private appStateService: AppStateService, AuthService: AuthService) { }

  ngOnInit() {
   
  }

  remove() {
    this.removed.emit(this.index);
    return false;
  }
 
  track()
  {
    this.tracked.emit(this.index);   
   
  }

  clearThresholdInput() {

   if (this.item.get('ThresholdStage1Duration'))
    {
      this.item.get('ThresholdTFC').reset();
      this.item.get('ThresholdTFH').reset();
      this.item.get('ThresholdDate').reset();
    }
  
  }
  
  clearThresholdRadio() {

    if (this.item.get('ThresholdTFC') || this.item.get('ThresholdTFH') || this.item.get('ThresholdDate'))
    {
      this.item.get('ThresholdStage1Duration').reset();
    }

  }

}