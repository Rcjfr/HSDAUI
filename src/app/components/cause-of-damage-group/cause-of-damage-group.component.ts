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
    this.parent.addControl(this.formGroupName, this.causeOfDamageGroup);
  }
  public isChecked(val: number, check: number) {
    return val & check;
  }
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}