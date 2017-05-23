import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import {BaseFormComponent} from '../base-form.component';
import { List } from 'immutable';
import { ATACode } from '../../common/models/ata-code.model';

@Component({
  selector: 'app-ata-code',
  templateUrl: './ata-code.component.html',
  styleUrls: ['./ata-code.component.less']
})
export class AtaCodeComponent extends BaseFormComponent {
  ataCode2s: ATACode[];
  @Input() ATACodes: List<ATACode>;
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
  ngOnDestroy() {
    this.parent.removeControl(this.formGroupName);

  }
getAlertCode2s(alertCode1: string) {
        this.ataCode2s = <ATACode[]>[];
        if (!alertCode1) {            return;        }
        this.ataCodesSectionFormGroup.get('ataCode2').setValue('');
        this.ataCodesSectionFormGroup.get('ataCode2').markAsPristine();
        this.ataCodesSectionFormGroup.get('ataCode2').markAsUntouched();
        this.ataCode2s = this.ATACodes.find(b => b.Code === alertCode1).SecondaryCodes;
    }
}
