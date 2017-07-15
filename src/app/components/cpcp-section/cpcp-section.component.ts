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
    const cpcp: FormControl = this.fb.control(null, Validators.required);
    this.cpcpSectionGroup = this.fb.group({
      cpcprelated: cpcp,
      wsCorrosion: ['', []],
      corrosionLevel: ['', []],
      previouslyBlended: [null, []],
      corrosionType: ['', []],
      corrosionTypeText: ['', [Validators.maxLength(250)]],
      corrosionTask: ['', [Validators.maxLength(25)]],
      isfloorboardCondition: ['', []],
      floorBoardCondition: ['', []]
    });
    this.parent.addControl(this.formGroupName, this.cpcpSectionGroup);
    //this.cpcpSectionGroup.get('cpcprelated').valueChanges
    //  .subscribe(val => this.setCorrosionPreventionFields(val));
    this.cpcpSectionGroup.get('corrosionType').valueChanges
      .subscribe(val => this.setCorrosionTypeFields(val));
  }

  setCorrosionTypeFields(corrosionType: string): void {
    if (corrosionType !== '5') {
      this.cpcpSectionGroup.get('corrosionTypeText').clearValidators();
    } else {
      this.cpcpSectionGroup.get('corrosionTypeText').setValidators([Validators.required,
      Validators.maxLength(250),
      Validators.pattern(Expressions.Alphanumerics)]);
    }

    this.cpcpSectionGroup.get('corrosionTypeText').updateValueAndValidity();
  }

  setCorrosionPreventionFields(isCorrosionEvent: number): void {
    if (isCorrosionEvent !== 1) {
      this.cpcpSectionGroup.get('wsCorrosion').clearValidators();
      this.cpcpSectionGroup.get('previouslyBlended').clearValidators();
      this.cpcpSectionGroup.get('corrosionTask').clearValidators();
      this.cpcpSectionGroup.get('corrosionLevel').clearValidators();
      this.cpcpSectionGroup.get('corrosionType').clearValidators();
      this.cpcpSectionGroup.get('causeOfDamageGroup').clearValidators();
    } else {
      this.cpcpSectionGroup.get('wsCorrosion').setValidators([Validators.required]);
      this.cpcpSectionGroup.get('previouslyBlended').setValidators([Validators.required]);
      this.cpcpSectionGroup.get('corrosionTask').setValidators([Validators.required,
      Validators.maxLength(25)
      ]);
      this.cpcpSectionGroup.get('corrosionLevel').setValidators([Validators.required]);
      this.cpcpSectionGroup.get('corrosionType').setValidators([Validators.required]);
    }

    this.cpcpSectionGroup.get('wsCorrosion').updateValueAndValidity();
    this.cpcpSectionGroup.get('previouslyBlended').updateValueAndValidity();
    this.cpcpSectionGroup.get('corrosionTask').updateValueAndValidity();
    this.cpcpSectionGroup.get('corrosionLevel').updateValueAndValidity();
    this.cpcpSectionGroup.get('corrosionType').updateValueAndValidity();
    this.cpcpSectionGroup.get('causeOfDamageGroup').updateValueAndValidity();
  }
}