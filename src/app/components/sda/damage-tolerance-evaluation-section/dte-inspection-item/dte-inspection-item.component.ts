/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { IDTEInspectionItem } from '@app/common/models';
import * as models from '@app/common/models';
import { Observable } from 'rxjs/Observable';
import { AppStateService, AuthService } from '@app/common/services';
import { FormGroup, FormArray, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';

@Component({
  selector: 'aa-dte-inspection-item',
  templateUrl: './dte-inspection-item.component.html',
  styleUrls: ['./dte-inspection-item.component.less']

})

export class DteInspectionItemComponent implements OnInit {
  @Input() editable = false;
  @Input() public index: number;
  @Input() public message: any;
  @Input() public item = new FormGroup({});
  @Output() public removed = new EventEmitter<number>();

  DTEIspectionTimeSpan$: Observable<models.IBaseLookUp[]>;


  static initInspection(val: IDTEInspectionItem): FormGroup {

    return new FormGroup({

      inspectionThresholdTFH: new FormControl(val.inspectionThresholdTFH, [Validators.maxLength(50)]),
      inspectionThresholdTFC: new FormControl(val.inspectionThresholdTFC, [Validators.maxLength(50)]),
      inspectionThresholdTS: new FormControl(val.inspectionThresholdTS, [Validators.maxLength(50)]),
      inspectionThresholdSpanID: new FormControl(val.inspectionThresholdSpanID, [Validators.maxLength(50)]),
      inspectionIntervalTFC: new FormControl(val.inspectionIntervalTFC, [Validators.maxLength(50)]),
      inspectionIntervalTFH: new FormControl(val.inspectionIntervalTFH, [Validators.maxLength(50)]),
      inspectionIntervalTS: new FormControl(val.inspectionIntervalTS, [Validators.maxLength(50)]),
      inspectionIntervalSpanID: new FormControl(val.inspectionIntervalSpanID, [Validators.maxLength(50)]),
      inspectionMethod: new FormControl(val.inspectionMethod, [Validators.maxLength(50)]),

    });
  }

  constructor(private fb: FormBuilder, private appStateService: AppStateService, AuthService: AuthService) {

   }

  ngOnInit() { }

  remove() {
    this.removed.emit(this.index);

    return false;
  }
}
