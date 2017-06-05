import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { BaseFormComponent } from '../base-form.component';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
@Component({
  selector: 'app-precise-location-group',
  templateUrl: './precise-location-group.component.html',
  styleUrls: ['./precise-location-group.component.less']
})
export class PreciseLocationGroupComponent extends BaseFormComponent {
  preciseLocationGroup: FormGroup;
  constructor(private fb: FormBuilder) {
    super('preciseLocationGroup');

   }

  ngOnInit() {
    this.preciseLocationGroup = this.fb.group({
              stationLocation: ['', [Validators.maxLength(25)]],
              stringer: ['', [Validators.maxLength(25)]],
              wl: ['', [Validators.maxLength(25)]],
              bl: ['', [Validators.maxLength(25)]]
          },
              {
                  validator: CustomValidators.validatePreciseLocationGroupFields
              }
              );
              this.parent.addControl(this.formGroupName, this.preciseLocationGroup);
  }

}
