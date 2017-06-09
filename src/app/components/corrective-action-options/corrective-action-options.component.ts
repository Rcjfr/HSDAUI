import { Component, OnInit, Input, ElementRef, ViewChildren, ChangeDetectionStrategy,HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent } from '../base-form.component';

@Component({
    selector: 'app-corrective-action-options',
    templateUrl: './corrective-action-options.component.html',
    styleUrls: ['./corrective-action-options.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorrectiveActionOptionsComponent extends BaseFormComponent {
   correctiveActionOptionFormGroup: FormGroup;
    constructor(private fb: FormBuilder) {
        super('correctiveActionOptionFormGroup');
    }
    ngOnInit() {
        this.correctiveActionOptionFormGroup = this.fb.group({
            correctiveActionOptions: ['',[]],
            modifiedpartDescription: ['', [ Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(30)]],
            defectivePartDescription: ['', [ Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(30)]]
        });
        this.parent.addControl(this.formGroupName, this.correctiveActionOptionFormGroup);
      this.correctiveActionOptionFormGroup.get('correctiveActionOptions').valueChanges
        .subscribe(val => this.setCorrectiveActionRepairDescriptionFormGroupFields(val));
        //this.correctiveActionOptionFormGroup.get('modifiedpartDescription').valueChanges
        //    .subscribe(val => this.setCorrectiveActionRepairDescriptionFormGroupFields(val))

        this.correctiveActionOptionFormGroup.get('modifiedpartDescription').clearValidators();
        this.correctiveActionOptionFormGroup.get('defectivePartDescription').clearValidators();
      
      
        this.correctiveActionOptionFormGroup.get('defectivePartDescription').updateValueAndValidity();
        this.correctiveActionOptionFormGroup.get('modifiedpartDescription').updateValueAndValidity();

      
    }
    
    setCorrectiveActionRepairDescriptionFormGroupFields(correctiveActionOption: number): void {

        if (correctiveActionOption == 1) {
            //this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').get('repairedDescribe').clearValidators();
            //this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').get('externalVisible').clearValidators();
            this.correctiveActionOptionFormGroup.get('modifiedpartDescription').clearValidators();
            this.correctiveActionOptionFormGroup.get('defectivePartDescription').setValidators([Validators.required, Validators.maxLength(30), Validators.pattern(Expressions.Alphanumerics)]);
            this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').clearValidators();
        }
        else if (correctiveActionOption == 2) {

            this.correctiveActionOptionFormGroup.get('defectivePartDescription').clearValidators();
            this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').clearValidators();
            //this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').get('repairedDescribe').clearValidators();
            //this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').get('externalVisible').clearValidators();
            this.correctiveActionOptionFormGroup.get('modifiedpartDescription').setValidators([Validators.required, Validators.maxLength(30), Validators.pattern(Expressions.Alphanumerics)]);
        }
        else if (correctiveActionOption == 3) {
            //this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').get('repairedDescribe').setValidators([Validators.required]);
            //this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').get('externalVisible').setValidators([Validators.required]);
            //this.correctiveActionOptionFormGroup.get('defectivePartDescription').clearValidators();
            //this.correctiveActionOptionFormGroup.get('modifiedpartDescription').clearValidators();
        }
        else {
            //this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').get('repairedDescribe').clearValidators();
            //this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').get('externalVisible').clearValidators();
            this.correctiveActionOptionFormGroup.get('defectivePartDescription').clearValidators();
            this.correctiveActionOptionFormGroup.get('modifiedpartDescription').clearValidators();
        }
        //this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').get('repairedDescribe').updateValueAndValidity();
        //this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').get('externalVisible').updateValueAndValidity();
        this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').updateValueAndValidity();
        this.correctiveActionOptionFormGroup.get('defectivePartDescription').updateValueAndValidity();
        this.correctiveActionOptionFormGroup.get('modifiedpartDescription').updateValueAndValidity();


    }

    //setmodifiedpartDescriptionFields(modifiedpartDescription: number): void {
    //    if (modifiedpartDescription != 2) {
    //        this.correctiveActionOptionFormGroup.get('modifiedpartDescription').clearValidators();


    //    } else if (modifiedpartDescription == 2) {
    //        this.correctiveActionOptionFormGroup.get('modifiedpartDescription').setValidators([Validators.required, Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(30)]);



    //    }
    //    this.correctiveActionOptionFormGroup.get('modifiedpartDescription').updateValueAndValidity();



    //}
    //setdefectivePartDescriptionFields(correctiveActionOption: number): void {
    //    if (correctiveActionOption != 1) {
    //        this.correctiveActionOptionFormGroup.get('defectivePartDescription').clearValidators();


    //    } else if (correctiveActionOption == 1) {
    //        this.correctiveActionOptionFormGroup.get('defectivePartDescription').setValidators([Validators.required]);



    //    }
    //    this.correctiveActionOptionFormGroup.get('defectivePartDescription').updateValueAndValidity();



    //}
    get correctiveAction() {
        return this.correctiveActionOptionFormGroup.get('correctiveActionOptions').value;
    }
}
