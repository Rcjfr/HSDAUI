import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { GenericValidator, Expressions } from '@app/common/validators/generic-validator';
import { CustomValidators } from '@app/common/validators/custom-validators';
import * as models from '@app/common/models';
import { AuthService } from '@app/common/services';
@Component({
  selector: 'aa-precise-location-group',
  templateUrl: './precise-location-group.component.html',
  styleUrls: ['./precise-location-group.component.less'],
changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreciseLocationGroupComponent extends BaseFormComponent implements OnInit, OnChanges {
  preciseLocationGroup: FormGroup;
  constructor(private fb: FormBuilder, authService: AuthService) {
    super('preciseLocationGroup', authService);
    this.preciseLocationGroup = this.fb.group({
      aircraftStation: ['', [Validators.maxLength(100)]],
      stringer: ['', [Validators.maxLength(100)]],
      waterLine: ['', [Validators.maxLength(100)]],
      buttLine: ['', [Validators.maxLength(100)]]
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
