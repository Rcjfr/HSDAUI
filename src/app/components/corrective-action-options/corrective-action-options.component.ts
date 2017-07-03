﻿import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChildren, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent } from '../base-form.component';

@Component({
    selector: 'aa-corrective-action-options',
    templateUrl: './corrective-action-options.component.html',
    styleUrls: ['./corrective-action-options.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorrectiveActionOptionsComponent extends BaseFormComponent implements OnInit, OnDestroy {
   correctiveActionOptionFormGroup: FormGroup;
    constructor(private fb: FormBuilder) {
        super('correctiveActionOptionFormGroup');
    }

    ngOnInit() {
        this.correctiveActionOptionFormGroup = this.fb.group({
            correctiveActionOptions: ['', []],
            modifiedpartDescription: ['', [, Validators.maxLength(30)]],
            defectivePartDescription: ['', [, Validators.maxLength(30)]]
        });
        this.parent.addControl(this.formGroupName, this.correctiveActionOptionFormGroup);
        //this.correctiveActionOptionFormGroup.get('correctiveActionOptions').valueChanges
        //.subscribe(val => this.setCorrectiveActionRepairDescriptionFormGroupFields(val));
        //this.correctiveActionOptionFormGroup.get('modifiedpartDescription').valueChanges
        //    .subscribe(val => this.setCorrectiveActionRepairDescriptionFormGroupFields(val))

      //this.correctiveActionOptionFormGroup.get('modifiedpartDescription').clearValidators();
      //this.correctiveActionOptionFormGroup.get('defectivePartDescription').clearValidators();


      //this.correctiveActionOptionFormGroup.get('defectivePartDescription').updateValueAndValidity();
      //this.correctiveActionOptionFormGroup.get('modifiedpartDescription').updateValueAndValidity();


    }

  ////  setCorrectiveActionRepairDescriptionFormGroupFields(correctiveActionOption: number): void {

  //     // if (correctiveActionOption == 1) {
  //          //this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').get('repairedDescribe').clearValidators();
  //          //this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').get('externalVisible').clearValidators();
  //          //this.correctiveActionOptionFormGroup.get('modifiedpartDescription').clearValidators();
  //          //this.correctiveActionOptionFormGroup.get('defectivePartDescription').setValidators([Validators.required,
                    //Validators.maxLength(30), Validators.pattern(Expressions.Alphanumerics)]);
  //         // this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').clearValidators();
  //      }
  //    //  else if (correctiveActionOption == 2) {

  //         // this.correctiveActionOptionFormGroup.get('defectivePartDescription').clearValidators();
  //         // this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').clearValidators();
  //          //this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').get('repairedDescribe').clearValidators();
  //          //this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').get('externalVisible').clearValidators();
  //         //this.correctiveActionOptionFormGroup.get('modifiedpartDescription').setValidators([Validators.required, Validators.maxLength(30),
                    //Validators.pattern(Expressions.Alphanumerics)]);
  //      }

  //      //else {
  //      //    //this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').get('repairedDescribe').clearValidators();
  //      //    //this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').get('externalVisible').clearValidators();
  //      //   this.correctiveActionOptionFormGroup.get('defectivePartDescription').clearValidators();
  //      //   this.correctiveActionOptionFormGroup.get('modifiedpartDescription').clearValidators();
  //      //}
  //      //this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').get('repairedDescribe').updateValueAndValidity();
  //      //this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').get('externalVisible').updateValueAndValidity();
  //     /// this.correctiveActionOptionFormGroup.get('correctiveActionRepairDescriptionFormGroup').updateValueAndValidity();
  //      //this.correctiveActionOptionFormGroup.get('defectivePartDescription').updateValueAndValidity();
  //      //this.correctiveActionOptionFormGroup.get('modifiedpartDescription').updateValueAndValidity();


  //  }

    //get correctiveAction() {
    //    return this.correctiveActionOptionFormGroup.get('correctiveActionOptions').value;
    //}

    ngOnDestroy() {
        this.parent.removeControl(this.formGroupName);
    }
}
