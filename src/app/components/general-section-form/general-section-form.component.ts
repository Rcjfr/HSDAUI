import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent } from '../base-form.component';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '../../common/models';
import { AppStateService } from '../../common/services';
import { Observer } from "rxjs/Rx";
@Component({
  selector: 'app-general-section-form',
  templateUrl: './general-section-form.component.html',
  styleUrls: ['./general-section-form.component.less']
})
export class GeneralSectionFormComponent extends BaseFormComponent implements OnInit {
  departments$: Observable<List<models.IDepartment>>;
  stations$: Observable<models.IStation[]>;
  generalSectionFormGroup: FormGroup;
  aircraftInfo$: Observable<models.IAircraftInfo>;
  alertCodes$: Observable<List<models.IAlertCode>>;
  ATACodes$: Observable<List<models.IATACode>>;
  constructor(private fb: FormBuilder, private appStateService: AppStateService) {
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
    this.alertCodes$ = this.appStateService.getAlertCodes(); // .map(d => d && d.toJS());
    this.ATACodes$ = this.appStateService.getATACodes().map(d => d && d.toJS());
    this.departments$ = this.appStateService.getDepartments();

    this.aircraftInfo$ = this.appStateService.getAircraftInfo();
    
    this.stations$ = Observable.create((observer: Observer<string>) => {
        observer.next(this.generalSectionFormGroup.get('station').value);
      })
      .switchMap(token => this.appStateService.getStations(token))
      .do(d=>console.log(d))
      ;

  }
  populateAircraftInfo(noseNumber: string) {
    this.appStateService.loadAircraftInfo(noseNumber);
  }
}
