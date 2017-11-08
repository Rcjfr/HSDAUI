import { Component, OnInit, Input, ElementRef, ViewChildren, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator, Expressions } from '@app/common/validators/generic-validator';
import { CustomValidators } from '@app/common/validators/custom-validators';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import * as models from '@app/common/models';
import { AuthService } from '@app/common/services';

@Component({
  selector: 'aa-defect-discovered-during-section-form',
  templateUrl: './defect-discovered-during-section-form.component.html',
  styleUrls: ['./defect-discovered-during-section-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefectDiscoveredDuringSectionFormComponent extends BaseFormComponent implements OnInit, OnChanges {
  constructor(private fb: FormBuilder, authService: AuthService) {
    super('defectDiscoveredDuringSectionFormGroup', authService);
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
      this.checkSDAFormStatus();
    }
  }
  get defectDiscovered() {
    return this.formGroup.get('defectDiscoveredDuring').value;
  }
}
