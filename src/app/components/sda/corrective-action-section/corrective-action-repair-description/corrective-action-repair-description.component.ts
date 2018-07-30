import { Component, OnInit, Input, ElementRef, ViewChildren, ChangeDetectionStrategy, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { GenericValidator, Expressions } from '@app/common/validators/generic-validator';
import { CustomValidators } from '@app/common/validators/custom-validators';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { decimalsNumberMask } from '@app/common/masks';
import * as models from '@app/common/models';
import { AppStateService, AuthService } from '@app/common/services';

@Component({
  selector: 'aa-corrective-action-repair-description',
  templateUrl: './corrective-action-repair-description.component.html',
  styleUrls: ['./corrective-action-repair-description.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorrectiveActionRepairDescriptionComponent extends BaseFormComponent implements OnDestroy, OnInit, OnChanges {
  correctiveActionRepairDescriptionFormGroup: FormGroup;
  repairDescriptions$: Observable<models.IBaseLookUp[]>;
  decimalsNumberMask = decimalsNumberMask;
  constructor(private fb: FormBuilder, private appStateService: AppStateService, authService: AuthService) {
    super('correctiveActionRepairDescriptionFormGroup', authService);

    this.correctiveActionRepairDescriptionFormGroup = this.fb.group({
      status: ['', []],
      repairDescriptionType: ['', []], //Validators.required
      repairDescriptionOtherText: ['', [Validators.maxLength(250)]],
      engineeringAuthorization: ['', [Validators.maxLength(100), Validators.pattern(Expressions.Alphanumerics)]],
      isExternallyVisible: ['', []], //Validators.required
      repairHeight: ['', []],
      repairWidth: ['', []]
    });
  }
  ngOnInit() {
    this.repairDescriptions$ = this.appStateService.getRepairDescriptions();
    this.parent.addControl(this.formGroupName, this.correctiveActionRepairDescriptionFormGroup);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      const data = newSda.correctiveActionSection || {};
      this.correctiveActionRepairDescriptionFormGroup.patchValue(data);
      this.correctiveActionRepairDescriptionFormGroup.patchValue({ repairDescriptionType: data.repairDescriptionType || '' });
      this.correctiveActionRepairDescriptionFormGroup.patchValue({ repairDocumentType: data.repairDocumentType || '' });
      if (this.checkSDAFormStatus()) {
        this.correctiveActionRepairDescriptionFormGroup.disable();
      } else {
        this.correctiveActionRepairDescriptionFormGroup.enable();
      }
    }
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
