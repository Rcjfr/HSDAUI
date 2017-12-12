import { Component, OnInit, Input, ElementRef, ViewChildren, ChangeDetectionStrategy, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator, Expressions } from '@app/common/validators/generic-validator';
import { CustomValidators } from '@app/common/validators/custom-validators';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import * as models from '@app/common/models';
import { AuthService } from '@app/common/services';
@Component({
  selector: 'aa-corrective-action-form',
  templateUrl: './corrective-action-form.component.html',
  styleUrls: ['./corrective-action-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorrectiveActionFormGroupComponent extends BaseFormComponent implements OnInit, OnChanges, OnDestroy {
  correctiveActionFormGroup: FormGroup;

  constructor(private fb: FormBuilder, authService: AuthService) {
    super('correctiveActionFormGroup', authService);
    this.correctiveActionFormGroup = this.fb.group({
      deferralCode: ['', [Validators.maxLength(3), Validators.pattern(Expressions.Alphabets)]],
      deferralNo: ['', [Validators.maxLength(15), Validators.pattern(Expressions.Alphanumerics)]],
      isDeferred: [null, []],
      isMajorRepair: [null, []],
      majorRepairDescription: ['', [Validators.maxLength(250)]],
      completedBy: ['', [Validators.maxLength(50)]],
      completedDate: [new Date(), []]
    },
      //{
      //    validator: CustomValidators.validateCorrectiveActionFormFields
      //    }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.correctiveActionFormGroup.patchValue(newSda.correctiveActionSection || {});
      this.checkSDAFormStatus();
    }
  }

  ngOnInit() {
    this.parent.addControl(this.formGroupName, this.correctiveActionFormGroup);
    this.subscriptions.push(this.correctiveActionFormGroup.get('isDeferred').valueChanges.filter((v: boolean) => !v).subscribe(
      v => {
        this.correctiveActionFormGroup.patchValue({
          deferralCode : '',
          deferralNo : ''
        });
      }
    ));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  isDeferred(): boolean {
    return this.correctiveActionFormGroup.get('isDeferred').value === true;
  }

}
