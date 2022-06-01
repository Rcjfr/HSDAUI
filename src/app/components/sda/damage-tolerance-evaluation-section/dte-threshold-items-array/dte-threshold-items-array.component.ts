/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable */
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ConfirmComponent } from '@app/common/components/confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { IDTEThresholdItem } from '@app/common/models';
import { DteThresholdItemComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-threshold-item/dte-threshold-item.component';
import { ArrayValidators } from '@app/common/validators/array-validators';
import { ngControlStatusHost } from '@angular/forms/src/directives/ng_control_status';
import { ColdObservable } from 'rxjs/testing/ColdObservable';


@Component({
  selector: 'aa-dte-threshold-items-array',
  templateUrl: './dte-threshold-items-array.component.html',
  styleUrls: ['./dte-threshold-items-array.component.less']
})
export class DteThresholdItemsArrayComponent implements OnInit {

  @Input() editable = false;
  @Input() errorMessages: any = {};
  @Input() public itemsFormArray = new FormArray([]);

  @Output() onDatePicked = new EventEmitter<any>();
  @Output() updateTWD = new EventEmitter<any>();

  @ViewChild(DteThresholdItemsArrayComponent) viewThresholds: DteThresholdItemsArrayComponent;

  static buildItems(items: IDTEThresholdItem[]) {
    const fa = new FormArray(items.map(item => DteThresholdItemComponent.initThreshold(item)), ArrayValidators.maxLength(5));

    return fa;
  }

  public pickDate( date: any ): void { this.onDatePicked.emit(date) ; }

  constructor(private dialogService: DialogService) { }

  ngOnInit() { }

  addThresholdItem() {
    if (this.itemsFormArray.controls.length < 5) {
      this.itemsFormArray.push(DteThresholdItemComponent.initThreshold({}));
    }

    return false;
  }

  deleteThresholdItem(index: number) {
    this.dialogService.addDialog(ConfirmComponent, {title: 'Confirm?', message: 'Are you sure you want to delete this threshold item?'})
     .subscribe((isConfirmed) => {if (isConfirmed) {this.itemsFormArray.removeAt(index); this.trackCheck(index); } });

     return false;
  }

  trackCheck(trackindex: number) {

   this.itemsFormArray.controls.forEach((element, index) => {

    if (index === trackindex) {
      const currval = element.get('isActiveTracking').value;

      if (currval === true ) {
        element.get('isActiveTracking').setValue(false);
      } else {
        element.get('isActiveTracking').setValue(true);
      }
    }

    if (index !== trackindex) {
       element.get('isActiveTracking').setValue(false);
     }

    });

    this.updateTWD.emit();

  }
}

