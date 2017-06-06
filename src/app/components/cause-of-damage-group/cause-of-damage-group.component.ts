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
          damageOther: ['', [Validators.required]],
          damageDescription: ['', [Validators.required]],
      } ,{
              validator: CustomValidators.ValidateCauseOfDamageGroupFields
          });
      this.parent.addControl(this.formGroupName, this.causeOfDamageGroup);

      this.causeOfDamageGroup.get('damageOther').valueChanges
          .subscribe(val => this.setCorrosionPreventionFields(val))
  }
  setCorrosionPreventionFields(isDamageCauseEvent: boolean): void {
    
      if (isDamageCauseEvent != true) {
         
          //this.causeOfDamageGroup.get('environment').clearValidators();
          //this.causeOfDamageGroup.get('gallySpill').clearValidators();
          //this.causeOfDamageGroup.get('blockedDrain').clearValidators();
          //this.causeOfDamageGroup.get('chemicalSpill').clearValidators();
          //this.causeOfDamageGroup.get('wetinsulationBlanket').clearValidators();
          //this.causeOfDamageGroup.get('missingFloorBoardTape').clearValidators();
          //this.causeOfDamageGroup.get('hardwareNotInstalled').clearValidators();
          //this.causeOfDamageGroup.get('poorsealingPractices').clearValidators();
          //this.causeOfDamageGroup.get('missingCorrosionInhibitor').clearValidators();
          this.causeOfDamageGroup.get('damageOther').clearValidators();
          this.causeOfDamageGroup.get('damageDescription').clearValidators();
         
          
          //this.causeOfDamageGroup.get('damageOther').markAsPristine();
      } else {
         
          this.causeOfDamageGroup.get('damageOther').setValidators([Validators.required]);
          this.causeOfDamageGroup.get('damageDescription').setValidators([Validators.required]);

         // this.causeOfDamageGroup.reset();
      }
      //this.causeOfDamageGroup.get('environment').updateValueAndValidity();
      //this.causeOfDamageGroup.get('gallySpill').updateValueAndValidity();
      //this.causeOfDamageGroup.get('blockedDrain').updateValueAndValidity();
      //this.causeOfDamageGroup.get('chemicalSpill').updateValueAndValidity();
      //this.causeOfDamageGroup.get('wetinsulationBlanket').updateValueAndValidity();
      //this.causeOfDamageGroup.get('missingFloorBoardTape').updateValueAndValidity();
      //this.causeOfDamageGroup.get('hardwareNotInstalled').updateValueAndValidity();
      //this.causeOfDamageGroup.get('poorsealingPractices').updateValueAndValidity();
      //this.causeOfDamageGroup.get('missingCorrosionInhibitor').updateValueAndValidity();
      this.causeOfDamageGroup.get('damageOther').updateValueAndValidity();
     
      this.causeOfDamageGroup.get('damageDescription').updateValueAndValidity();
  }
}


