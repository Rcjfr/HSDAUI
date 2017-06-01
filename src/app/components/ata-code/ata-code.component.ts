import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { BaseFormComponent } from '../base-form.component';
import { List } from 'immutable';
import * as models from '../../common/models';

@Component({
  selector: 'app-ata-code',
  templateUrl: './ata-code.component.html',
  styleUrls: ['./ata-code.component.less']
})
export class AtaCodeComponent extends BaseFormComponent implements OnInit, OnDestroy {
  @Input() ATACodes: models.IATACode[];
  ataCodesSectionFormGroup: FormGroup;
  constructor(private fb: FormBuilder) {
    super('ataCodesSectionFormGroup');
  }

  ngOnInit() {
    this.ataCodesSectionFormGroup = this.fb.group({
      ataCode1: ['', Validators.required],
      ataCode2: ['', Validators.required]
    });
    this.parent.addControl(this.formGroupName, this.ataCodesSectionFormGroup);
  }
  ngOnDestroy() {
    this.parent.removeControl(this.formGroupName);

  }
  getAlertCode2s(alertCode1: string) {
    this.ataCodesSectionFormGroup.get('ataCode2').setValue('');
    this.ataCodesSectionFormGroup.get('ataCode2').markAsPristine();
    this.ataCodesSectionFormGroup.get('ataCode2').markAsUntouched();
  }
}
