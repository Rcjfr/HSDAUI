import { Component, OnInit, Input } from '@angular/core';
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
export class DefectLocationSectionFormComponent extends BaseFormComponent implements OnInit {
detectionMethods$: Observable<List<models.IDetectionMethod>>;
  damageTypes$: Observable<List<models.IDamageType>>;
  defectLocationSectionFormGroup: FormGroup;
  decimalsNumberMask = decimalsNumberMask;
    constructor( private fb: FormBuilder, private appStateService: AppStateService) {
      super('defectLocationSectionFormGroup');
    }

  ngOnInit() {
    this.detectionMethods$ = this.appStateService.getDetectionMethods();
    this.damageTypes$ = this.appStateService.getDamageTypes();
    this.defectLocationSectionFormGroup = this.fb.group({
      damageType: [this.sda.defectLocationSection.damageType, [Validators.required, Validators.maxLength(250)]],
      damageDescription: [this.sda.defectLocationSection.damageDescription, [Validators.required,  Validators.maxLength(250)]],
      length: [this.sda.defectLocationSection.length, [Validators.required]],
      width: [this.sda.defectLocationSection.width, [Validators.required]],
      depth: [this.sda.defectLocationSection.depth, [Validators.required]],

      manufacturerPartNo: [this.sda.defectLocationSection.manufacturerPartNo, [Validators.maxLength(50)]],
      partDefective: [this.sda.defectLocationSection.partDefective, [Validators.required, Validators.maxLength(50)]],
      manufacturerSerialNo: [this.sda.defectLocationSection.manufacturerSerialNo, [Validators.maxLength(50)]],
      partTT: [this.sda.defectLocationSection.partTT, [Validators.maxLength(25), Validators.pattern(Expressions.Numerics)]],
      partTSO: [this.sda.defectLocationSection.partTSO, [Validators.pattern(Expressions.Numerics), Validators.maxLength(25)]],
      detectionMethod: [this.sda.defectLocationSection.detectionMethod, [Validators.required, Validators.pattern(Expressions.Alphanumerics)]]

    });
    this.parent.addControl(this.formGroupName, this.defectLocationSectionFormGroup);

  }

}
