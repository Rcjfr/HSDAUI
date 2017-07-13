import { Component, OnInit, Input, ElementRef, ViewChildren, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent  } from '../base-form.component';

@Component({
    selector: 'aa-corrective-action-form',
    templateUrl: './corrective-action-form.component.html',
    styleUrls: ['./corrective-action-form.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorrectiveActionFormGroupComponent extends BaseFormComponent implements OnInit {
    correctiveActionFormGroup: FormGroup;

    constructor(private fb: FormBuilder) {
        super('correctiveActionFormGroup');
    }

    ngOnInit() {
        this.correctiveActionFormGroup = this.fb.group({
            deferralCode: ['', [Validators.maxLength(3), Validators.pattern(Expressions.Alphabets)]],
            deferral: ['', [Validators.maxLength(15), Validators.pattern(Expressions.Alphanumerics)]],
            deferredSectionOptions: ['', []],
            majorRepairOptions: ['', []],
            repairDescription: ['', [Validators.maxLength(250)]],
            completedBy: ['', [Validators.required, Validators.maxLength(50)]],
            completedDate: [new Date(), [Validators.required]]
        },
        //{
        //    validator: CustomValidators.validateCorrectiveActionFormFields
        //    }
            );
        this.parent.addControl(this.formGroupName, this.correctiveActionFormGroup);
        this.correctiveActionFormGroup.get('deferredSectionOptions').valueChanges
            .subscribe(val => this.setCorrectiveActionFormFields(val));

        this.correctiveActionFormGroup.get('majorRepairOptions').valueChanges
            .subscribe(val => this.setMajorRepairFormFields(val));
    }

    setCorrectiveActionFormFields(isCorrectiveEvent: boolean): void {
        if (isCorrectiveEvent !== true) {
            this.correctiveActionFormGroup.get('deferralCode').clearValidators();
            this.correctiveActionFormGroup.get('deferral').clearValidators();

        } else {
            this.correctiveActionFormGroup.get('deferralCode').setValidators([Validators.required, Validators.maxLength(3), Validators.pattern(Expressions.Alphabets)]);
            this.correctiveActionFormGroup.get('deferral').setValidators([Validators.required, Validators.maxLength(15), Validators.pattern(Expressions.Alphanumerics)]);
        }
        this.correctiveActionFormGroup.get('deferralCode').updateValueAndValidity();
        this.correctiveActionFormGroup.get('deferral').updateValueAndValidity();
    }

    setMajorRepairFormFields(isMajorRepairEvent: boolean): void {
        if (isMajorRepairEvent !== true) {
            this.correctiveActionFormGroup.get('repairDescription').clearValidators();
        } else {
            this.correctiveActionFormGroup.get('repairDescription').setValidators([Validators.required, Validators.maxLength(250)]);
        }
        this.correctiveActionFormGroup.get('repairDescription').updateValueAndValidity();
    }
}
