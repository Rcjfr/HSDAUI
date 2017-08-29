import { Component, OnInit, Input, ElementRef, ViewChildren, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator, Expressions } from '../../../../common/validators/generic-validator';
import { CustomValidators } from '../../../../common/validators/custom-validators';
import { BaseFormComponent } from '../../base-form.component';
import * as models from '../../../../common/models';
@Component({
  selector: 'aa-corrective-action-form',
  templateUrl: './corrective-action-form.component.html',
  styleUrls: ['./corrective-action-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorrectiveActionFormGroupComponent extends BaseFormComponent implements OnInit, OnChanges {
  correctiveActionFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    super('correctiveActionFormGroup');
    this.correctiveActionFormGroup = this.fb.group({
      deferralCode: ['', [Validators.maxLength(3), Validators.pattern(Expressions.Alphabets)]],
      deferralNo: ['', [Validators.maxLength(15), Validators.pattern(Expressions.Alphanumerics)]],
      isDeferred: [false, []],
      isMajorRepair: ['', []],
      majorRepairDescription: ['', [Validators.maxLength(250)]],
      completedBy: ['', [Validators.maxLength(50)]],
      completedDate: [new Date(), []]
    },
      //{
      //    validator: CustomValidators.validateCorrectiveActionFormFields
      //    }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.correctiveActionFormGroup.patchValue(newSda.correctiveActionSection || {});
      this.checkSDAFormStatus();
    }
  }

  ngOnInit() {
    this.parent.addControl(this.formGroupName, this.correctiveActionFormGroup);
  }

  isDeferred(): boolean {
    return this.correctiveActionFormGroup.get('isDeferred').value === true;
  }

  setCorrectiveActionFormFields(isCorrectiveEvent: boolean): void {
    if (isCorrectiveEvent !== true) {
      this.correctiveActionFormGroup.get('deferralCode').clearValidators();
      this.correctiveActionFormGroup.get('deferralNo').clearValidators();

    } else {
      this.correctiveActionFormGroup.get('deferralCode').setValidators([Validators.required, Validators.maxLength(3), Validators.pattern(Expressions.Alphabets)]);
      this.correctiveActionFormGroup.get('deferralNo').setValidators([Validators.required, Validators.maxLength(15), Validators.pattern(Expressions.Alphanumerics)]);
    }
    this.correctiveActionFormGroup.get('deferralCode').updateValueAndValidity();
    this.correctiveActionFormGroup.get('deferralNo').updateValueAndValidity();
  }

  setMajorRepairFormFields(isMajorRepairEvent: boolean): void {
    if (isMajorRepairEvent !== true) {
      this.correctiveActionFormGroup.get('majorRepairDescription').clearValidators();
    } else {
      this.correctiveActionFormGroup.get('majorRepairDescription').setValidators([Validators.required, Validators.maxLength(250)]);
    }
    this.correctiveActionFormGroup.get('majorRepairDescription').updateValueAndValidity();
  }
}
