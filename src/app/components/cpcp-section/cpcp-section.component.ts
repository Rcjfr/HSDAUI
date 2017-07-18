import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { BaseFormComponent } from '../base-form.component';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { AppStateService } from '../../common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { ICorrosionLevel, ICorrosionType, IFloorboardCondition } from '../../common/models';

@Component({
  selector: 'aa-cpcp-section-form',
  templateUrl: './cpcp-section.component.html',
  styleUrls: ['./cpcp-section.component.less']
})
export class CpcpSectionComponent extends BaseFormComponent implements OnInit {
  corrosionTypes$: Observable<List<ICorrosionType>>;
  corrosionLevels$: Observable<List<ICorrosionLevel>>;
  floorboardConditions$: Observable<List<IFloorboardCondition>>;
  cpcpSectionGroup: FormGroup;

  constructor(private fb: FormBuilder, private appStateService: AppStateService) {
    super('cpcpSectionGroup');
  }

  ngOnInit() {
    this.corrosionLevels$ = this.appStateService.getCorrosionLevels();
    this.corrosionTypes$ = this.appStateService.getCorrosionTypes();
    this.floorboardConditions$ = this.appStateService.getFloorboardConditions();
    this.cpcpSectionGroup = this.fb.group({
      iscpcpRelatedEvent: [this.sda.CPCPSection.iscpcpRelatedEvent, []],
      isWideSpreadCorrosion: [this.sda.CPCPSection.isWideSpreadCorrosion, []],
      corrosionLevel: [this.sda.CPCPSection.corrosionLevel, []],
      isPreviouslyBlended: [this.sda.CPCPSection.isPreviouslyBlended, []],
      corrosionType: [this.sda.CPCPSection.corrosionType, []],
      corrosionTypeOtherText: [this.sda.CPCPSection.corrosionTypeOtherText, [Validators.maxLength(250)]],
      corrosionTaskNo: [this.sda.CPCPSection.corrosionTaskNo, [Validators.maxLength(25)]],
      floorBoardCondition: [this.sda.CPCPSection.floorBoardCondition, []]
    });
    this.parent.addControl(this.formGroupName, this.cpcpSectionGroup);
    //this.cpcpSectionGroup.get('iscpcpRelatedEvent').valueChanges
    //  .subscribe(val => this.setCorrosionPreventionFields(val));
    //this.cpcpSectionGroup.get('corrosionType').valueChanges
    //  .subscribe(val => this.setCorrosionTypeFields(val));
  }

  setCorrosionTypeFields(corrosionType: string): void {
    if (corrosionType !== '5') {
      this.cpcpSectionGroup.get('corrosionTypeOtherText').clearValidators();
    } else {
      this.cpcpSectionGroup.get('corrosionTypeOtherText').setValidators([Validators.required,
      Validators.maxLength(250),
      Validators.pattern(Expressions.Alphanumerics)]);
    }

    this.cpcpSectionGroup.get('corrosionTypeOtherText').updateValueAndValidity();
  }

  setCorrosionPreventionFields(isCorrosionEvent: number): void {
    if (isCorrosionEvent !== 1) {
      this.cpcpSectionGroup.get('isWideSpreadCorrosion').clearValidators();
      this.cpcpSectionGroup.get('isPreviouslyBlended').clearValidators();
      this.cpcpSectionGroup.get('corrosionTaskNo').clearValidators();
      this.cpcpSectionGroup.get('corrosionLevel').clearValidators();
      this.cpcpSectionGroup.get('corrosionType').clearValidators();
      this.cpcpSectionGroup.get('causeOfDamageGroup').clearValidators();
    } else {
      this.cpcpSectionGroup.get('isWideSpreadCorrosion').setValidators([Validators.required]);
      this.cpcpSectionGroup.get('isPreviouslyBlended').setValidators([Validators.required]);
      this.cpcpSectionGroup.get('corrosionTaskNo').setValidators([Validators.required,
      Validators.maxLength(25)
      ]);
      this.cpcpSectionGroup.get('corrosionLevel').setValidators([Validators.required]);
      this.cpcpSectionGroup.get('corrosionType').setValidators([Validators.required]);
    }

    this.cpcpSectionGroup.get('isWideSpreadCorrosion').updateValueAndValidity();
    this.cpcpSectionGroup.get('isPreviouslyBlended').updateValueAndValidity();
    this.cpcpSectionGroup.get('corrosionTaskNo').updateValueAndValidity();
    this.cpcpSectionGroup.get('corrosionLevel').updateValueAndValidity();
    this.cpcpSectionGroup.get('corrosionType').updateValueAndValidity();
    this.cpcpSectionGroup.get('causeOfDamageGroup').updateValueAndValidity();
  }
}