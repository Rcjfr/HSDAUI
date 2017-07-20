import { Component, OnInit, Input, ElementRef, ViewChildren, ChangeDetectionStrategy, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent } from '../base-form.component';
import * as models from '../../common/models';
@Component({
  selector: 'aa-cause-of-damage',
  templateUrl: './cause-of-damage-group.component.html',
  styleUrls: ['./cause-of-damage-group.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CauseOfDamageGroupComponent extends BaseFormComponent implements OnDestroy, OnInit, OnChanges {
  causeOfDamageGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    super('causeOfDamageGroup');
    this.causeOfDamageGroup = this.fb.group({
      environment: ['', []],
      galleySpill: ['', []],
      blockedDrain: ['', []],
      chemicalSpill: ['', []],
      wetInsulationBlanket: ['', []],
      missingFloorBoardTape: ['', []],
      hardwareNotInstalled: ['', []],
      poorSealingPractices: ['', []],
      missingCorrosionInhibitor: ['', []],
      damageOther: ['', []]
    }, {
        validator: CustomValidators.validateCauseOfDamageGroupFields
      });
  }

  ngOnInit() {

    this.parent.addControl(this.formGroupName, this.causeOfDamageGroup);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.causeOfDamageGroup.patchValue({
        environment: this.isChecked(newSda.cpcpSection.causesOfDamage, 1),
        galleySpill: this.isChecked(newSda.cpcpSection.causesOfDamage, 2),
        blockedDrain: this.isChecked(newSda.cpcpSection.causesOfDamage, 4),
        chemicalSpill: this.isChecked(newSda.cpcpSection.causesOfDamage, 8),
        wetInsulationBlanket: this.isChecked(newSda.cpcpSection.causesOfDamage, 16),
        missingFloorBoardTape: this.isChecked(newSda.cpcpSection.causesOfDamage, 32),
        hardwareNotInstalled: this.isChecked(newSda.cpcpSection.causesOfDamage, 64),
        poorSealingPractices: this.isChecked(newSda.cpcpSection.causesOfDamage, 128),
        missingCorrosionInhibitor: this.isChecked(newSda.cpcpSection.causesOfDamage, 256),
        damageOther: this.isChecked(newSda.cpcpSection.causesOfDamage, 512),
      });
    }
  }

  isChecked(val: number, check: number) {
    /* tslint:disable */ return val & check; /* tslint:disable */
  }
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}