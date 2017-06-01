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
          causeOfDamage: ['', [Validators.required]],

          environment: false,
          gallySpill: false,
          blockedDrain: false,
          chemicalSpill: false,
          wetinsulationBlanket: false,
          missingFloorBoardTape: false,
          hardwareNotInstalled: false,
          poorsealingPractices: false,
          missingCorrosionInhibitor: false,
          damageOther: false,
          description: ['', [Validators.required]]
      } ,{
              validator: CustomValidators.ValidateCauseOfDamageGroupFields
          });
      this.parent.addControl(this.formGroupName, this.causeOfDamageGroup);
  }
  setCorrosionPreventionFields(isDamageCauseEvent: number): void {
      if (isDamageCauseEvent != 1) {
          this.causeOfDamageGroup.get('environment').clearValidators();
          this.causeOfDamageGroup.get('gallySpill').clearValidators();
          this.causeOfDamageGroup.get('blockedDrain').clearValidators();
          this.causeOfDamageGroup.get('chemicalSpill').clearValidators();
          this.causeOfDamageGroup.get('wetinsulationBlanket').clearValidators();
          this.causeOfDamageGroup.get('missingFloorBoardTape').clearValidators();
          this.causeOfDamageGroup.get('hardwareNotInstalled').clearValidators();
          this.causeOfDamageGroup.get('poorsealingPractices').clearValidators();
          this.causeOfDamageGroup.get('missingCorrosionInhibitor').clearValidators();
          this.causeOfDamageGroup.get('damageOther').clearValidators();
          this.causeOfDamageGroup.get('description').clearValidators();
      } else {
          this.causeOfDamageGroup.get('environment').setValidators([Validators.required]);
          this.causeOfDamageGroup.get('gallySpill').setValidators([Validators.required]);
          this.causeOfDamageGroup.get('blockedDrain').setValidators([Validators.required]);
          this.causeOfDamageGroup.get('chemicalSpill').setValidators([Validators.required]);
          this.causeOfDamageGroup.get('wetinsulationBlanket').setValidators([Validators.required]);
          this.causeOfDamageGroup.get('missingFloorBoardTape').setValidators([Validators.required]);
          this.causeOfDamageGroup.get('hardwareNotInstalled').setValidators([Validators.required]);
          this.causeOfDamageGroup.get('poorsealingPractices').setValidators([Validators.required]);
          this.causeOfDamageGroup.get('missingCorrosionInhibitor').setValidators([Validators.required]);
          this.causeOfDamageGroup.get('damageOther').setValidators([Validators.required]);
          this.causeOfDamageGroup.get('description').setValidators([Validators.required]);
          

      }
      this.causeOfDamageGroup.get('environment').updateValueAndValidity();
      this.causeOfDamageGroup.get('gallySpill').updateValueAndValidity();
      this.causeOfDamageGroup.get('blockedDrain').updateValueAndValidity();
      this.causeOfDamageGroup.get('chemicalSpill').updateValueAndValidity();
      this.causeOfDamageGroup.get('wetinsulationBlanket').updateValueAndValidity();
      this.causeOfDamageGroup.get('missingFloorBoardTape').updateValueAndValidity();
      this.causeOfDamageGroup.get('hardwareNotInstalled').updateValueAndValidity();
      this.causeOfDamageGroup.get('poorsealingPractices').updateValueAndValidity();
      this.causeOfDamageGroup.get('missingCorrosionInhibitor').updateValueAndValidity();
      this.causeOfDamageGroup.get('damageOther').updateValueAndValidity();
      this.causeOfDamageGroup.get('description').updateValueAndValidity();
  }
}
     
 //    ------------ this.causeOfDamageGroup = this.fb.group({
      
 //         environment: false,
 //         gallySpill: false,
 //         blockedDrain: false,
 //         chemicalSpill: false,
 //         wetinsulationBlanket: false,
 //         missingFloorBoardTape: false,
 //         hardwareNotInstalled: false,
 //         poorsealingPractices: false,
 //         missingCorrosionInhibitor: false,
 //         damageOther: false,
 //     },
 //         {
 //             validator: CustomValidators.ValidateCauseOfDamageGroupFields
 //         }
 //     );
 //  ---------   this.parent.addControl(this.formGroupName, this.causeOfDamageGroup);
 //    // this.causeOfDamage.get('damageOther').valueChanges

 //       //  .subscribe(val => this.setOtherAsRequiredFields(val));

 //---------- }

 // //setOtherAsRequiredFields(isCorrosionEvent: boolean): void {
 // //    if (isCorrosionEvent != true) {
 // //        this.causeOfDamage.get('description').clearValidators();

 // //    } else {
 // //        this.causeOfDamage.get('description').setValidators([Validators.required]);


 // //    }
 // //    this.causeOfDamage.get('description').updateValueAndValidity();


 // //}





//  }
  //    const CauseOfDamage: FormControl = this.fb.control(null, Validators.required);
  //    this.causeOfDamageFormGroup = this.fb.group({
  //        causeOfDamageRelated: CauseOfDamage,
          
  //        otherText:['',[Validators.required]]
  //    }
  //    );
  //    this.parent.addControl(this.formGroupName, this.causeOfDamageFormGroup);
  //    this.causeOfDamageFormGroup.get('damageOther').valueChanges
  //        .subscribe(val => this.setOtherAsRequiredFields(val));
    
  //}

  //setOtherAsRequiredFields(isCorrosionEvent: boolean): void {
  //    if (isCorrosionEvent != true) {
  //        this.causeOfDamageFormGroup.get('otherText').clearValidators();
         
  //    } else {
  //        this.causeOfDamageFormGroup.get('otherText').setValidators([Validators.required]);
           

  //    }
  //    this.causeOfDamageFormGroup.get('otherText').updateValueAndValidity();
     

  //}


