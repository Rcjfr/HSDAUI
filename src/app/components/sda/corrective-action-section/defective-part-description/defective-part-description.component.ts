
import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { BaseFormComponent } from '../../base-form.component';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import * as models from '../../../../common/models';
import { AuthService } from "../../../../common/services";
@Component({
  selector: 'aa-defective-part-description',
  templateUrl: './defective-part-description.component.html',
  styleUrls: ['./defective-part-description.component.less']
})
export class DefectivePartDescriptionComponent extends BaseFormComponent implements OnDestroy, OnInit, OnChanges {
  defectivePartDescriptionGroup: FormGroup;


  constructor(private fb: FormBuilder, authService: AuthService) {
    super('defectivePartDescriptionGroup', authService);
    this.defectivePartDescriptionGroup = this.fb.group({
      defectivePartDescription: ['', [Validators.maxLength(30), Validators.required]]
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.defectivePartDescriptionGroup.patchValue(newSda.correctiveActionSection || {});
      if (this.checkSDAFormStatus()) {
        this.defectivePartDescriptionGroup.disable();
      } else {
        this.defectivePartDescriptionGroup.enable();
      }
    }
  }
  ngOnInit() {

    this.parent.addControl(this.formGroupName, this.defectivePartDescriptionGroup);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
