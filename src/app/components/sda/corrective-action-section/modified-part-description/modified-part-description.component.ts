
import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import * as models from '@app/common/models';
import { AuthService } from '@app/common/services';
@Component({
  selector: 'aa-modified-part-description',
  templateUrl: './modified-part-description.component.html',
  styleUrls: ['./modified-part-description.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModifiedPartDescriptionComponent extends BaseFormComponent implements OnDestroy, OnInit, OnChanges {
  modifiedPartDescriptionGroup: FormGroup;


  constructor(private fb: FormBuilder, authService: AuthService) {
    super('modifiedPartDescriptionGroup', authService);
    this.modifiedPartDescriptionGroup = this.fb.group({
      modifiedPartDescription: ['', [Validators.maxLength(30), Validators.required]]
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.modifiedPartDescriptionGroup.patchValue(newSda.correctiveActionSection || {});
      if (this.checkSDAFormStatus()) {
        this.modifiedPartDescriptionGroup.disable();
      } else {
        this.modifiedPartDescriptionGroup.enable();
      }
    }
  }
  ngOnInit() {
    this.parent.addControl(this.formGroupName, this.modifiedPartDescriptionGroup);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
