import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericValidator, Expressions } from '@app/common/validators/generic-validator';
import { CustomValidators } from '@app/common/validators/custom-validators';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { AppStateService, AuthService } from '@app/common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { decimalsNumberMask } from '@app/common/masks';
import * as models from '@app/common/models';
@Component({
  selector: 'aa-defect-location-section-form',
  templateUrl: './defect-location-section-form.component.html',
  styleUrls: ['./defect-location-section-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefectLocationSectionFormComponent extends BaseFormComponent implements OnInit, OnChanges, OnDestroy {
  detectionMethods$: Observable<models.IBaseLookUp[]>;
  damageTypes$: Observable<models.IBaseLookUp[]>;
  decimalsNumberMask = decimalsNumberMask;
  public DETECTION_METHOD_OTHER = '9';
  constructor(private fb: FormBuilder, private appStateService: AppStateService, authService: AuthService) {
    super('defectLocationSectionFormGroup', authService);
    this.formGroup = this.fb.group({
      damageType: ['', [Validators.required, Validators.maxLength(250)]],
      damageDescription: ['', [Validators.required, Validators.maxLength(250)]],
      length: [null, [Validators.required]],
      width: [null, [Validators.required]],
      depth: [null, [Validators.required]],
      manufacturerPartNo: ['', [Validators.maxLength(100)]],
      partDefective: ['', [Validators.required, Validators.maxLength(100)]],
      manufacturerSerialNo: ['', [Validators.maxLength(100)]],
      partTT: ['', [Validators.maxLength(25), Validators.pattern(Expressions.Numerics)]],
      partTSO: ['', [Validators.pattern(Expressions.Numerics), Validators.maxLength(25)]],
      detectionMethod: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics)]],
      detectionMethodOtherDescription: ['', [Validators.maxLength(50)]]
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.formGroup.patchValue(newSda.defectLocationSection);
      this.formGroup.patchValue({ damageType: newSda.defectLocationSection.damageType || '' });
      this.formGroup.patchValue({ detectionMethod: newSda.defectLocationSection.detectionMethod || '' });

      this.checkSDAFormStatus();
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnInit() {
    this.detectionMethods$ = this.appStateService.getDetectionMethods();
    this.damageTypes$ = this.appStateService.getDamageTypes();
    this.subscriptions.push(this.formGroup.get('detectionMethod').valueChanges.subscribe(v => {
      if (v === this.DETECTION_METHOD_OTHER) {
        this.formGroup.get('detectionMethodOtherDescription').patchValue('');
      }
    }));
    this.parent.addControl(this.formGroupName, this.formGroup);
  }
}
