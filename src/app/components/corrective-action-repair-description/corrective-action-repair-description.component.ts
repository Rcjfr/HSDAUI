import { Component, OnInit, Input, ElementRef, ViewChildren, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent } from '../base-form.component';
//import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
    selector: 'app-corrective-action-repair-description',
    templateUrl: './corrective-action-repair-description.component.html',
    styleUrls: ['./corrective-action-repair-description.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorrectiveActionRepairDescriptionComponent extends BaseFormComponent {
    correctiveActionRepairDescriptionFormGroup: FormGroup;
   // createNumberMask = createNumberMask;
  constructor(private fb: FormBuilder) {
      super('correctiveActionRepairDescriptionFormGroup');
  }
  ngOnInit() {
      this.correctiveActionRepairDescriptionFormGroup = this.fb.group({
          repairedDescribe: ['', [Validators.required]],
          repairDocument: ['', []],
          chap: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(15)]],
          engineeringAuthorization: ['', [Validators.maxLength(15), Validators.pattern(Expressions.Alphanumerics)]],
          externalVisible: ['', [Validators.required]],
          height: ['', []],
          repairWidth: ['', []],
       
      }, 
          {
              validator: CustomValidators.validateCorrectiveActionRepairFields
          }
      );
     
       
      this.parent.addControl(this.formGroupName, this.correctiveActionRepairDescriptionFormGroup);

      this.correctiveActionRepairDescriptionFormGroup.get('repairDocument').valueChanges
          .subscribe(val => this.setCorrectiveActionRepairDocumentFields(val));
  }
  setCorrectiveActionRepairDocumentFields(repairDocument: string): void {
      if (repairDocument != "") {
          this.correctiveActionRepairDescriptionFormGroup.get('chap').clearValidators();
      } else {
          this.correctiveActionRepairDescriptionFormGroup.get('chap').setValidators([Validators.required,
          Validators.maxLength(25),
          Validators.pattern(Expressions.Alphanumerics)]);
      }
      this.correctiveActionRepairDescriptionFormGroup.get('chap').updateValueAndValidity();

  }
  ngOnDestroy() {
  
      this.parent.removeControl(this.formGroupName);
  }
  
}
