import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Expressions } from '@app/common/validators/generic-validator';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { IAircraftInfo } from '@app/common/models/aircraft-info.model';
import { AppStateService, AuthService } from '@app/common/services';
import * as models from '@app/common/models';
import { Observable, Observer } from 'rxjs/Rx';


@Component({
  selector: 'aa-aircraft-info-section-form',
  templateUrl: './aircraft-info-section-form.component.html',
  styleUrls: ['./aircraft-info-section-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AircraftInfoSectionFormComponent extends BaseFormComponent implements OnInit, OnDestroy, OnChanges {
  @Output() onNoseNumberChange = new EventEmitter();
  noseNumbers$: Observable<models.IAircraftInfo[]>;
  loading$: Observable<boolean>;
  @Input()
  set aircraftInfo(info: IAircraftInfo) {
    if (this.formGroup && info) {
      this.formGroup.get('aircraftNo').setValue(info.noseNumber);
      this.formGroup.get('aircraftRegistrationNo').setValue(info.registrationNumber);
      this.formGroup.get('manufacturer').setValue(info.manufacturer);
      this.formGroup.get('model').setValue(info.model);
      this.formGroup.get('serialNo').setValue(info.serialNo);
      this.formGroup.get('totalShipTime').setValue(info.totalShipTime);
      this.formGroup.get('cycles').setValue(info.cycles);
      this.formGroup.get('fleet').setValue(info.fleet);
      this.appStateService.loadFleetCheckTypes(info.fleet);
    }
  }
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
  public Status = models.Status;
  constructor(private fb: FormBuilder, public appStateService: AppStateService, authService: AuthService) {
    super('aircraftInfoSectionFormGroup', authService);
    this.formGroup = this.fb.group({
      aircraftNo: ['', [Validators.required, Validators.maxLength(5), Validators.pattern(Expressions.Alphanumerics)]],
      aircraftRegistrationNo: ['', [Validators.required, Validators.maxLength(50)]],
      manufacturer: ['', [Validators.required, Validators.maxLength(100)]],
      model: ['', [Validators.required, Validators.maxLength(15)]],
      serialNo: ['', [Validators.required, Validators.maxLength(10)]],
      totalShipTime: ['', [Validators.required, Validators.maxLength(25)]],
      cycles: ['', [Validators.required, Validators.maxLength(25)]],
      fleet: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  ngOnInit(): void {
    this.parent.addControl(this.formGroupName, this.formGroup);
    this.loading$ = this.appStateService.getNoseNumbersLoading();
    this.noseNumbers$ = Observable.create((observer: Observer<string>) => {
      observer.next(this.formGroup.get('aircraftNo').value);
    })
      .switchMap(token => {
        this.appStateService.loadNoseNumbers(token);

        return this.appStateService.getNoseNumbers();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      if (newSda.generalSection.fleet) {
        this.appStateService.loadFleetCheckTypes(newSda.generalSection.fleet);
      }
      this.formGroup.patchValue(newSda.generalSection);

      this.checkSDAFormStatus();
    }
  }
  noseNumberOnSelect(noseNumber: string) {
    if (noseNumber.length < 3) { return; }
    this.onNoseNumberChange.emit(noseNumber.toUpperCase());
  }
}
