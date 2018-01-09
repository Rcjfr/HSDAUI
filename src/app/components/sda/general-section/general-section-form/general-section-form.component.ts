import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit, ViewChildren, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { GenericValidator, Expressions } from '@app/common/validators/generic-validator';
import { CustomValidators } from '@app/common/validators/custom-validators';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { List } from 'immutable';
import * as models from '@app/common/models';
import { AppStateService, AuthService } from '@app/common/services';
import { Observable, Observer } from 'rxjs/Rx';

@Component({
  selector: 'aa-general-section-form',
  templateUrl: './general-section-form.component.html',
  styleUrls: ['./general-section-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralSectionFormComponent extends BaseFormComponent implements OnInit, OnChanges {
  departments$: Observable<models.IBaseLookUp[]>;
  stations$: Observable<models.IStation[]>;
  generalSectionFormGroup: FormGroup;
  aircraftInfo$: Observable<models.IAircraftInfo>;
  alertCodes$: Observable<models.IBaseLookUp[]>;
  ATACodes$: Observable<models.IATACode[]>;
  disableCreateDate = false;
  public today = new Date();

  constructor(private fb: FormBuilder, private appStateService: AppStateService, authService: AuthService) {
    super('generalSectionFormGroup', authService);
    this.generalSectionFormGroup = this.fb.group({
      sdaId: new FormControl({ value: '', disabled: true }),
      sdrNumber: ['', [Validators.maxLength(20), Validators.pattern(Expressions.Alphanumerics)]],
      createDate: [new Date(), [Validators.required, CustomValidators.validateFutureDate]],
      lineMaintenance: false,
      alertCode: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics)]],
      station: [
        '', [
          Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern(Expressions.Alphabets)
        ]
      ],
      department: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics)]],
      originator: ['', [Validators.required, Validators.maxLength(50)]],
      originatorBadgeNo: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit() {
    this.parent.addControl(this.formGroupName, this.generalSectionFormGroup);
    this.alertCodes$ = this.appStateService.getAlertCodes();
    this.ATACodes$ = this.appStateService.getATACodes();
    this.departments$ = this.appStateService.getDepartments();

    this.aircraftInfo$ = this.appStateService.getAircraftInfo().skip(1);

    this.stations$ = Observable.create((observer: Observer<string>) => {
      observer.next(this.generalSectionFormGroup.get('station').value);
    })
      .switchMap(token => {
        this.appStateService.loadStations(token);

        return this.appStateService.getStations(token);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.generalSectionFormGroup.patchValue(newSda.generalSection);
      this.generalSectionFormGroup.patchValue({ sdaId: newSda.id === 0 ? '' : newSda.id });
      this.generalSectionFormGroup.patchValue({ department: newSda.generalSection.department || '' });
      this.generalSectionFormGroup.patchValue({ alertCode: newSda.generalSection.alertCode || '' });
      this.generalSectionFormGroup.patchValue({ alertCode: newSda.generalSection.alertCode || '' });
      this.generalSectionFormGroup.patchValue({ createDate: new Date(newSda.generalSection.createDate) });

      if (this.checkSDAFormStatus()) {
        this.generalSectionFormGroup.disable();
        this.disableCreateDate = true;
      } else {
        this.generalSectionFormGroup.enable();
        this.disableCreateDate = false;
      }
      this.generalSectionFormGroup.get('sdaId').disable();
      this.generalSectionFormGroup.get('sdrNumber').disable();
      if (!this.sda.id) {
        this.authService.displayName().take(1).subscribe(u => {
          this.generalSectionFormGroup.patchValue({ originator: u });
        });
        this.authService.badgeId().take(1).subscribe(u => {
          this.generalSectionFormGroup.patchValue({ originatorBadgeNo: u });
        });
      }

    }
  }

  populateAircraftInfo(noseNumber: string) {
    this.appStateService.loadAircraftInfo(noseNumber);
  }
}
