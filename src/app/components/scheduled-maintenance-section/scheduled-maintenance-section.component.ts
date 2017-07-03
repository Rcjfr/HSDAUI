import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { BaseFormComponent } from '../base-form.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { AppStateService } from '../../common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { ICheckType } from '../../common/models';

@Component({
  selector: 'aa-scheduled-maintenance-section',
  templateUrl: './scheduled-maintenance-section.component.html',
  styleUrls: ['./scheduled-maintenance-section.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduledMaintenanceSectionComponent extends BaseFormComponent implements OnInit, OnDestroy {
  checkTypes$: Observable<List<ICheckType>>;
  scheduledMaintenanceGroup: FormGroup;
  constructor(private fb: FormBuilder, private appStateService: AppStateService) {
    super('scheduledMaintenanceGroup');
  }

  ngOnInit() {
    this.scheduledMaintenanceGroup = this.fb.group({
      checkType: ['', [Validators.required]],
      nonRoutineNo: ['', [Validators.maxLength(50)]],
      routineNo: ['', [Validators.maxLength(50)]]
    },
      {
        validator: CustomValidators.validateScheduledMaintenanceFields
      }
    );
    this.parent.addControl(this.formGroupName, this.scheduledMaintenanceGroup);
    this.checkTypes$ = this.appStateService.getFleetCheckTypes();
  }
ngOnDestroy() {
    this.parent.removeControl(this.formGroupName);
  }
}
