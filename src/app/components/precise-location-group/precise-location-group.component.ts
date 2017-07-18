﻿import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { BaseFormComponent } from '../base-form.component';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
@Component({
  selector: 'aa-precise-location-group',
  templateUrl: './precise-location-group.component.html',
  styleUrls: ['./precise-location-group.component.less']
})
export class PreciseLocationGroupComponent extends BaseFormComponent implements OnInit {
  preciseLocationGroup: FormGroup;
  constructor(private fb: FormBuilder) {
    super('preciseLocationGroup');

   }

  ngOnInit() {
    this.preciseLocationGroup = this.fb.group({
      aircraftStation: [this.sda.defectLocationSection.aircraftStation, [Validators.maxLength(50)]],
      stringer: [this.sda.defectLocationSection.stringer, [Validators.maxLength(25)]],
      waterLine: [this.sda.defectLocationSection.waterLine, [Validators.maxLength(25)]],
      buttLine: [this.sda.defectLocationSection.buttLine, [Validators.maxLength(25)]]
          },
              {
                  validator: CustomValidators.validatePreciseLocationGroupFields
              }
              );
              this.parent.addControl(this.formGroupName, this.preciseLocationGroup);
  }

}
