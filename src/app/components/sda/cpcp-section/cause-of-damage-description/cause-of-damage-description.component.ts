import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { BaseFormComponent } from '../../base-form.component';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import * as models from '../../../../common/models';
import { AuthService } from '../../../../common/services';
@Component({
  selector: 'aa-cause-of-damage-description',
  templateUrl: './cause-of-damage-description.component.html',
  styleUrls: ['./cause-of-damage-description.component.less']
})
export class CauseOfDamageDescriptionComponent extends BaseFormComponent implements OnDestroy, OnInit, OnChanges {
  causeOfDamageDescriptionGroup: FormGroup;


  constructor(private fb: FormBuilder, authService: AuthService) {
    super('causeOfDamageDescriptionGroup', authService);
    this.causeOfDamageDescriptionGroup = this.fb.group({
      damageDescription: ['', [Validators.maxLength(250), Validators.required]]
    });
  }

  ngOnInit() {
    this.parent.addControl(this.formGroupName, this.causeOfDamageDescriptionGroup);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.causeOfDamageDescriptionGroup.patchValue(newSda.cpcpSection || {});
    }
  }
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
