import { Component, OnInit, Input, ElementRef, ViewChildren, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent } from '../base-form.component';

@Component({
  selector: 'app-defect-discovered-during-section-form',
  templateUrl: './defect-discovered-during-section-form.component.html',
  styleUrls: ['./defect-discovered-during-section-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefectDiscoveredDuringSectionFormComponent extends BaseFormComponent implements OnInit {
  defectDiscoveredDuringSectionFormGroup: FormGroup;
  constructor(private fb: FormBuilder) {
    super('defectDiscoveredDuringSectionFormGroup');
  }
  ngOnInit() {
    this.defectDiscoveredDuringSectionFormGroup = this.fb.group({
      defectDiscoveredDuring: ['', [Validators.required]]
    });
    this.parent.addControl(this.formGroupName, this.defectDiscoveredDuringSectionFormGroup);
  }
  get defectDiscovered() {
    return this.defectDiscoveredDuringSectionFormGroup.get('defectDiscoveredDuring').value;
  }
}
