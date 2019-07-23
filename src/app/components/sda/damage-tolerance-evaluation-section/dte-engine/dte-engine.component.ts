import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { AuthService } from '@app/common/services';
import * as models from '@app/common/models';

@Component({
  selector: 'aa-dte-engine',
  templateUrl: './dte-engine.component.html',
  styleUrls: ['./dte-engine.component.less']
})
export class DteEngineComponent extends BaseFormComponent implements OnInit, OnChanges {
  @Input() editable = false;
  constructor(private fb: FormBuilder, AuthService: AuthService) {
    super('dteEngineGroup', AuthService);
    this.formGroup = this.fb.group({
      onOffWing: ['', []],
      rack: ['', [Validators.maxLength(50)]],
      engPsn: ['', []],
      engCycles: ['', [Validators.maxLength(10)]],
      engHours: ['', [Validators.maxLength(10)]],
      engRspam: ['', [Validators.maxLength(25)]],
      engSn: ['', [Validators.maxLength(25)]],
      engMpn: ['', [Validators.maxLength(25)]]
    });
  }

  ngOnInit() {
    this.parent.addControl(this.formGroupName, this.formGroup);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      if (newSda.dteSection) {
        this.formGroup.patchValue(newSda.dteSection);
      }
    }
    if (!this.editable) {
      this.formGroup.disable({ emitEvent: false });
    }
  }
}
