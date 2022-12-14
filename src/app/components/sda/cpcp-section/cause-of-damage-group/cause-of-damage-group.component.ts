import { Component, OnInit, Input, ElementRef, ViewChildren, ChangeDetectionStrategy, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator, Expressions } from '@app/common/validators/generic-validator';
import { CustomValidators } from '@app/common/validators/custom-validators';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import * as models from '@app/common/models';
import { AuthService } from '@app/common/services';
@Component({
  selector: 'aa-cause-of-damage',
  templateUrl: './cause-of-damage-group.component.html',
  styleUrls: ['./cause-of-damage-group.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CauseOfDamageGroupComponent extends BaseFormComponent implements OnDestroy, OnInit, OnChanges {
  constructor(private fb: FormBuilder, authService: AuthService) {
    super('causeOfDamageGroup', authService);
    this.formGroup = this.fb.group({
      status: [''],
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
    }, { validator: CustomValidators.validateCauseOfDamageGroupFields }
    );
  }

  ngOnInit() {
    this.parent.addControl(this.formGroupName, this.formGroup);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      if (newSda.cpcpSection) {
        this.formGroup.patchValue({
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
    if (changes.newSdaStus) {
      this.formGroup.patchValue({ status: changes.newSdaStus.currentValue });
    }
  }

  isChecked(val: number, check: number) {
    /* tslint:disable */ return !!(val & check); /* tslint:disable */
  }
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
