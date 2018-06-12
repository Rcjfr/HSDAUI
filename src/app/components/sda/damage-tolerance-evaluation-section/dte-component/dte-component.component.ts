import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { AppStateService, AuthService } from '@app/common/services';
import { Observable } from 'rxjs/Rx';
import * as models from '@app/common/models';

@Component({
  selector: 'aa-dte-component',
  templateUrl: './dte-component.component.html',
  styleUrls: ['./dte-component.component.less']
})
export class DteComponentComponent extends BaseFormComponent implements OnInit, OnChanges {
  componentType$: Observable<models.IBaseLookUp[]>;

  constructor(private fb: FormBuilder, private appStateService: AppStateService, AuthService: AuthService) {
    super('dteComponentGroup', AuthService );
    this.formGroup = this.fb.group({
      componentType: ['', []],
      controlOrderNumber: ['', [Validators.maxLength(50)]],
      componentAAID: ['', [Validators.maxLength(10)]],
      componentSerialNumber: ['', [Validators.maxLength(25)]],
      cmbNumber: ['', [Validators.maxLength(25)]],
      compForAircraft: ['', [Validators.maxLength(10)]],
      componentRspam: ['', [Validators.maxLength(25)]],
      componentMpn: ['', [Validators.maxLength(25)]],
      componentHours: ['', [Validators.maxLength(10)]],
      componentCycles: ['', [Validators.maxLength(10)]]
    });
  }

  ngOnInit() {
    this.parent.addControl(this.formGroupName, this.formGroup);
    this.componentType$ = this.appStateService.getDTEComponentType();
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      if (newSda.dteSection) {
      this.formGroup.patchValue(newSda.dteSection);
      }
    }
  }

}
