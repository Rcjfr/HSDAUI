import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { BaseFormComponent } from '../base-form.component';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';

@Component({
  selector: 'app-cpcp-section-form',
  templateUrl: './cpcp-section.component.html',
  styleUrls: ['./cpcp-section.component.less']
})
export class CpcpSectionComponent extends BaseFormComponent {
cpcpSectionGroup: FormGroup;
  constructor(private fb: FormBuilder) {
    super('cpcpSectionGroup');

   }
  ngOnInit() {
    this.cpcpSectionGroup = this.fb.group({
              cpcprelated: ['', [Validators.required]],
          wsCorrosion: ['', [Validators.required]],
          corrosionLevel: ['', [Validators.required]],
          previouslyBlended: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics)]],
          corrosionType: ['', [Validators.required]],
          corrosionTypeText: ['', [Validators.required, Validators.maxLength(250), Validators.pattern(Expressions.Alphanumerics)]],
          corrosionTask: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(25)]],
              isfloorboardCondition: ['', []],
              floorbaordCondition: ['', [Validators.required]]
              }
              );
              this.parent.addControl(this.formGroupName, this.cpcpSectionGroup);
  }

}
