﻿import { Component, OnInit, Input, ElementRef, ViewChildren, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent } from '../base-form.component';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-corrective-action-repair-description',
  templateUrl: './corrective-action-repair-description.component.html',
  styleUrls: ['./corrective-action-repair-description.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorrectiveActionRepairDescriptionComponent extends BaseFormComponent implements OnDestroy {
  correctiveActionRepairDescriptionFormGroup: FormGroup;
  public repairDescriptions$ = Observable.of([
    { id: 1, description: 'Bonded Repair' },
    { id: 2, description: 'Bore/Fastener Hole(s) Rework' },
    { id: 3, description: 'Complex Repair' },
    { id: 4, description: 'Doubler Repair, External' },
    { id: 5, description: 'Doubler Repair, Flush' },
    { id: 6, description: 'Doubler Repair, Internal' },
    { id: 7, description: 'Non-reinforcing, Repair' },
    { id: 8, description: 'Non-reinforcing-Supplemental Inspection-MINOR' },
    { id: 9, description: 'Part Replacement - Entire' },
    { id: 10, description: 'Replacement - Sub Assembly' },
    { id: 11, description: 'Refinish - Scribe Line' },
    { id: 12, description: 'Reinforcing - Modification' },
    { id: 13, description: 'Restore Bonded Material' },
    { id: 14, description: 'Splice Repair' },
    { id: 15, description: 'Plug Reinforcement ( Nested Angles)' },
    { id: 16, description: 'Plug-Fastener' },
    { id: 17, description: 'Other' }
  ]);
  public repairDocuments$ = Observable.of([
    { id: 1, description: 'AARD' },
    { id: 2, description: 'AARD (w/supporting EA)' },
    { id: 3, description: 'AMM' },
    { id: 4, description: 'EA' },
    { id: 5, description: 'ECO' },
    { id: 6, description: 'DNF ESO' },
    { id: 7, description: 'Field EA' },
    { id: 8, description: 'MCM' },
    { id: 9, description: 'MRB' },
    { id: 10, description: 'Shop ESO' },
    { id: 11, description: 'Shop ESO (w/supporting EA)' },
    { id: 12, description: 'SRM (w/supporting EA)' },
    { id: 13, description: 'SRM' },
    { id: 14, description: 'BCSRPP' }
  ]);
  createNumberMask = createNumberMask;
  public decimalsNumberMask(decimalLimit: number, integerLimit: number) {
    return createNumberMask({
      prefix: '',
      allowDecimal: true,
      includeThousandsSeparator: false,
      decimalLimit: decimalLimit,
      integerLimit: integerLimit,
      requireDecimal: false
    });
  }
  constructor(private fb: FormBuilder) {
    super('correctiveActionRepairDescriptionFormGroup');
  }
  ngOnInit() {
    this.correctiveActionRepairDescriptionFormGroup = this.fb.group({
      repairedDescribe: ['', [Validators.required]],
      repairDocument: ['', []],
      chap: ['', [Validators.maxLength(30)]],
      engineeringAuthorization: ['', [Validators.maxLength(25), Validators.pattern(Expressions.Alphanumerics)]],
      externalVisible: ['', [Validators.required]],
      height: ['', []],
      repairWidth: ['', []]

    },
      {
        validator: CustomValidators.validateCorrectiveActionRepairFields
      }
    );


    this.parent.addControl(this.formGroupName, this.correctiveActionRepairDescriptionFormGroup);
    this.subscriptions.push(this.correctiveActionRepairDescriptionFormGroup.get('height').valueChanges.debounceTime(1000).subscribe(v =>
      this.correctiveActionRepairDescriptionFormGroup.get('height').setValue(Math.round(v))
    ));
    this.subscriptions.push(this.correctiveActionRepairDescriptionFormGroup.get('repairWidth').valueChanges.debounceTime(1000).subscribe(v =>
      this.correctiveActionRepairDescriptionFormGroup.get('repairWidth').setValue(Math.round(v))
    ));


  }


  ngOnDestroy() {
    super.ngOnDestroy();
  }

}