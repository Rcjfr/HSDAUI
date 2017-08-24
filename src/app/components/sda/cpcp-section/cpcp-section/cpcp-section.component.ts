import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { BaseFormComponent } from '../../base-form.component';
import { GenericValidator, Expressions } from '../../../../common/validators/generic-validator';
import { CustomValidators } from '../../../../common/validators/custom-validators';
import { AppStateService } from '../../../../common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '../../../../common/models';

@Component({
  selector: 'aa-cpcp-section-form',
  templateUrl: './cpcp-section.component.html',
  styleUrls: ['./cpcp-section.component.less']
})
export class CpcpSectionComponent extends BaseFormComponent implements OnInit, OnChanges {
  corrosionTypes$: Observable<List<models.ICorrosionType>>;
  corrosionLevels$: Observable<List<models.ICorrosionLevel>>;
  floorboardConditions$: Observable<List<models.IFloorboardCondition>>;

  constructor(private fb: FormBuilder, private appStateService: AppStateService) {
    super('cpcpSectionGroup');
    this.formGroup = this.fb.group({
      iscpcpRelatedEvent: ['', []],
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
    //this.cpcpSectionGroup.get('iscpcpRelatedEvent').valueChanges
    //  .subscribe(val => this.setCorrosionPreventionFields(val));
    //this.cpcpSectionGroup.get('corrosionType').valueChanges
    //  .subscribe(val => this.setCorrosionTypeFields(val));
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      this.formGroup.patchValue(newSda.cpcpSection || {});
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
}