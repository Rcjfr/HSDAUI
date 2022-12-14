import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Expressions } from '@app/common/validators/generic-validator';
import { CustomValidators } from '@app/common/validators/custom-validators';
import * as models from '@app/common/models';
import { AuthService } from '@app/common/services';
@Component({
  selector: 'aa-unscheduled-maintenance-section',
  templateUrl: './unscheduled-maintenance-section.component.html',
  styleUrls: ['./unscheduled-maintenance-section.component.less']

})
export class UnscheduledMaintenanceSectionComponent extends BaseFormComponent implements OnInit, OnDestroy, OnChanges {
  constructor(private fb: FormBuilder, authService: AuthService) {
    super('unscheduledMaintenanceGroup', authService);
    this.formGroup = this.fb.group({
      unscheduledMaintenanceDescription: ['', [Validators.required, Validators.maxLength(250)]],
      nonRoutineNo: ['', [Validators.maxLength(50)]],
      micNo: ['', [Validators.maxLength(50)]]
    },
      {
        validator: CustomValidators.validateUnscheduledMaintenanceFields
      }
    );
  }

  ngOnInit() {
    this.parent.addControl(this.formGroupName, this.formGroup);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.formGroup.patchValue(newSda.generalSection);
      if (this.checkSDAFormStatus()) {
        this.formGroup.disable();
      } else {
        this.formGroup.enable();
      }
    }
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
