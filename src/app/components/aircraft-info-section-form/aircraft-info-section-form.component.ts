import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output, OnDestroy } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Expressions } from '../../common/validators/generic-validator';
import { BaseFormComponent } from '../base-form.component';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { IAircraftInfo } from '../../common/models/aircraft-info.model';
import { AppStateService } from '../../common/services';


@Component({
  selector: 'aa-aircraft-info-section-form',
  templateUrl: './aircraft-info-section-form.component.html',
  styleUrls: ['./aircraft-info-section-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AircraftInfoSectionFormComponent extends BaseFormComponent implements OnInit, OnDestroy {
  @Output() onNoseNumberChange = new EventEmitter();
  @Input()
  set aircraftInfo(info: IAircraftInfo){
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
  public decimalNumberMask = createNumberMask({
    prefix: '',
    allowDecimal: true,
    includeThousandsSeparator: false,
    decimalLimit: 2,
    requireDecimal: false
  });
  public numberMask = createNumberMask({
    prefix: '',
    allowDecimal: false,
    includeThousandsSeparator: false,
    allowLeadingZeroes: false
  });

  constructor(private fb: FormBuilder, public appStateService: AppStateService) {
    super('aircraftInfoSectionFormGroup');
  }

  ngOnInit(): void {
    this.aircraftInfoSectionFormGroup = this.fb.group({
      aircraftNo: ['', [Validators.required, Validators.maxLength(5), Validators.pattern(Expressions.Alphanumerics)]],
      manufacturer: ['', [Validators.required, Validators.maxLength(100)]],
      model: ['', [Validators.required, Validators.maxLength(15)]],
      serialNo: ['', [Validators.required, Validators.maxLength(10)]],
      totalShipTime: ['', [Validators.required, Validators.maxLength(25)]],
      cycles: ['', [Validators.required, Validators.maxLength(25)]],
      fleet: ['', [Validators.required, Validators.maxLength(20)]],
      originator: ['', [Validators.required, Validators.maxLength(50)]]
    });
    this.parent.addControl(this.formGroupName, this.aircraftInfoSectionFormGroup);
    // this.aircraftInfoSectionFormGroup.get('fleet')
    //                                  .valueChanges.debounceTime(500)
    //                                  .subscribe((v: string) => this.appStateService.loadCheckTypes(v));

  }
  loadData() {
    if (!this.sda.id) return;
    this.aircraftInfoSectionFormGroup.patchValue({
      aircraftNo: this.sda.generalSection.aircraftNo,
      manufacturer: this.sda.generalSection.manufacturer,
      model: this.sda.generalSection.model,
      serialNo: this.sda.generalSection.serialNo,
      totalShipTime: this.sda.generalSection.totalShipTime,
      cycles: this.sda.generalSection.cycles,
      fleet: this.sda.generalSection.fleet,
      originator: this.sda.generalSection.originator
    });
  }
  noseNumberOnSelect(e: TypeaheadMatch) {
    // console.log('Selected value: ', e.value);
    this.onNoseNumberChange.emit(e.value);
  }
}
