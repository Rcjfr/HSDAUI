import { Component, OnInit } from '@angular/core';
import { FormGroup,FormArray, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { BaseFormComponent } from '../base-form.component';
import { ConfirmComponent } from '../../common/components/confirm/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";

import * as moment from 'moment';
import { Observable } from "rxjs/Rx";
import { List } from "immutable";
import * as models from '../../common/models';
import { AppStateService } from '../../common/services';
@Component({
  selector: 'app-damage-tolerance-evaluation',
  templateUrl: './damage-tolerance-evaluation.component.html',
  styleUrls: ['./damage-tolerance-evaluation.component.less']
})
export class DamageToleranceEvaluationComponent extends BaseFormComponent implements OnInit {
  dteStatus$: Observable<List<models.IBaseLookUp>>;
  repairInspectionStatus$: Observable<List<models.IBaseLookUp>>;
  public uploader: FileUploader = new FileUploader({ url: '/api/attachments' });
  constructor(private fb: FormBuilder, private appStateService: AppStateService, private dialogService: DialogService) {
    super('damageToleranceEvaluationGroup');
  }

  ngOnInit() {
    this.dteStatus$ = this.appStateService.getDTEStatus();
    this.repairInspectionStatus$ = this.appStateService.getRepairInspectionStatus();
    this.formGroup = this.fb.group({
      dteStatus: ['', [Validators.required]],
      repairInspectionStatus: ['', [Validators.required]],
      fatigueCritical: [null, []],
      stage1RTSDate: [null, [Validators.required]],
      duration: [6, [Validators.required]],
      stage2Date: ['', []],
      stage3Date: ['', []],
      srNo: ['', [Validators.maxLength(25)]],
      rdasNo: ['', [Validators.maxLength(25)]],
      etdNo: ['', [Validators.maxLength(25)]],
      esmSubItemNo: ['', [Validators.maxLength(25)]],
      thresholds: this.fb.array([this.initThreshold()]),
      monitorItems: this.fb.array([this.initMonitorItem()]),
      dteComments: ['', [Validators.maxLength(500)]],
      updatedBy: ['', [Validators.required, Validators.maxLength(50)]],
      updatedDate: new FormControl({ value: new Date(), disabled: true }), 
      dteDueDate: new FormControl({ value: '', disabled: true })  

    });
    this.parent.addControl(this.formGroupName, this.formGroup);
    const dteStatusControl = this.formGroup.get('dteStatus');
    const stage1RTSDateControl = this.formGroup.get('stage1RTSDate');
    const durationControl = this.formGroup.get('duration');
    const dteDueDateControl = this.formGroup.get('dteDueDate');
    Observable.merge(dteStatusControl.valueChanges,
      stage1RTSDateControl.statusChanges,
      durationControl.statusChanges)
      .mapTo(1).subscribe(v => {
        if (stage1RTSDateControl.value == null) { return }
        let stage1RTSDate = <Date>stage1RTSDateControl.value;
        const durationMonths = <number>durationControl.value;
        switch (dteStatusControl.value) {
          case '1': //Open
            {
              var copiedDate = new Date(stage1RTSDate.getTime());
              const dueDate = new Date(copiedDate.setMonth(copiedDate.getMonth() + durationMonths));
              dteDueDateControl.setValue(moment(dueDate).format('MM/DD/YYYY'));
              break;
            }
          case '2': //Closed
            dteDueDateControl.setValue('Completed');
            break;
          case '3': //TBD
            dteDueDateControl.setValue('');
            break;
          default:
            dteDueDateControl.setValue('');
        }

      });
  }
  initThreshold() {
    return this.fb.group({
      inspectionThreshold: ['', [Validators.maxLength(50)]],
      inspectionInterval: ['', [Validators.maxLength(50)]],
      inspectionMethod: ['', [Validators.maxLength(50)]]
    });
  }
  addThreshold() {
    let arr: FormArray = <FormArray>this.formGroup.get('thresholds');
    if (arr.controls.length < 5) {
      arr.push(this.initThreshold());
    }
    return false;
  }
  deleteThreshold(index: number) {
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirm?',
      message: 'Are you sure you want to delete this threshold?'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          let arr: FormArray = <FormArray>this.formGroup.get('thresholds');
          arr.removeAt(index);
        }
      });
    return false;
  }
  initMonitorItem() {
    return this.fb.group({
      fmrLogPageMon: ['', [Validators.maxLength(25)]]
    });
  }
  addMonitorItem() {
    let arr: FormArray = <FormArray>this.formGroup.get('monitorItems');
    if (arr.controls.length < 5) {
      arr.push(this.initMonitorItem());
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
          let arr: FormArray = <FormArray>this.formGroup.get('monitorItems');
          arr.removeAt(index);
        }
      });
    return false;
  }
}
