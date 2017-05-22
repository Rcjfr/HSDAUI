import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Expressions } from '../common/validators/generic-validator';
@Component({
  selector: 'app-aircraft-info-section-form',
  templateUrl: './aircraft-info-section-form.component.html',
  styleUrls: ['./aircraft-info-section-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AircraftInfoSectionFormComponent implements OnInit {
@Input() parent: FormGroup;
@Input() displayMessage: { [key: string]: string } = {};
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
    allowLeadingZeroes:false
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.aircraftInfoSectionFormGroup = this.fb.group({
            aircraftNo:     ['', [Validators.required, Validators.maxLength(5), Validators.pattern(Expressions.Alphanumerics)]],
            manufacturer:   ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(100)]],
            model:          ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(15)]],
            serialNo:       ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(10)]],
            totalShipTime:  ['', [Validators.required, Validators.maxLength(25)]],
            cycles:         ['', [Validators.required, Validators.maxLength(25)]],
            fleet:          ['', [Validators.required, Validators.maxLength(20)]]
    });
    this.parent.addControl('aircraftInfoSectionFormGroup', this.aircraftInfoSectionFormGroup);
  }

}
