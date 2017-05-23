import { Component, OnInit, OnDestroy, ViewContainerRef, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidatorFn, AbstractControl } from '@angular/forms';

import { ATACodesService } from '../../common/services/ata-codes.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ATACode } from '../../common/models/ata-code.model';
import { Alert } from '../../common/models/alert.model';
import { IStation } from '../../common/models/station.model';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { AircraftService } from '../../common/services/aircraft.service';
import { StationService } from '../../common/services/station.service';
import * as fromRoot from '../../common/reducers';
import { AppStore } from '../../common/store/app-store';
import * as selectedAlert from '../../common/actions/selected-alert';
import '@ngrx/core/add/operator/select';
import { List } from 'immutable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CheckTypesService } from '../../common/services/check-types.service';
import { FleetCheckType, CheckType } from '../../common/models/check-type.model';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import '../../common/rxjs-extensions';
import { of } from 'rxjs/observable/of';
import { AircraftInfo } from '../../common/models/aircraft-info.model';

@Component({
    selector: 'app-alert-detail',
    templateUrl: './alert-detail.component.html',
    styleUrls: ['./alert-detail.component.less'],
    providers: []
})
export class AlertDetailComponent implements OnInit, OnDestroy {

    fleetCheckTypes$: Observable<CheckType[]>;
    checkTypes$: Observable<FleetCheckType[]>;
    stations: IStation[];
    alert$: Observable<Alert>;
    loading$: Observable<boolean>;

    noseNumbers$: Observable<string[]>;
    actionsSubscription$: Subscription;
    alertSubscription$: Subscription;
    stationsSubscription$: Subscription;
    showErrors = false;
    unscheduledFieldsInvalid = false;
    scheduledFieldsInvalid = false;
    createNumberMask = createNumberMask;
    private measurementNumberMask = createNumberMask({
      prefix: '',
      allowDecimal: true,
      includeThousandsSeparator: false,
      decimalLimit: 3,
      integerLimit: 3,
      requireDecimal: false
    });
    private decimalNumberMask = createNumberMask({
                          prefix:'',
                          allowDecimal: true,
                          includeThousandsSeparator:false,
                          decimalLimit: 2,
                          requireDecimal:false
    });
  private numberMask = createNumberMask({
    prefix: '',
    allowDecimal: false,
    includeThousandsSeparator: false,
    allowLeadingZeroes:false
  });
    constructor(private ataCodesService: ATACodesService,
                private checkTypesService: CheckTypesService,
                private stationService: StationService,
                private store: Store<AppStore>,
                private vcr: ViewContainerRef,
                private toastr: ToastsManager,
                private fb: FormBuilder) {
        this.toastr.setRootViewContainerRef(vcr);
        // TODO:Move to seperate JSON file.

        // Define an instance of the validator for use with this form,
        // passing in this form's set of validation messages.

    }

    ngOnInit(): void {
        this.alert$ = this.store.select(fromRoot.getSelectedAlert); // .map(d => d && d.toJS());// .subscribe((s: Alert) => this.alert = s);
        this.loading$ = this.store.select(fromRoot.getSelectedAlertLoading);
        // this.noseNumbers$ = this.store.select(fromRoot.getSelectedAlertNoseNumbers).map(d => d && d.toJS());
        // this.aircraftInfo$ = this.store.select(fromRoot.getSelectedAlertAircraftInfo).map(d => d && <AircraftInfo>d.toJS());
        // .subscribe(aircraftInfo => {
        //     this.alert.manufacturer = aircraftInfo.manufacturer;
        //     this.alert.model = aircraftInfo.model;
        //     this.alert.serialNo = aircraftInfo.serialNo;
        //     this.alert.totalShipTime = aircraftInfo.totalShipTime;
        //     this.alert.fleet = aircraftInfo.fleet;
        //     this.alert.cycles = aircraftInfo.cycles;
        // });
        this.store.dispatch(new selectedAlert.LoadNoseNumbersAction(''));
    }
    ngOnDestroy() {

    }






}
