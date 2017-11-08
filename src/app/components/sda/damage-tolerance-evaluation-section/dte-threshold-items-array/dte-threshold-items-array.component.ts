import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ConfirmComponent } from '@app/common/components/confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { IDTEThresholdItem } from '@app/common/models';
import { DteThresholdItemComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-threshold-item/dte-threshold-item.component';
import { ArrayValidators } from '@app/common/validators/array-validators';

@Component({
  selector: 'aa-dte-threshold-items-array',
  templateUrl: './dte-threshold-items-array.component.html',
  styleUrls: ['./dte-threshold-items-array.component.less']
})
export class DteThresholdItemsArrayComponent implements OnInit {

  @Input() editable = false;

  @Input() errorMessages: any = {};

  @Input() public itemsFormArray = new FormArray([]);

  static buildItems(items: IDTEThresholdItem[]) {
    const fa = new FormArray(items.map(item => DteThresholdItemComponent.initThreshold(item)),
      ArrayValidators.maxLength(5));

    return fa;
  }

  constructor(private dialogService: DialogService) { }

  ngOnInit() { }

  addThresholdItem() {
    if (this.itemsFormArray.controls.length < 5) {
      this.itemsFormArray.push(DteThresholdItemComponent.initThreshold({}));
    }

    return false;
  }

  deleteThresholdItem(index: number) {
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirm?',
      message: 'Are you sure you want to delete this threshold item?'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.itemsFormArray.removeAt(index);
        }
      });

    return false;
  }
}
