import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { BaseFormComponent } from '../base-form.component';
import { List } from 'immutable';
import * as models from '../../common/models';
import {FilterByPipe} from 'ng-pipes';
@Component({
  selector: 'aa-ata-code',
  templateUrl: './ata-code.component.html',
  styleUrls: ['./ata-code.component.less']
})
export class AtaCodeComponent extends BaseFormComponent implements OnInit, OnDestroy {
  @Input() ATACodes: models.IATACode[];
  ataCodes2: models.IATACode[];
  pipe = new FilterByPipe();
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
  loadData() {
    if (!this.sda.id) return;
    this.getAlertCode2s(this.sda.generalSection.ataCode1.toString());
    this.ataCodesSectionFormGroup.patchValue({
      ataCode1: this.sda.generalSection.ataCode1,
      ataCode2: this.sda.generalSection.ataCode2
    });
  }
  ngOnDestroy() {
    this.parent.removeControl(this.formGroupName);

  }
  getAlertCode2s(alertCode1: string) {
    this.ataCodesSectionFormGroup.get('ataCode2').setValue('');
    this.ataCodesSectionFormGroup.get('ataCode2').markAsPristine();
    this.ataCodesSectionFormGroup.get('ataCode2').markAsUntouched();
    this.ataCodes2 = <models.IATACode[]>this.pipe.transform(this.ATACodes, ['primaryCode'], alertCode1, true);
  }
}
