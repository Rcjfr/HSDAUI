import { Component, OnInit, Input, ElementRef, ViewChildren, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent } from '../base-form.component';

@Component({
  selector: 'aa-cause-of-damage',
  templateUrl: './cause-of-damage-group.component.html',
  styleUrls: ['./cause-of-damage-group.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CauseOfDamageGroupComponent extends BaseFormComponent implements OnDestroy, OnInit {
  causeOfDamageGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    super('causeOfDamageGroup');
  }

  ngOnInit() {
    const causesOfDamage = this.sda.CPCPSection.causesOfDamage;
    this.causeOfDamageGroup = this.fb.group({
      environment: [causesOfDamage & 0, []],
      galleySpill: [causesOfDamage & 1, []],
      blockedDrain: [causesOfDamage & 2, []],
      chemicalSpill: [causesOfDamage & 4, []],
      wetInsulationBlanket: [causesOfDamage & 8, []],
      missingFloorBoardTape: [causesOfDamage & 16, []],
      hardwareNotInstalled: [causesOfDamage & 32, []],
      poorSealingPractices: [causesOfDamage & 64, []],
      missingCorrosionInhibitor: [causesOfDamage & 128, []],
      damageOther: [causesOfDamage & 256, []]
    }, {
        validator: CustomValidators.validateCauseOfDamageGroupFields
      });
    this.parent.addControl(this.formGroupName, this.causeOfDamageGroup);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}