import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ViewChildren } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { GenericValidator, Expressions } from '../../../../common/validators/generic-validator';
import { CustomValidators } from '../../../../common/validators/custom-validators';
import { BaseFormComponent } from '../../base-form.component';
import { List } from 'immutable';
import * as models from '../../../../common/models';
import { AppStateService, AuthService } from '../../../../common/services';
import { Observable, Observer } from 'rxjs/Rx';

@Component({
  selector: 'aa-general-section-form',
  templateUrl: './general-section-form.component.html',
  styleUrls: ['./general-section-form.component.less']
})
export class GeneralSectionFormComponent extends BaseFormComponent implements OnInit, AfterViewInit, OnChanges {
  departments$: Observable<List<models.IDepartment>>;
  stations$: Observable<models.IStation[]>;
  generalSectionFormGroup: FormGroup;
  aircraftInfo$: Observable<models.IAircraftInfo>;
  alertCodes$: Observable<List<models.IAlertCode>>;
  ATACodes$: Observable<List<models.IATACode>>;
  disableCreateDate = false;
  constructor(private fb: FormBuilder, private appStateService: AppStateService, private authService: AuthService) {
    super('generalSectionFormGroup');
    this.generalSectionFormGroup = this.fb.group({
      sdaId: new FormControl({ value: '', disabled: true }),
      sdrNumber: ['', [Validators.maxLength(20), Validators.pattern(Expressions.Alphanumerics)]],
      createDate: [new Date(), [Validators.required]],
      lineMaintenance: false,
      alertCode: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics)]],
      station: [
        '', [
          Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern(Expressions.Alphabets)
        ]
      ],
      department: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics)]],
      originator: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngAfterViewInit(): void {
    if (this.checkSDAFormStatus()) {
      this.disableCreateDate = true;
    }
    this.generalSectionFormGroup.get('sdrNumber').disable();
    this.authService.isReliabilityAnalyst().take(1).subscribe(isReliabilityAnalyst => {
      if (isReliabilityAnalyst && this.sda.generalSection.sdrNumber === '') {
        this.generalSectionFormGroup.get('sdrNumber').enable();
      }
    });
    this.authService.auditDisplayName().take(1).subscribe(u => {
      if (!this.sda.id) {
        this.generalSectionFormGroup.patchValue({originator:u});
      }
    });
  }

  ngOnInit() {
    this.parent.addControl(this.formGroupName, this.generalSectionFormGroup);
    this.alertCodes$ = this.appStateService.getAlertCodes(); // .map(d => d && d.toJS());
    this.ATACodes$ = this.appStateService.getATACodes().map(d => d && d.toJS());
    this.departments$ = this.appStateService.getDepartments();

    this.aircraftInfo$ = this.appStateService.getAircraftInfo();

    this.stations$ = Observable.create((observer: Observer<string>) => {
      observer.next(this.generalSectionFormGroup.get('station').value);
    })
      .switchMap(token => this.appStateService.getStations(token))
      //.do(d => console.log(d)) //TODO
      ;

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.generalSectionFormGroup.patchValue(newSda.generalSection);
      this.generalSectionFormGroup.patchValue({ sdaId: newSda.id === 0 ? '' : newSda.id });
      this.generalSectionFormGroup.patchValue({ department: newSda.generalSection.department || '' });
      this.generalSectionFormGroup.patchValue({ alertCode: newSda.generalSection.alertCode || '' });
      this.generalSectionFormGroup.patchValue({ alertCode: newSda.generalSection.alertCode || '' });
      

    }
  }
  populateAircraftInfo(noseNumber: string) {
    this.appStateService.loadAircraftInfo(noseNumber);
  }
}
