
import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { BaseFormComponent } from '../base-form.component';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import * as models from '../../common/models';
@Component({
  selector: 'aa-modified-part-description',
  templateUrl: './modified-part-description.component.html',
  styleUrls: ['./modified-part-description.component.less']
})
export class ModifiedPartDescriptionComponent extends BaseFormComponent implements OnDestroy, OnInit, OnChanges {
  modifiedPartDescriptionGroup: FormGroup;


  constructor(private fb: FormBuilder) {
    super('modifiedPartDescriptionGroup');
    this.modifiedPartDescriptionGroup = this.fb.group({
      modifiedPartDescription: ['', [Validators.maxLength(30), Validators.required]]
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.modifiedPartDescriptionGroup.patchValue(newSda.correctiveActionSection);
    }
  }
  ngOnInit() {
    this.parent.addControl(this.formGroupName, this.modifiedPartDescriptionGroup);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
