import { Component, OnInit, Input, ElementRef, ViewChildren, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent } from '../base-form.component';

@Component({
  selector: 'aa-defect-discovered-during-section-form',
  templateUrl: './defect-discovered-during-section-form.component.html',
  styleUrls: ['./defect-discovered-during-section-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefectDiscoveredDuringSectionFormComponent extends BaseFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {
    super('defectDiscoveredDuringSectionFormGroup');
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      defectDiscoveredDuring: ['', [Validators.required]]
    });
    this.parent.addControl(this.formGroupName, this.formGroup);
  }
  loadData() {
    this.formGroup.patchValue({
      defectDiscoveredDuring: this.sda.generalSection.defectDiscoveredDuring
    });
  }
  get defectDiscovered() {
    return this.formGroup.get('defectDiscoveredDuring').value;
  }
}
