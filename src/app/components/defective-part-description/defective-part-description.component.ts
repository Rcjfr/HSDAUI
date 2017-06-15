
import { Component, OnInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { BaseFormComponent } from "../base-form.component";
import { FormBuilder, FormGroup, Validators, FormControlName } from "@angular/forms";

@Component({
    selector: 'app-defective-part-description',
    templateUrl: './defective-part-description.component.html',
    styleUrls: ['./defective-part-description.component.less']
})
export class DefectivePartDescriptionComponent extends BaseFormComponent implements OnDestroy, OnInit {
    defectivePartDescriptionGroup: FormGroup;
  
  
  constructor(private fb: FormBuilder) {
      super('defectivePartDescriptionGroup');
    
  }

  ngOnInit() {
      this.defectivePartDescriptionGroup = this.fb.group({
          defectivePartDescription: ['', [Validators.maxLength(30),Validators.required]]
    });
      this.parent.addControl(this.formGroupName, this.defectivePartDescriptionGroup);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
