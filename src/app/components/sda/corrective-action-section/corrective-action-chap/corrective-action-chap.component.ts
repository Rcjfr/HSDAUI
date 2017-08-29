import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { BaseFormComponent } from '../../base-form.component';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import * as models from '../../../../common/models';
@Component({
  selector: 'aa-corrective-action-chap',
  templateUrl: './corrective-action-chap.component.html',
  styleUrls: ['./corrective-action-chap.component.less']
})
export class CorrectiveActionChapComponent extends BaseFormComponent implements OnDestroy, OnInit, OnChanges {
  correctiveActionChapFormGroup: FormGroup;
  constructor(private fb: FormBuilder) {
    super('correctiveActionChapFormGroup');
    this.correctiveActionChapFormGroup = this.fb.group({
      chapFigRepairText: ['', [Validators.maxLength(30), Validators.required]]
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
