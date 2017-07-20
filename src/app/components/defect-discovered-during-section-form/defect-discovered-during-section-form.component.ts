import { Component, OnInit, Input, ElementRef, ViewChildren, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent } from '../base-form.component';
import * as models from '../../common/models';

@Component({
  selector: 'aa-defect-discovered-during-section-form',
  templateUrl: './defect-discovered-during-section-form.component.html',
  styleUrls: ['./defect-discovered-during-section-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefectDiscoveredDuringSectionFormComponent extends BaseFormComponent implements OnInit, OnChanges {
  constructor(private fb: FormBuilder) {
    super('defectDiscoveredDuringSectionFormGroup');
    this.formGroup = this.fb.group({
      defectDiscoveredDuring: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.parent.addControl(this.formGroupName, this.formGroup);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.formGroup.patchValue(newSda.generalSection);
    }
  }
  get defectDiscovered() {
    return this.formGroup.get('defectDiscoveredDuring').value;
  }
}
