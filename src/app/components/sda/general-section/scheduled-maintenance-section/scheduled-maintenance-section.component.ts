import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Expressions } from '@app/common/validators/generic-validator';
import { CustomValidators } from '@app/common/validators/custom-validators';
import { AppStateService, AuthService } from '@app/common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '@app/common/models';

@Component({
  selector: 'aa-scheduled-maintenance-section',
  templateUrl: './scheduled-maintenance-section.component.html',
  styleUrls: ['./scheduled-maintenance-section.component.less']

})
export class ScheduledMaintenanceSectionComponent extends BaseFormComponent implements OnInit, OnDestroy, OnChanges {
  checkTypes$: Observable<List<models.ICheckType>>;
  scheduledMaintenanceGroup: FormGroup;
  constructor(private fb: FormBuilder, private appStateService: AppStateService, authService: AuthService) {
    super('scheduledMaintenanceGroup', authService);
    this.formGroup = this.fb.group({
      checkType: ['', [Validators.required]],
      nonRoutineNo: ['', [Validators.maxLength(50)]],
      esmReference: ['', [Validators.maxLength(50)]],
      routineNo: ['', [Validators.maxLength(50)]]
    },
      {
        validator: CustomValidators.validateScheduledMaintenanceFields
      }
    );
  }

  ngOnInit() {
    this.parent.addControl(this.formGroupName, this.formGroup);
    this.checkTypes$ = this.appStateService.getFleetCheckTypes();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.formGroup.patchValue(newSda.generalSection);
      this.formGroup.patchValue({ checkType: newSda.generalSection.checkType || '' });
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
