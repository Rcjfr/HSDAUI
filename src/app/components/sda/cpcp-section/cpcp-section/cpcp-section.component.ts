import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { GenericValidator, Expressions } from '@app/common/validators/generic-validator';
import { CustomValidators } from '@app/common/validators/custom-validators';
import { AppStateService, AuthService } from '@app/common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '@app/common/models';

@Component({
  selector: 'aa-cpcp-section-form',
  templateUrl: './cpcp-section.component.html',
  styleUrls: ['./cpcp-section.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CpcpSectionComponent extends BaseFormComponent implements OnInit, OnChanges {
  corrosionTypes$: Observable<models.IBaseLookUp[]>;
  corrosionLevels$: Observable<models.IBaseLookUp[]>;
  floorboardConditions$: Observable<models.IBaseLookUp[]>;

  constructor(private fb: FormBuilder, private appStateService: AppStateService, authService: AuthService) {
    super('cpcpSectionGroup', authService);
    this.formGroup = this.fb.group({
      isCPCPRelatedEvent: ['', []],
      isWideSpreadCorrosion: ['', []],
      corrosionLevel: ['', []],
      isPreviouslyBlended: ['', []],
      corrosionType: ['', []],
      corrosionTypeOtherText: ['', [Validators.maxLength(250)]],
      corrosionTaskNo: ['', [Validators.maxLength(25)]],
      floorBoardCondition: ['', []]
    });
  }

  ngOnInit() {
    this.corrosionLevels$ = this.appStateService.getCorrosionLevels();
    this.corrosionTypes$ = this.appStateService.getCorrosionTypes();
    this.floorboardConditions$ = this.appStateService.getFloorboardConditions();
    this.parent.addControl(this.formGroupName, this.formGroup);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.formGroup.patchValue(newSda.cpcpSection || {});
      this.formGroup.patchValue({ corrosionType: newSda.cpcpSection.corrosionType || '' });
      this.formGroup.patchValue({ floorBoardCondition: newSda.cpcpSection.floorBoardCondition || '' });
      this.checkSDAFormStatus();
    }
  }
  setCorrosionTypeFields(corrosionType: string): void {
    if (corrosionType !== '5') {
      this.formGroup.get('corrosionTypeOtherText').clearValidators();
    } else {
      this.formGroup.get('corrosionTypeOtherText').setValidators([Validators.required,
      Validators.maxLength(250),
      Validators.pattern(Expressions.Alphanumerics)]);
    }

    this.formGroup.get('corrosionTypeOtherText').updateValueAndValidity();
  }

  setCorrosionPreventionFields(isCorrosionEvent: number): void {
    if (isCorrosionEvent !== 1) {
      this.formGroup.get('isWideSpreadCorrosion').clearValidators();
      this.formGroup.get('isPreviouslyBlended').clearValidators();
      this.formGroup.get('corrosionTaskNo').clearValidators();
      this.formGroup.get('corrosionLevel').clearValidators();
      this.formGroup.get('corrosionType').clearValidators();
      this.formGroup.get('causeOfDamageGroup').clearValidators();
    } else {
      this.formGroup.get('isWideSpreadCorrosion').setValidators([Validators.required]);
      this.formGroup.get('isPreviouslyBlended').setValidators([Validators.required]);
      this.formGroup.get('corrosionTaskNo').setValidators([Validators.required,
      Validators.maxLength(25)
      ]);
      this.formGroup.get('corrosionLevel').setValidators([Validators.required]);
      this.formGroup.get('corrosionType').setValidators([Validators.required]);
    }

    this.formGroup.get('isWideSpreadCorrosion').updateValueAndValidity();
    this.formGroup.get('isPreviouslyBlended').updateValueAndValidity();
    this.formGroup.get('corrosionTaskNo').updateValueAndValidity();
    this.formGroup.get('corrosionLevel').updateValueAndValidity();
    this.formGroup.get('corrosionType').updateValueAndValidity();
    this.formGroup.get('causeOfDamageGroup').updateValueAndValidity();
  }

  areCPCPFieldsRequired(): boolean {
    return this.isCPCPRelatedEvent() && !this.isSDAOpen(); //Only required when trying to complete the sda and a cpcp related event
  }
  isCPCPRelatedEvent(): boolean {
    return this.formGroup.get('isCPCPRelatedEvent').value === true;
  }
}
