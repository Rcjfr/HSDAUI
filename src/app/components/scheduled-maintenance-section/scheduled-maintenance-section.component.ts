﻿import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { BaseFormComponent } from '../base-form.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { AppStateService } from '../../common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '../../common/models';

@Component({
  selector: 'aa-scheduled-maintenance-section',
  templateUrl: './scheduled-maintenance-section.component.html',
  styleUrls: ['./scheduled-maintenance-section.component.less']

})
export class ScheduledMaintenanceSectionComponent extends BaseFormComponent implements OnInit, OnDestroy, OnChanges {
  checkTypes$: Observable<List<models.ICheckType>>;
  scheduledMaintenanceGroup: FormGroup;
  constructor(private fb: FormBuilder, private appStateService: AppStateService) {
    super('scheduledMaintenanceGroup');
    this.formGroup = this.fb.group({
      checkType: ['', [Validators.required]],
      nonRoutineNo: ['', [Validators.maxLength(50)]],
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
    if (changes.sda && changes.sda.currentValue.id) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.formGroup.patchValue(newSda.generalSection);
    }
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
