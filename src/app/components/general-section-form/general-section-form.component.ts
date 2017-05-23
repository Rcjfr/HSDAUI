import { Component, OnInit, Input, ChangeDetectionStrategy, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { CheckType, FleetCheckType } from '../../common/models/check-type.model';
import { IStation } from '../../common/models/station.model';
import {BaseFormComponent} from '../base-form.component';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-general-section-form',
  templateUrl: './general-section-form.component.html',
  styleUrls: ['./general-section-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralSectionFormComponent extends BaseFormComponent {
  @Input() checkTypes: FleetCheckType[];
  @Input() stations: IStation[];
  generalSectionFormGroup: FormGroup;
  fleetCheckTypes: CheckType[];
  constructor( private fb: FormBuilder) {
    super('generalSectionFormGroup');
   }

  ngOnInit() {
   this.generalSectionFormGroup = this.fb.group({
          sdaId: new FormControl({ value: '', disabled: true }),
            sdrNumber: ['', [Validators.maxLength(20), Validators.pattern(Expressions.Alphanumerics)]],
            createDate: [new Date(), [Validators.required]],
            lineMaintenance: false,
            alertCode: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics)]],
            ataCode1: ['', Validators.required],
            ataCode2: ['', Validators.required],

            station: [
                '', [
                    Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern(Expressions.Alphabets)
                ]
            ],
            department: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics)]]

            });
            this.parent.addControl(this.formGroupName, this.generalSectionFormGroup);
}
populateCheckTypes() {
        this.fleetCheckTypes = this.checkTypes.find(b => b.Fleet === this.generalSectionFormGroup.get('fleet').value).CheckTypes;
    }
}
