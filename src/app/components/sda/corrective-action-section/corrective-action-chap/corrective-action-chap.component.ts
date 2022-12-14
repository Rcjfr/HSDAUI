import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import * as models from '@app/common/models';
import { AuthService } from '@app/common/services';
@Component({
  selector: 'aa-corrective-action-chap',
  templateUrl: './corrective-action-chap.component.html',
  styleUrls: ['./corrective-action-chap.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorrectiveActionChapComponent extends BaseFormComponent implements OnDestroy, OnInit, OnChanges {
  correctiveActionChapFormGroup: FormGroup;
  constructor(private fb: FormBuilder, authService: AuthService) {
    super('correctiveActionChapFormGroup', authService);
    this.correctiveActionChapFormGroup = this.fb.group({
      chapFigRepairText: ['', [Validators.maxLength(100), Validators.required]]
    });
  }
  ngOnInit() {

    this.parent.addControl(this.formGroupName, this.correctiveActionChapFormGroup);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.correctiveActionChapFormGroup.patchValue(newSda.correctiveActionSection || {});
      if (this.checkSDAFormStatus()) {
        this.correctiveActionChapFormGroup.disable();
      } else {
        this.correctiveActionChapFormGroup.enable();
      }
    }
  }
  ngOnDestroy(): void {
    this.parent.removeControl(this.formGroupName);
  }
}
