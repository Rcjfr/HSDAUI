import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent } from '../../components/base-form.component';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { AppStateService } from '../../common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { IDetectionMethod } from '../../common/models';
import { decimalsNumberMask } from '../../common/masks';
@Component({
  selector: 'app-defect-location-section-form',
  templateUrl: './defect-location-section-form.component.html',
  styleUrls: ['./defect-location-section-form.component.less']
})
export class DefectLocationSectionFormComponent extends BaseFormComponent implements OnInit {
  detectionMethods$: Observable<List<IDetectionMethod>>;
  defectLocationSectionFormGroup: FormGroup;
  decimalsNumberMask = decimalsNumberMask;
    constructor( private fb: FormBuilder, private appStateService: AppStateService) {
      super('defectLocationSectionFormGroup');
    }

  ngOnInit() {
    this.detectionMethods$ = this.appStateService.getDetectionMethods();
    this.defectLocationSectionFormGroup = this.fb.group({
      defectType: ['', [Validators.required, Validators.maxLength(250)]],
          defectDescription: ['', [Validators.required,  Validators.maxLength(250)]],
          length: ['', [Validators.required]],
          width: ['', [Validators.required]],
          depth: ['', [Validators.required]],

          MFGpart: ['', [Validators.maxLength(50)]],
          partDefective: ['', [Validators.required, Validators.maxLength(50)]],
          MFGserial: ['', [Validators.maxLength(50)]],
          PartTT: ['', [Validators.pattern(Expressions.Numerics), Validators.maxLength(25)]],
          PartTso: ['', [Validators.pattern(Expressions.Numerics), Validators.maxLength(25)]],
          detected: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics)]]

    });
    this.parent.addControl(this.formGroupName, this.defectLocationSectionFormGroup);

  }

}
