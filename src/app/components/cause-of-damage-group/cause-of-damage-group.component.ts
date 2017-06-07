import { Component, OnInit, Input, ElementRef, ViewChildren, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent } from '../base-form.component';

@Component({
    selector: 'app-cause-of-damage',
  templateUrl: './cause-of-damage-group.component.html',
  styleUrls: ['./cause-of-damage-group.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CauseOfDamageGroupComponent extends BaseFormComponent {
    causeOfDamageGroup: FormGroup;
  constructor( private fb: FormBuilder) {
      super('causeOfDamageGroup');
   }

  ngOnInit() {
      this.causeOfDamageGroup = this.fb.group({ 
          environment: ['', []],
          gallySpill: ['', []],
          blockedDrain: ['', []],
          chemicalSpill: ['', []],
          wetinsulationBlanket: ['', []],
          missingFloorBoardTape: ['', []],
          hardwareNotInstalled: ['', []],
          poorsealingPractices: ['', []],
          missingCorrosionInhibitor: ['', []],
          damageOther: ['', []],
          
          damageDescription: ['', [Validators.maxLength(250)]],
      } ,{
              validator: CustomValidators.ValidateCauseOfDamageGroupFields
          });
      this.parent.addControl(this.formGroupName, this.causeOfDamageGroup);

      this.causeOfDamageGroup.get('damageOther').valueChanges
          .subscribe(val => this.setCorrosionPreventionFields(val))
  }
  setCorrosionPreventionFields(isDamageCauseEvent: boolean): void {
    
      if (isDamageCauseEvent != true) {
         
          
          this.causeOfDamageGroup.get('damageDescription').clearValidators();
          
      } else {
         
         
          this.causeOfDamageGroup.get('damageDescription').setValidators([Validators.required, Validators.maxLength(250)]);

         // this.causeOfDamageGroup.reset();
      }
    
      this.causeOfDamageGroup.get('damageDescription').updateValueAndValidity();
     
      // this.causeOfDamageGroup.updateValueAndValidity();
  }
}


