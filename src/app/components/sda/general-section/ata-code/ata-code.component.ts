import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { List } from 'immutable';
import * as models from '@app/common/models';
import { FilterByPipe } from 'ng-pipes';
import { AuthService } from '@app/common/services';

@Component({
  selector: 'aa-ata-code',
  templateUrl: './ata-code.component.html',
  styleUrls: ['./ata-code.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AtaCodeComponent extends BaseFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() ATACodes: models.IATACode[];
  @Input() ATACode1Label = 'ATA Code 1';
  @Input() ATACode2Label = 'ATA Code 2';
  @Input() SectionName = 'generalSection';
  @Input() IsRequired = true;
   ataCodes2: models.IATACode[];
  pipe = new FilterByPipe();
  constructor(private fb: FormBuilder, authService: AuthService) {
    super('ataCodesSectionFormGroup', authService);
    this.formGroup = this.fb.group({
    ataCode1: ['', this.IsRequired ? [Validators.required] : []],
    ataCode2: ['', this.IsRequired ? [Validators.required] : []]
    });
  }

  ngOnInit() {
    this.parent.addControl(this.formGroupName, this.formGroup);
    this.subscriptions.push(this.formGroup.get('ataCode1').valueChanges.subscribe(v => this.getAlertCode2s(v)));
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      const section = newSda[this.SectionName];
      this.getAlertCode2s(String(section && section.ataCode1 || ''));
      this.formGroup.patchValue({ ataCode1: section && section.ataCode1 || '' });
      this.formGroup.patchValue({ ataCode2: section && section.ataCode2 || '' });
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
