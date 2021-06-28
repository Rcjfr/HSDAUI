import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ConfirmComponent } from '@app/common/components/confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { IDTEInspectionItem } from '@app/common/models';
import { DteInspectionItemComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-inspection-item/dte-inspection-item.component';
import { ArrayValidators } from '@app/common/validators/array-validators';

@Component({
  selector: 'aa-dte-inspection-items-array',
  templateUrl: './dte-inspection-items-array.component.html',
  styleUrls: ['./dte-inspection-items-array.component.less']
})
export class DteInspectionItemsArrayComponent implements OnInit {

  @Input() editable = false;

  @Input() errorMessages: any = {};

  @Input() public itemsFormArray = new FormArray([]);

  static buildItems(items: IDTEInspectionItem[]) {
    const fa = new FormArray(items.map(item => DteInspectionItemComponent.initInspection(item)),ArrayValidators.maxLength(5));

    return fa;
  }

  constructor(private dialogService: DialogService) { }

  ngOnInit() { }

  addInspectionItem() {
    if (this.itemsFormArray.controls.length < 5) {
      this.itemsFormArray.push(DteInspectionItemComponent.initInspection({}));
    }

    return false;
  }

  deleteInspectionItem(index: number) {
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirm?',
      message: 'Are you sure you want to delete this inspection item?'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.itemsFormArray.removeAt(index);
        }
      });

    return false;
  }
}
