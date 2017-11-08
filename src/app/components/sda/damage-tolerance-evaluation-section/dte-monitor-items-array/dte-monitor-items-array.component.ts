import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ConfirmComponent } from '@app/common/components/confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { IDTEMonitorItem } from '@app/common/models';
import { DteMonitorItemComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-monitor-item/dte-monitor-item.component';
import { ArrayValidators } from '@app/common/validators/array-validators';

@Component({
  selector: 'aa-dte-monitor-items-array',
  templateUrl: './dte-monitor-items-array.component.html',
  styleUrls: ['./dte-monitor-items-array.component.less']
})
export class DteMonitorItemsArrayComponent implements OnInit {
  @Input() editable = false;

  @Input() errorMessages: any = {};

  @Input() public itemsFormArray = new FormArray([]);

  static buildItems(items: IDTEMonitorItem[]) {
    const fa = new FormArray(items.map(item => DteMonitorItemComponent.initMonitorItem(item)), ArrayValidators.maxLength(5));

    return fa;
  }

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
  }

  addMonitorItem() {
    if (this.itemsFormArray.controls.length < 5) {
      this.itemsFormArray.push(DteMonitorItemComponent.initMonitorItem({}));
    }

    return false;
  }

  deleteMonitorItem(index: number) {
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirm?',
      message: 'Are you sure you want to delete this monitor item?'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.itemsFormArray.removeAt(index);
        }
      });

    return false;
  }
}
