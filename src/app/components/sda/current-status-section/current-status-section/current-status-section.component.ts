import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseFormComponent } from '../../base-form.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'aa-current-status-section',
  templateUrl: './current-status-section.component.html',
  styleUrls: ['./current-status-section.component.less']
})
export class CurrentStatusSectionComponent extends BaseFormComponent implements OnInit, OnDestroy {

  public reliabilityApproved: any = null;

  constructor(private fb: FormBuilder) {
    super('currentStatusSectionGroup');
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      openStatus: [{ value: true, disabled: true }, []],
      completedStatus: [false, []],
      auditedStatus: [false, []],
      closedStatus: [false, []],
      deletedStatus: [false, []],
      deleteReason: ['', [Validators.maxLength(250)]],
      inspector: ['', [Validators.maxLength(50)]],
      inspectionDate: [new Date(), []],
      manager: ['', [Validators.maxLength(50)]],
      auditDate: [new Date(), []],
      rejectReason: ['', [Validators.maxLength(250)]]
    });
    this.parent.addControl(this.formGroupName, this.formGroup);
    this.subscriptions.push(this.formGroup.get('deletedStatus').valueChanges.subscribe(
      v => this.formGroup.get('deleteReason').setValue('')
    ));
    this.subscriptions.push(this.formGroup.get('completedStatus').valueChanges.subscribe(
      v => {
        this.formGroup.get('inspector').setValue('');
        this.formGroup.get('inspectionDate').setValue(new Date());
      }
    ));
    this.subscriptions.push(this.formGroup.get('auditedStatus').valueChanges.subscribe(
      v => {
        this.formGroup.get('manager').setValue('');
        this.formGroup.get('auditDate').setValue(new Date());
        this.reliabilityApproved = null;
        this.formGroup.get('rejectReason').setValue('');
      }
    ));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  approve() {
    this.reliabilityApproved = true;
    this.formGroup.get('rejectReason').setValue('');
  }

  reject() {
    this.reliabilityApproved = false;
    this.displayMessage['rejectReason'] = '';
  }
}