
import { Component, OnInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { BaseFormComponent } from '../base-form.component';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';

@Component({
  selector: 'aa-modified-part-description',
  templateUrl: './modified-part-description.component.html',
  styleUrls: ['./modified-part-description.component.less']
})
export class ModifiedPartDescriptionComponent extends BaseFormComponent implements OnDestroy, OnInit {
    modifiedPartDescriptionGroup: FormGroup;


  constructor(private fb: FormBuilder) {
      super('modifiedPartDescriptionGroup');

  }
  loadData(){
}
  ngOnInit() {
      this.modifiedPartDescriptionGroup = this.fb.group({
          modifiedPartDescription: ['', [Validators.maxLength(30), Validators.required]]
    });
      this.parent.addControl(this.formGroupName, this.modifiedPartDescriptionGroup);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
