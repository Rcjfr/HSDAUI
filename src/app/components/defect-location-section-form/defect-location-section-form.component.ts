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
          length: ['', [Validators.required, Validators.pattern(Expressions.ThreeDecimalsPoints),  Validators.maxLength(7)]],
          width: ['', [Validators.required, Validators.pattern(Expressions.ThreeDecimalsPoints), Validators.maxLength(7)]],
          depth: ['', [Validators.required, Validators.pattern(Expressions.FourDecimalsPoints), Validators.maxLength(8)]],
         // stationLocation: ['', [Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(25)]],
          // stringer: ['', [Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(25)]],
          // wl: ['', [Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(25)]],
          // bl: ['', [Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(25)]],
          percisionLocationGroup: this.fb.group({
              stationLocation: ['', [Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(25)]],
              stringer: ['', [ Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(25)]],
              wl: ['', [ Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(25)]],
              bl: ['', [ Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(25)]],
          },

              {
                  validator: CustomValidators.ValidatePercisionLocationGroupFields
              }

              ),
          MFGpart: ['', [ Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(50)]],
          partDefective: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(50)]],
          MFGserial: ['', [ Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(50)]],
          PartTT: ['', [Validators.required, Validators.pattern(Expressions.Numerics), Validators.maxLength(25)]],
          PartTso: ['', [Validators.required, Validators.pattern(Expressions.Numerics), Validators.maxLength(25)]],
          detected: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics)]]

    });
    this.parent.addControl(this.formGroupName, this.defectLocationSectionFormGroup);

  }

}
