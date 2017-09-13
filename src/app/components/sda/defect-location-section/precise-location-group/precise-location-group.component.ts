import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { BaseFormComponent } from '../../base-form.component';
import { GenericValidator, Expressions } from '../../../../common/validators/generic-validator';
import { CustomValidators } from '../../../../common/validators/custom-validators';
import * as models from '../../../../common/models';
import { AuthService } from '../../../../common/services';
@Component({
  selector: 'aa-precise-location-group',
  templateUrl: './precise-location-group.component.html',
  styleUrls: ['./precise-location-group.component.less']
})
export class PreciseLocationGroupComponent extends BaseFormComponent implements OnInit, OnChanges {
  preciseLocationGroup: FormGroup;
  constructor(private fb: FormBuilder, authService: AuthService) {
    super('preciseLocationGroup', authService);
    this.preciseLocationGroup = this.fb.group({
      aircraftStation: ['', [Validators.maxLength(50)]],
      stringer: ['', [Validators.maxLength(25)]],
      waterLine: ['', [Validators.maxLength(25)]],
      buttLine: ['', [Validators.maxLength(25)]]
    },
      {
        validator: CustomValidators.validatePreciseLocationGroupFields
      }
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.preciseLocationGroup.patchValue(newSda.defectLocationSection);
    }
  }
  ngOnInit() {
    this.parent.addControl(this.formGroupName, this.preciseLocationGroup);
  }

}
