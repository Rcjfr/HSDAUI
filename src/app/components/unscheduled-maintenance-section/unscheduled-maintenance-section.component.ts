import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseFormComponent } from '../base-form.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';

@Component({
  selector: 'app-unscheduled-maintenance-section',
  templateUrl: './unscheduled-maintenance-section.component.html',
  styleUrls: ['./unscheduled-maintenance-section.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnscheduledMaintenanceSectionComponent extends BaseFormComponent {
unscheduledMaintenanceGroup: FormGroup;
  constructor(private fb: FormBuilder) {
    super('unscheduledMaintenanceGroup');
   }

  ngOnInit() {
    this.unscheduledMaintenanceGroup = this.fb.group({
          description: ['', [Validators.required]],
          nonRoutineNo: ['', [Validators.maxLength(50)]],
          micNo: ['', [Validators.maxLength(50)]]
        },
        {
          validator: CustomValidators.validateUnscheduledMaintenanceFields
        }
      );
      this.parent.addControl(this.formGroupName, this.unscheduledMaintenanceGroup);
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.parent.removeControl(this.formGroupName);
  }

}
