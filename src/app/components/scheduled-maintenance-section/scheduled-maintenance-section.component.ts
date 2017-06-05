import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseFormComponent } from '../base-form.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';

@Component({
  selector: 'app-scheduled-maintenance-section',
  templateUrl: './scheduled-maintenance-section.component.html',
  styleUrls: ['./scheduled-maintenance-section.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduledMaintenanceSectionComponent extends BaseFormComponent {
  scheduledMaintenanceGroup: FormGroup;
  constructor(private fb: FormBuilder) {
    super('scheduledMaintenanceGroup');
  }

  ngOnInit() {
    this.scheduledMaintenanceGroup = this.fb.group({
      checkType: ['', [Validators.required]],
      nonRoutineNo: ['', []],
      routineNo: ['', []]
    },
      {
        validator: CustomValidators.validateScheduledMaintenanceFields
      }
    );
    this.parent.addControl(this.formGroupName, this.scheduledMaintenanceGroup);
  }
ngOnDestroy() {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.parent.removeControl(this.formGroupName);
  }
}
