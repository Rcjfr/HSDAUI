import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import {BaseFormComponent} from '../base-form.component';

@Component({
  selector: 'app-ata-code',
  templateUrl: './ata-code.component.html',
  styleUrls: ['./ata-code.component.less']
})
export class AtaCodeComponent extends BaseFormComponent {
  ataCodesSectionFormGroup: FormGroup;
  constructor( private fb: FormBuilder) {
    super('ataCodesSectionFormGroup');
   }

  ngOnInit() {
     this.ataCodesSectionFormGroup = this.fb.group({
            ataCode1: ['', Validators.required],
            ataCode2: ['', Validators.required]});
      this.parent.addControl(this.formGroupName, this.ataCodesSectionFormGroup);
  }

}
