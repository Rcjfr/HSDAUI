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
    const cpcp: FormControl = this.fb.control(null, Validators.required);
    this.cpcpSectionGroup = this.fb.group({
              cpcprelated: cpcp,
          wsCorrosion: ['', [Validators.required]],
          corrosionLevel: ['', [Validators.required]],
          previouslyBlended: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics)]],
          corrosionType: ['', [Validators.required]],
          corrosionTypeText: ['', [Validators.required, Validators.maxLength(250)]],
          corrosionTask: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(25)]],
              isfloorboardCondition: ['', []],
              floorbaordCondition: ['', []]
              }
              );
              this.parent.addControl(this.formGroupName, this.cpcpSectionGroup);
        this.cpcpSectionGroup.get('cpcprelated').valueChanges
            .subscribe(val => this.setCorrosionPreventionFields(val));
        this.cpcpSectionGroup.get('corrosionType').valueChanges
            .subscribe(val => this.setCorrosionTypeFields(val));
  }
setCorrosionTypeFields(corrosionType: string): void{
if (corrosionType != "other") {
            this.cpcpSectionGroup.get('corrosionTypeText').clearValidators();
        } else {
            this.cpcpSectionGroup.get('corrosionTypeText').setValidators([Validators.required,
                                                                          Validators.maxLength(250),
                                                                          Validators.pattern(Expressions.Alphanumerics)] );
        }
        this.cpcpSectionGroup.get('corrosionTypeText').updateValueAndValidity();

}
setCorrosionPreventionFields(isCorrosionEvent: number): void {
        if (isCorrosionEvent != 1) {
            this.cpcpSectionGroup.get('wsCorrosion').clearValidators();
            this.cpcpSectionGroup.get('previouslyBlended').clearValidators();
            this.cpcpSectionGroup.get('corrosionTask').clearValidators();
            this.cpcpSectionGroup.get('corrosionLevel').clearValidators();
            this.cpcpSectionGroup.get('corrosionType').clearValidators();
        } else {
            this.cpcpSectionGroup.get('wsCorrosion').setValidators([Validators.required]);
            this.cpcpSectionGroup.get('previouslyBlended').setValidators([Validators.required]);
            this.cpcpSectionGroup.get('corrosionTask').setValidators([Validators.required,
                                                                    Validators.maxLength(25),
                                                                    Validators.pattern(Expressions.Alphanumerics)] );
            this.cpcpSectionGroup.get('corrosionLevel').setValidators([Validators.required]);
            this.cpcpSectionGroup.get('corrosionType').setValidators([Validators.required]);

        }
            this.cpcpSectionGroup.get('wsCorrosion').updateValueAndValidity();
            this.cpcpSectionGroup.get('previouslyBlended').updateValueAndValidity();
            this.cpcpSectionGroup.get('corrosionTask').updateValueAndValidity();
            this.cpcpSectionGroup.get('corrosionLevel').updateValueAndValidity();
            this.cpcpSectionGroup.get('corrosionType').updateValueAndValidity();

    }

}
