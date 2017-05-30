import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Expressions } from '../../common/validators/generic-validator';
import { BaseFormComponent } from '../base-form.component';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { AircraftInfo } from '../../common/models/aircraft-info.model';


@Component({
  selector: 'app-aircraft-info-section-form',
  templateUrl: './aircraft-info-section-form.component.html',
  styleUrls: ['./aircraft-info-section-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AircraftInfoSectionFormComponent extends BaseFormComponent {
  @Output() onNoseNumberChange = new EventEmitter();
  @Input()
  set aircraftInfo(info: AircraftInfo){
    if (this.aircraftInfoSectionFormGroup) {
    this.aircraftInfoSectionFormGroup.get('manufacturer').setValue(info.manufacturer);
    this.aircraftInfoSectionFormGroup.get('model').setValue(info.model);
    this.aircraftInfoSectionFormGroup.get('serialNo').setValue(info.serialNo);
    this.aircraftInfoSectionFormGroup.get('totalShipTime').setValue(info.totalShipTime);
    this.aircraftInfoSectionFormGroup.get('cycles').setValue(info.cycles);
    this.aircraftInfoSectionFormGroup.get('fleet').setValue(info.fleet);
    }
  }
  aircraftInfoSectionFormGroup: FormGroup;
  createNumberMask = createNumberMask;
  private measurementNumberMask = createNumberMask({
    prefix: '',
    allowDecimal: true,
    includeThousandsSeparator: false,
    decimalLimit: 3,
    integerLimit: 3,
    requireDecimal: false
  });
  private decimalNumberMask = createNumberMask({
    prefix: '',
    allowDecimal: true,
    includeThousandsSeparator: false,
    decimalLimit: 2,
    requireDecimal: false
  });
  private numberMask = createNumberMask({
    prefix: '',
    allowDecimal: false,
    includeThousandsSeparator: false,
    allowLeadingZeroes: false
  });

  constructor(private fb: FormBuilder) {
    super('aircraftInfoSectionFormGroup');
  }

  ngOnInit() {
    this.aircraftInfoSectionFormGroup = this.fb.group({
      aircraftNo: ['', [Validators.required, Validators.maxLength(5), Validators.pattern(Expressions.Alphanumerics)]],
      manufacturer: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(100)]],
      model: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(15)]],
      serialNo: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(10)]],
      totalShipTime: ['', [Validators.required, Validators.maxLength(25)]],
      cycles: ['', [Validators.required, Validators.maxLength(25)]],
      fleet: ['', [Validators.required, Validators.maxLength(20)]]
    });
    this.parent.addControl(this.formGroupName, this.aircraftInfoSectionFormGroup);

  }
  noseNumberOnSelect(e: TypeaheadMatch) {
    // console.log('Selected value: ', e.value);
    this.onNoseNumberChange.emit(e.value);
  }
}
