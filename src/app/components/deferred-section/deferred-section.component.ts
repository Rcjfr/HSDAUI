import { Component, OnInit, Input, ElementRef, ViewChildren, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent  } from '../base-form.component';

@Component({
  selector: 'app-deferred-section',
  templateUrl: './deferred-section.component.html',
  styleUrls: ['./deferred-section.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeferredSectionFormComponent extends BaseFormComponent {
deferredSectionFormGroup: FormGroup;
  constructor(private fb: FormBuilder) {
      super('deferredSectionFormGroup');
  }
  ngOnInit() {
      this.deferredSectionFormGroup = this.fb.group({
          deferredSectionOptions: ['', [Validators.required]],
    });
      this.parent.addControl(this.formGroupName, this.deferredSectionFormGroup);
  }
  get deferredSection(){
      return this.deferredSectionFormGroup.get('deferredSectionOptions').value;
  }
}
