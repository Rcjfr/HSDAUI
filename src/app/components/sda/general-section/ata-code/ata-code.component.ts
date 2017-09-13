import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { BaseFormComponent } from '../../base-form.component';
import { List } from 'immutable';
import * as models from '../../../../common/models';
import { FilterByPipe } from 'ng-pipes';
import { AuthService } from '../../../../common/services';

@Component({
  selector: 'aa-ata-code',
  templateUrl: './ata-code.component.html',
  styleUrls: ['./ata-code.component.less']
})
export class AtaCodeComponent extends BaseFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() ATACodes: models.IATACode[];
  ataCodes2: models.IATACode[];
  pipe = new FilterByPipe();
  constructor(private fb: FormBuilder, authService: AuthService) {
    super('ataCodesSectionFormGroup',authService);
    this.formGroup = this.fb.group({
      ataCode1: ['', Validators.required],
      ataCode2: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.parent.addControl(this.formGroupName, this.formGroup);
    this.subscriptions.push(this.formGroup.get('ataCode1').valueChanges.subscribe(v => this.getAlertCode2s(v)));
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.getAlertCode2s(String(newSda.generalSection.ataCode1 || ''));
      this.formGroup.patchValue({ ataCode1: newSda.generalSection.ataCode1 || '' });
      this.formGroup.patchValue({ ataCode2: newSda.generalSection.ataCode2 || '' });
    }
  }
  ngOnDestroy() {
    super.ngOnDestroy();

  }
  getAlertCode2s(ataCode1: string) {
    this.formGroup.get('ataCode2').setValue('');
    this.formGroup.get('ataCode2').markAsPristine();
    this.formGroup.get('ataCode2').markAsUntouched();
    this.ataCodes2 = <models.IATACode[]>this.pipe.transform(this.ATACodes, ['primaryCode'], ataCode1 || '', true);
  }
}
