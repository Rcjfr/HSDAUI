import { Component, OnInit, Input, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent  } from '../base-form.component';

@Component({
  selector: 'app-defect-discovered-during-section-form',
  templateUrl: './defect-discovered-during-section-form.component.html',
  styleUrls: ['./defect-discovered-during-section-form.component.less']
})
export class DefectDiscoveredDuringSectionFormComponent extends BaseFormComponent {
defectDiscoveredDuringSectionFormGroup: FormGroup;
  constructor(private fb: FormBuilder) {
    super('defectDiscoveredDuringSectionFormGroup');
  }
  ngOnInit() {
    this.defectDiscoveredDuringSectionFormGroup = this.fb.group({
      defectDiscoveredDuring: ['', [Validators.required]],


    });
    this.parent.addControl(this.formGroupName, this.defectDiscoveredDuringSectionFormGroup);
    //  this.defectDiscoveredDuringSectionFormGroup.get('defectDiscoveredDuring').valueChanges
    //         .subscribe(val => this.setDefectDetectedFields(val));
  }
  setDefectDetectedFields(defectDiscoveredDuring: number): void {
        const scheduledGroup = this.defectDiscoveredDuringSectionFormGroup.get('scheduledMaintenanceGroup');
        const unscheduledGroup = this.defectDiscoveredDuringSectionFormGroup.get('unscheduledMaintenanceGroup');
        if (defectDiscoveredDuring == 1) {
            unscheduledGroup.clearValidators();
            unscheduledGroup.get("description").clearValidators();
            unscheduledGroup.get("micNo").clearValidators();
            unscheduledGroup.get("nonRoutineNo").clearValidators();

            scheduledGroup.setValidators(CustomValidators.validateScheduledMaintenanceFields);
            scheduledGroup.get("checkType").setValidators([Validators.required]);
            scheduledGroup.get("routineNo").setValidators([Validators.pattern(Expressions.Alphanumerics)]);
            scheduledGroup.get("nonRoutineNo").setValidators([Validators.pattern(Expressions.Alphanumerics)]);
        } else {
            scheduledGroup.clearValidators();
            scheduledGroup.get('checkType').clearValidators();
            scheduledGroup.get('routineNo').clearValidators();
            scheduledGroup.get('nonRoutineNo').clearValidators();
            unscheduledGroup.setValidators(CustomValidators.validateUnscheduledMaintenanceFields);
            unscheduledGroup.get('description').setValidators([Validators.required]);
            unscheduledGroup.get('micNo').setValidators([Validators.pattern(Expressions.Alphanumerics)]);
            unscheduledGroup.get('nonRoutineNo').setValidators([Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(50)]);
        }
        scheduledGroup.updateValueAndValidity();
        unscheduledGroup.updateValueAndValidity();
        scheduledGroup.get('checkType').updateValueAndValidity();
        scheduledGroup.get('routineNo').updateValueAndValidity();
        scheduledGroup.get('nonRoutineNo').updateValueAndValidity();
        unscheduledGroup.get('description').updateValueAndValidity();
        unscheduledGroup.get('micNo').updateValueAndValidity();
        unscheduledGroup.get('nonRoutineNo').updateValueAndValidity();
    }

}
