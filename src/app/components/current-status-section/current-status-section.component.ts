import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from "../base-form.component";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-current-status-section',
  templateUrl: './current-status-section.component.html',
  styleUrls: ['./current-status-section.component.less']
})
export class CurrentStatusSectionComponent extends BaseFormComponent implements OnInit {

  constructor(private fb: FormBuilder) {
    super('currentStatusSectionGroup');
  }
  private reliabilityApproved:any=null;
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
  }
  approve() {
    this.reliabilityApproved = true;
    this.formGroup.get('rejectReason').setValue('');
  }
  reject() {
    this.reliabilityApproved = false;
    this.displayMessage["rejectReason"] = '';
  }

}
