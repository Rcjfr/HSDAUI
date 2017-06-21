import { Component, OnInit, Input, ElementRef, ViewChildren, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent } from '../base-form.component';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import {decimalsNumberMask} from '../../common/masks';
import * as models from '../../common/models';
import { AppStateService } from '../../common/services';

@Component({
  selector: 'app-corrective-action-repair-description',
  templateUrl: './corrective-action-repair-description.component.html',
  styleUrls: ['./corrective-action-repair-description.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorrectiveActionRepairDescriptionComponent extends BaseFormComponent implements OnDestroy {
    correctiveActionRepairDescriptionFormGroup: FormGroup;
    repairDescriptions$: Observable<List<models.IRepairDescription>>;
    repairDocuments$:Observable<List<models.IRepairDocument>>;
  decimalsNumberMask = decimalsNumberMask;
  constructor(private fb: FormBuilder, private appStateService: AppStateService  ) {
    super('correctiveActionRepairDescriptionFormGroup');
  }
  
  ngOnInit() {
      this.repairDescriptions$ = this.appStateService.getRepairedDescribe();
      this.repairDocuments$ = this.appStateService.getRepairDocument();
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