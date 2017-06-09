import { Component, OnInit, Input, ElementRef, ViewChildren, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
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
export class CauseOfDamageGroupComponent extends BaseFormComponent implements OnDestroy
{
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
          damageOther: ['', []]
      } ,{
              validator: CustomValidators.ValidateCauseOfDamageGroupFields
          });
      this.parent.addControl(this.formGroupName, this.causeOfDamageGroup);
    }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}


