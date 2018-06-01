import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChildren, ChangeDetectionStrategy, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator, Expressions } from '@app/common/validators/generic-validator';
import { CustomValidators } from '@app/common/validators/custom-validators';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import * as models from '@app/common/models';
import { AuthService } from '@app/common/services';
@Component({
  selector: 'aa-corrective-action-options',
  templateUrl: './corrective-action-options.component.html',
  styleUrls: ['./corrective-action-options.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorrectiveActionOptionsComponent extends BaseFormComponent implements OnInit, OnDestroy, OnChanges {
  correctiveActionOptionFormGroup: FormGroup;
  constructor(private fb: FormBuilder, authService: AuthService) {
    super('correctiveActionOptionFormGroup', authService);
    this.correctiveActionOptionFormGroup = this.fb.group({
      repairType: ['', []]
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.correctiveActionOptionFormGroup.patchValue(newSda.correctiveActionSection || {});
      if (this.checkSDAFormStatus()) {
        this.correctiveActionOptionFormGroup.disable();
      } else {
        this.correctiveActionOptionFormGroup.enable();
      }
    }
  }
  ngOnInit() {
    this.parent.addControl(this.formGroupName, this.correctiveActionOptionFormGroup);
  }

  ngOnDestroy() {
    this.parent.removeControl(this.formGroupName);
  }
}
