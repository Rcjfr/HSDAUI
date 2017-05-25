import { Component, OnInit, Input, ChangeDetectionStrategy, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { CheckType, FleetCheckType } from '../../common/models/check-type.model';
import { IStation } from '../../common/models/station.model';
import { BaseFormComponent } from '../base-form.component';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/takeWhile';
import { List } from 'immutable';
import { ATACode } from '../../common/models/ata-code.model';
import { Store } from '@ngrx/store';
import { AppStore } from '../../common/store/app-store';
import * as fromRoot from '../../common/reducers';
import * as selectedAlert from '../../common/actions/selected-alert';
import { AircraftInfo } from '../../common/models/aircraft-info.model';
import { TypeaheadMatch } from "ngx-bootstrap";
@Component({
  selector: 'app-general-section-form',
  templateUrl: './general-section-form.component.html',
  styleUrls: ['./general-section-form.component.less']
})
export class GeneralSectionFormComponent extends BaseFormComponent {
  @Input() checkTypes: FleetCheckType[];
  stations$: Observable<List<IStation>>;
  generalSectionFormGroup: FormGroup;
  fleetCheckTypes: CheckType[];
  aircraftInfo$: Observable<AircraftInfo>;
  ATACodes$: Observable<List<ATACode>>;
  constructor(private fb: FormBuilder, private store: Store<AppStore>) {
    super('generalSectionFormGroup');
  }

  ngOnInit() {
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
      department: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics)]]

    });
    this.parent.addControl(this.formGroupName, this.generalSectionFormGroup);
    this.ATACodes$ = this.store.select(fromRoot.getSelectedAlertATACodes); // .map(d => d && d.toJS());
    this.store.dispatch(new selectedAlert.LoadATACodesAction());
    this.aircraftInfo$ = this.store.select(fromRoot.getSelectedAlertAircraftInfo);
    this.store.dispatch(new selectedAlert.LoadStationsAction());
    this.stations$ = this.store.select(fromRoot.getSelectedAlertStations);
  }
  populateCheckTypes() {
    this.fleetCheckTypes = this.checkTypes.find(b => b.Fleet === this.generalSectionFormGroup.get('fleet').value).CheckTypes;
  }
  stationOnSelect(e: TypeaheadMatch) {
    //this.generalSectionFormGroup.get('station').
    //this.generalSectionFormGroup.get('station').updateValueAndValidity();
    // this.generalSectionFormGroup.get('station').markAsPristine();
    // this.generalSectionFormGroup.get('station').markAsUntouched();
    //console.log(this.generalSectionFormGroup.get('station').valid,this.generalSectionFormGroup.get('station').dirty);
  }
  populateAircraftInfo(noseNumber: string) {
    if (!noseNumber) { return; }
    this.store.dispatch(new selectedAlert.LoadAircraftInfoAction(noseNumber));
  }
}
