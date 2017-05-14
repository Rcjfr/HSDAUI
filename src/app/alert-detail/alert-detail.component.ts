import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ATACodesService } from '../common/services/ata-codes.service';
import { Observable } from 'rxjs/Observable';
import { ATACode } from '../common/models/ata-code.model';
import { Alert } from '../common/models/alert.model';
import { ICheckboxState } from '../common/directives/checkbox/checkbox.interfaces';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { AircraftService } from '../common/services/aircraft.service';
import * as fromRoot from '../common/reducers';
import { AppStore } from '../common/store/app-store';
import * as selectedAlert from '../common/actions/selected-alert';
import '@ngrx/core/add/operator/select';
import { List } from 'immutable';
import { Subscription } from 'rxjs/Subscription';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CheckTypesService } from '../common/services/check-types.service';
import { FleetCheckType, CheckType } from '../common/models/check-type.model';

function validateScheduledMaintenanceFields(c: AbstractControl): { [key: string]: boolean } | null {
    const routineNoControl = c.get('routineNo');
    const nonRoutineNoControl = c.get('nonRoutineNo');

    if (nonRoutineNoControl.value || routineNoControl.value) {

        return null;
    }
    return { 'atleastone': true };
}
function validateUnscheduledMaintenanceFields(c: AbstractControl): { [key: string]: boolean } | null {
    const micNoControl = c.get('micNo');
    const nonRoutineNoControl = c.get('nonRoutineNo');
    if (micNoControl.value || nonRoutineNoControl.value) {
        return null;
    }
    return { 'atleastone': true };
}

@Component({
    selector: 'app-alert-detail',
    templateUrl: './alert-detail.component.html',
    styleUrls: ['./alert-detail.component.less'],
    providers: []
})
export class AlertDetailComponent implements OnInit, OnDestroy {
    sdaForm: FormGroup;
    fleetCheckTypes$: Observable<CheckType[]>;
    checkTypes$: Observable<FleetCheckType[]>;
    ataCodes$: Observable<Array<ATACode>>;
    ataCode2s$: Observable<Array<ATACode>>;
    alert: Alert;
    loading$: Observable<boolean>;
    lineMaintenance: ICheckboxState = { isChecked: false };
    lineMaintenanceLabel = 'Line Maintenance';
    noseNumbers$: Observable<Array<string>>;
    actionsSubscription$: Subscription;
    alertSubscription$: Subscription;
    showErrors = false;
    unscheduledFieldsInvalid = false;
    scheduledFieldsInvalid = false;

    constructor(private ataCodesService: ATACodesService, private checkTypesService: CheckTypesService, private store: Store<AppStore>,
        private vcr: ViewContainerRef, private toastr: ToastsManager, private fb: FormBuilder) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit(): void {

        this.sdaForm = this.fb.group({
            sdaId: '',
            sdrNumber: ['', [Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]+')]],
            createDate: [new Date(), [Validators.required]],
            lineMaintenance: false,
            alertCode: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            ataCode1: ['', Validators.required],
            ataCode2: ['', Validators.required],
            aircraftNo: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('[a-zA-Z0-9]+')]],
            station: [
                '', [
                    Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('[a-zA-Z]+')
                ]
            ],
            department: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            manufacturer: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.maxLength(100)]],
            model: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.maxLength(15)]],
            serialNo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.maxLength(10)]],
            totalShipTime: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(25)]],
            cycles: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(25)]],
            fleet: ['', [Validators.required, Validators.maxLength(20)]],
            defectDiscoveredDuring: [null, Validators.required],
            scheduledMaintenanceGroup: this.fb.group({
                checkType: [''],
                nonRoutineNo: [''],
                routineNo: ['']
            },
                { validator: validateScheduledMaintenanceFields }),
            unscheduledMaintenanceGroup: this.fb.group({
                description: [''],
                nonRoutineNo: [''],
                micNo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]]
            },
                { validator: validateUnscheduledMaintenanceFields })



        });
        this.sdaForm.get('defectDiscoveredDuring').valueChanges
            .subscribe(val => this.setDefectDetectedFields(val));

        this.ataCodes$ = this.ataCodesService.getATACodes();
        this.checkTypes$ = this.checkTypesService.getCheckTypes();
        this.alertSubscription$ = this.store.select(fromRoot.getSelectedAlert).map(d => d && d.toJS()).subscribe((s: Alert) => this.alert = s);
        this.loading$ = this.store.select(fromRoot.getSelectedAlertLoading);
        this.noseNumbers$ = this.store.select(fromRoot.getSelectedAlertNoseNumbers).map(d => d && d.toJS());
        this.actionsSubscription$ = this.store.select(fromRoot.getSelectedAlertAircraftInfo).subscribe(aircraftInfo => {
            this.alert.manufacturer = aircraftInfo.manufacturer;
            this.alert.model = aircraftInfo.model;
            this.alert.serialNo = aircraftInfo.serialNo;
            this.alert.totalShipTime = aircraftInfo.totalShipTime;
            this.alert.fleet = aircraftInfo.fleet;
            this.alert.cycles = aircraftInfo.cycles;
        });
        this.store.dispatch(new selectedAlert.LoadNoseNumbersAction(''));
    }
    ngOnDestroy() {
        // tslint:disable-next-line:no-unused-expression
        this.actionsSubscription$ && this.actionsSubscription$.unsubscribe();
        // tslint:disable-next-line:no-unused-expression
        this.alertSubscription$ && this.alertSubscription$.unsubscribe();
    }
    getAlertCode2s(alertCode1: string) {
        this.alert.ataCode2 = '';
        this.sdaForm.get('ataCode2').setValue("");

        this.ataCode2s$ = this.ataCodes$.map(a => a.find(b => b.Code === alertCode1).SecondaryCodes);
        //  this.ataCode2s$ = this.ataCodes$.map(a =>
        //  {
        //    const dd = a.filter(function(b)
        //    {
        //      console.log(b.Code, alertCode1,b.Code.length,alertCode1.length);
        //      return  b.Code.trim() === alertCode1.trim();
        //     } )[0];
        //    console.log('filtered', dd);
        //    return dd.Codes.map(c => c.Code);
        // });
    }
    noseNumberOnSelect(e: TypeaheadMatch) {
        // console.log('Selected value: ', e.value);
        this.populateAircraftInfo(e.value);
    }
    populateAircraftInfo(noseNumber: string) {
        if (noseNumber) {
            this.store.dispatch(new selectedAlert.LoadAircraftInfoAction(noseNumber));
        }
    }
    populateCheckTypes() {
        this.fleetCheckTypes$ = this.checkTypes$.map(a => a.find(b => b.Fleet === this.alert.fleet).CheckTypes);
    }
    setDefectDetectedFields(defectDiscoveredDuring: number): void {
        const scheduledGroup = this.sdaForm.get('scheduledMaintenanceGroup');
        const unscheduledGroup = this.sdaForm.get('unscheduledMaintenanceGroup');
        if (defectDiscoveredDuring == 1) {
            unscheduledGroup.clearValidators();
            unscheduledGroup.get("description").clearValidators();
            unscheduledGroup.get("micNo").clearValidators();
            unscheduledGroup.get("nonRoutineNo").clearValidators();

            scheduledGroup.setValidators(validateScheduledMaintenanceFields);
            scheduledGroup.get("checkType").setValidators([Validators.required]);
            scheduledGroup.get("routineNo").setValidators([Validators.pattern('[a-zA-Z0-9]+')]);
            scheduledGroup.get("nonRoutineNo").setValidators([Validators.pattern('[a-zA-Z0-9]+')]);
        } else {
            scheduledGroup.clearValidators();
            scheduledGroup.get("checkType").clearValidators();
            scheduledGroup.get("routineNo").clearValidators();
            scheduledGroup.get("nonRoutineNo").clearValidators();
            unscheduledGroup.setValidators(validateUnscheduledMaintenanceFields);
            unscheduledGroup.get("description").setValidators([Validators.required]);
            unscheduledGroup.get("micNo").setValidators([Validators.pattern('[a-zA-Z0-9]+')]);
            unscheduledGroup.get("nonRoutineNo").setValidators([Validators.pattern('[a-zA-Z0-9]+'), Validators.maxLength(50)]);
        }
        scheduledGroup.updateValueAndValidity();
        unscheduledGroup.updateValueAndValidity();
        scheduledGroup.get("checkType").updateValueAndValidity();
        scheduledGroup.get('routineNo').updateValueAndValidity();
        scheduledGroup.get('nonRoutineNo').updateValueAndValidity();
        unscheduledGroup.get('description').updateValueAndValidity();
        unscheduledGroup.get('micNo').updateValueAndValidity();
        unscheduledGroup.get('nonRoutineNo').updateValueAndValidity();
    }
    saveAlert() {
        this.showErrors = !this.sdaForm.valid;
        if (this.showErrors) { return; }
        this.toastr.success('Details entered are valid', 'Success');
    }

}
