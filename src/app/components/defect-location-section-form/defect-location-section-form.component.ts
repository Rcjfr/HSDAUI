import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent } from '../../components/base-form.component';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
@Component({
  selector: 'app-defect-location-section-form',
  templateUrl: './defect-location-section-form.component.html',
  styleUrls: ['./defect-location-section-form.component.less']
})
export class DefectLocationSectionFormComponent extends BaseFormComponent {
  defectLocationSectionFormGroup: FormGroup;
createNumberMask = createNumberMask;
    constructor( private fb: FormBuilder) {
      super('defectLocationSectionFormGroup');
    }

  ngOnInit() {
    this.defectLocationSectionFormGroup = this.fb.group({
      defectType: ['', [Validators.required, Validators.maxLength(250)]],
          defectDescription: ['', [Validators.required,  Validators.maxLength(250)]],
          length: ['', [Validators.required]],
          width: ['', [Validators.required]],
          depth: ['', [Validators.required]],

          MFGpart: ['', [Validators.maxLength(50)]],
          partDefective: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(50)]],
          MFGserial: ['', [Validators.maxLength(50)]],
          PartTT: ['', [Validators.pattern(Expressions.Numerics), Validators.maxLength(25)]],
          PartTso: ['', [Validators.pattern(Expressions.Numerics), Validators.maxLength(25)]],
          detected: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics)]]

    });
    this.parent.addControl(this.formGroupName, this.defectLocationSectionFormGroup);

  }

}
