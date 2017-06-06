//import { Component, OnInit, Input } from '@angular/core';
//import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
//import { CustomValidators } from '../../common/validators/custom-validators';
//import { BaseFormComponent } from '../../components/base-form.component';

//@Component({
//    selector: 'app-corrective-action-repair-description',
//    templateUrl: './corrective-action-repair-description.component.html',
//    styleUrls: ['./corrective-action-repair-description.component.less']
//})
//export class CorrectiveActionRepairDescriptionComponent extends BaseFormComponent {
//    correctiveActionRepairDescriptionFormGroup: FormGroup;

//    constructor(private fb: FormBuilder) {
//        super('correctiveActionFormGroup');
//    }

//    ngOnInit() {
//        this.correctiveActionRepairDescriptionFormGroup = this.fb.group({
//            deferralCode: ['', [Validators.required, Validators.maxLength(3), Validators.pattern(Expressions.Alphabets)]],
//            deferral: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(Expressions.Alphanumerics)]],
//            repairDescription: ['', [Validators.maxLength(250)]],
//        },
//            //{
//            //    validator: CustomValidators.validatecorrectiveActionRepairDescriptionFormFields
//            //}
//        );
//        this.parent.addControl(this.formGroupName, this.correctiveActionRepairDescriptionFormGroup);

//    }



//}
