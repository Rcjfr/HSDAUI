import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent } from '../../components/base-form.component';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { AppStateService } from '../../common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { decimalsNumberMask } from '../../common/masks';
import * as models from '../../common/models';
@Component({
  selector: 'aa-defect-location-section-form',
  templateUrl: './defect-location-section-form.component.html',
  styleUrls: ['./defect-location-section-form.component.less']
})
export class DefectLocationSectionFormComponent extends BaseFormComponent implements OnInit, OnChanges {
  detectionMethods$: Observable<List<models.IDetectionMethod>>;
  damageTypes$: Observable<List<models.IDamageType>>;
  defectLocationSectionFormGroup: FormGroup;
  decimalsNumberMask = decimalsNumberMask;
  constructor(private fb: FormBuilder, private appStateService: AppStateService) {
    super('defectLocationSectionFormGroup');
    this.defectLocationSectionFormGroup = this.fb.group({
      damageType: ['', [Validators.required, Validators.maxLength(250)]],
      damageDescription: ['', [Validators.required, Validators.maxLength(250)]],
      length: ['', [Validators.required]],
      width: ['', [Validators.required]],
      depth: ['', [Validators.required]],
      manufacturerPartNo: ['', [Validators.maxLength(50)]],
      partDefective: ['', [Validators.required, Validators.maxLength(50)]],
      manufacturerSerialNo: ['', [Validators.maxLength(50)]],
      partTT: ['', [Validators.maxLength(25), Validators.pattern(Expressions.Numerics)]],
      partTSO: ['', [Validators.pattern(Expressions.Numerics), Validators.maxLength(25)]],
      detectionMethod: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics)]]
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.defectLocationSectionFormGroup.patchValue(newSda.defectLocationSection);
    }
  }
  ngOnInit() {
    this.detectionMethods$ = this.appStateService.getDetectionMethods();
    this.damageTypes$ = this.appStateService.getDamageTypes();
    this.parent.addControl(this.formGroupName, this.defectLocationSectionFormGroup);
  }
}
