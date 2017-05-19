import { Component, OnInit, OnDestroy, ViewContainerRef, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidatorFn, AbstractControl } from '@angular/forms';
import { GenericValidator, Expressions } from '../common/validators/generic-validator';
import { CustomValidators } from '../common/validators/custom-validators';
import { ATACodesService } from '../common/services/ata-codes.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CheckTypesService } from '../common/services/check-types.service';
import { FleetCheckType, CheckType } from '../common/models/check-type.model';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { of } from "rxjs/observable/of";

@Component({
    selector: 'app-alert-detail',
    templateUrl: './alert-detail.component.html',
    styleUrls: ['./alert-detail.component.less'],
    providers: []
})
export class AlertDetailComponent implements OnInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    sdaForm: FormGroup;
    fleetCheckTypes$: Observable<CheckType[]>;
    checkTypes$: Observable<FleetCheckType[]>;
    ataCodes$: Observable<ATACode[]>;
    ataCode2s$: Observable<ATACode[]>;
    alert: Alert;
    loading$: Observable<boolean>;
    lineMaintenance: ICheckboxState = { isChecked: false };
    lineMaintenanceLabel = 'Line Maintenance';
    noseNumbers$: Observable<string[]>;
    actionsSubscription$: Subscription;
    alertSubscription$: Subscription;
    showErrors = false;
    unscheduledFieldsInvalid = false;
    scheduledFieldsInvalid = false;
   
    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;


    constructor(private ataCodesService: ATACodesService, private checkTypesService: CheckTypesService, private store: Store<AppStore>,
        private vcr: ViewContainerRef, private toastr: ToastsManager, private fb: FormBuilder) {
        this.toastr.setRootViewContainerRef(vcr);
        // Defines all of the validation messages for the form.
        // TODO:Move to seperate JSON file.
        this.validationMessages = {
            sdrNumber: {
                pattern: 'SDR Number must be alphanumeric.'
            },
            createDate: {
                required: 'Create Date is required.'
            },
            alertCode: {
                required: 'Alert Code is required.'
            },
            station: {
                required: 'Station is required.',
                minlength: 'Station must be 3 characters.',
                pattern: 'Station must contain only alphabet characters.'
            },
            ataCode1: {
                required: 'ATA Code 1 is required.'
            },
            ataCode2: {
                required: 'ATA Code 2 is required.'
            },
            department: {
                required: 'Department is required.'
            },
            aircraftNo: {
                required: 'Aircraft # is required.',
                pattern: 'Aircraft # must be alphanumeric.'
            },
            manufacturer: {
                required: 'Manufacturer is required.',
                pattern: 'Manufacturer must be alphanumeric.'
            },
            model: {
                required: 'Aircraft Model/Series is required.',
                pattern: 'Aircraft Model/Series must be alphanumeric.'
            },
            serialNo: {
                required: 'Serial # is required.',
                pattern: 'Serial # must be alphanumeric.'
            },
            totalShipTime: {
                required: 'Total Ship Time is required.',
                pattern: 'Total Ship Time must be numeric.'
            },
            cycles: {
                required: 'Cycles is required.',
                pattern: 'Cycles must be numeric.'
            },
            fleet: {
                required: 'Fleet is required.'
            },
            defectDiscoveredDuring: {
                required: 'Defect Discovered during is required.'
            },
            unscheduledMaintenanceGroup: {
                atleastone: 'Non-Routine # or MIC # is required.'
            },
            scheduledMaintenanceGroup: {
                atleastone: 'Routine # or Non-Routine # is required.'
            },
            'unscheduledMaintenanceGroup.description': {
                required:'Description is required for unscheduled maintenance.'
            },
            'unscheduledMaintenanceGroup.nonRoutineNo': {
                pattern: 'Non Routine # must contain only alphanumerics.'
            },
            'unscheduledMaintenanceGroup.micNo': {
                pattern: 'MIC # must contain only alphanumerics.'
            },
            'scheduledMaintenanceGroup.checkType': {
                required: 'Check Type is required.'
            },
            'scheduledMaintenanceGroup.routineNo': {
                pattern: 'Routine # must contain only alphanumerics.'
            },
            'scheduledMaintenanceGroup.nonRoutineNo': {
              pattern: 'Non Routine # must contain only alphanumerics.'
            },
            defectType: {
                required: 'Defect Type is required.',
                maxlength: 'Defect Type must be not more than 250 characters.'
            },
            defectDescription: {
                required: 'Defect Description is required.',
                maxlength: 'Defect Description must be not more than 250 characters.'
            },
            length: {
                required: 'Length  is required.',
                maxlength: 'Length must be 3X3.',
                pattern: 'Length  must be a Decmial .'
            },
            width: {
                required: 'Width is required.',
                maxlength: 'Width must be 3X3.',
                pattern: 'Width must be Decmial.'
            },
            depth: {
                required: 'Depth is required.',
                maxlength: 'Depth must be 3X4.',
                pattern: 'Depth must be numeric.'
            },


            percisionLocationGroup: {
                aleasttwo: 'station or stringer or wl or bl  is required.'
            },
           
            'percisionLocationGroup.stationLocation': {

                pattern: 'station must be alphanumeric.',
                maxlength: 'station must not be more than 25 characters.'
            },
            'percisionLocationGroup.stringer': {

                pattern: 'stringer must be alphanumeric.',
                maxlength: 'stringer must not be more than 25 characters.'
            },
             'percisionLocationGroup.wl': {

                 pattern: 'wl must be alphanumeric.',
                 maxlength: 'wl must not be more than 25 characters.'
            },
             'percisionLocationGroup.bl': {

                 pattern: 'bl must be alphanumeric.',
                 maxlength: 'bl must not be more than 25 characters.'
            }
            ,
            MFGpart: {

                pattern: 'MFG Part must be alphanumeric.',
                maxlength: 'MFG Part must not be more than 50 characters.'
            }
            ,
            partDefective: {
                required: 'Part Defective is required.',
                maxlength: 'Part Defective must not be more than 50 characters.',
                pattern: 'Part Defective must be alphanumeric.'
            }
            ,
            MFGserial: {

                pattern: 'MFG Serial must be alphanumeric.',
                maxlength: 'MFG Serial must not be more than 50 characters.'
            },
            PartTT: {

                pattern: 'Part TT must be numeric.',
                maxlength: 'Part TT must be not more that 25 numbers.',
            },
            PartTso: {

                pattern: 'Part TSO must be numeric.',
                maxlength: 'Part TSO must be not more that 25 numbers.',
            },
            detected: {
                required: 'How Detected is required.',
                
            }
        };
        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);

    }
    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
      console.log(this.formInputElements.length);
        let controlBlurs: Observable<any>[] = this.formInputElements
          .map((formControl: ElementRef) => {
              //console.log(new Date(),formControl.nativeElement.id);
            return Observable.fromEvent(formControl.nativeElement, 'blur');
            }
          );

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.sdaForm.valueChanges.debounceTime(1000), ...controlBlurs)
            //.debounceTime(800)
            .subscribe(value => {this.displayMessage = this.genericValidator.processMessages(this.sdaForm);});
    }
    ngOnInit(): void {

        const defectDiscoveredDuring = this.fb.control(null, Validators.required);
        this.sdaForm = this.fb.group({
          sdaId: new FormControl({ value: '', disabled: true }),
            sdrNumber: ['', [Validators.maxLength(20), Validators.pattern(Expressions.Alphanumerics)]],
            createDate: [new Date(), [Validators.required]],
            lineMaintenance: false,
            alertCode: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics)]],
            ataCode1: ['', Validators.required],
            ataCode2: ['', Validators.required],
            aircraftNo: ['', [Validators.required, Validators.maxLength(5), Validators.pattern(Expressions.Alphanumerics)]],
            station: [
                '', [
                    Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern(Expressions.Alphabets)
                ]
            ],
            department: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics)]],
            manufacturer: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(100)]],
            model: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(15)]],
            serialNo: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(10)]],
            totalShipTime: ['', [Validators.required, Validators.pattern(Expressions.Numerics), Validators.maxLength(25)]],
            cycles: ['', [Validators.required, Validators.pattern(Expressions.Numerics), Validators.maxLength(25)]],
            fleet: ['', [Validators.required, Validators.maxLength(20)]],
            defectDiscoveredDuring: defectDiscoveredDuring,
          scheduledMaintenanceGroup: this.fb.group({
                checkType: ['', []],
                nonRoutineNo: ['', [Validators.pattern(Expressions.Alphanumerics)]],
                routineNo: ['', [Validators.pattern(Expressions.Alphanumerics)]]
            },
              {
                 validator: CustomValidators.validateScheduledMaintenanceFields
              }
            ),
          unscheduledMaintenanceGroup: this.fb.group({
                description: ['', []],
                nonRoutineNo: ['', [Validators.pattern(Expressions.Alphanumerics)]],
                micNo: ['', [Validators.pattern(Expressions.Alphanumerics)]]
            },
              {
                 validator: CustomValidators.validateUnscheduledMaintenanceFields
              }
            ),
          defectType: ['', [Validators.required, Validators.maxLength(25)]],
          defectDescription: ['', [Validators.required,  Validators.maxLength(25)]],
          length: ['', [Validators.required, Validators.pattern(Expressions.ThreeDecimalsPoints),  Validators.maxLength(25)]],
          width: ['', [Validators.required, Validators.maxLength(6)]],
          depth: ['', [Validators.required, Validators.maxLength(7)]],
         // stationLocation: ['', [Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(25)]],
          //stringer: ['', [Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(25)]],
          //wl: ['', [Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(25)]],
          //bl: ['', [Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(25)]],
          percisionLocationGroup: this.fb.group({
              stationLocation: ['', [Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(25)]],
              stringer: ['', [ Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(25)]],
              wl: ['', [ Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(25)]],
              bl: ['', [ Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(25)]],
          },

              {
                  validator: CustomValidators.ValidatePercisionLocationGroupFields
              }
          
              ),
          MFGpart: ['', [ Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(50)]],
          partDefective: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(50)]],
          MFGserial: ['', [ Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(50)]],
          PartTT: ['', [Validators.required, Validators.pattern(Expressions.Numerics), Validators.maxLength(25)]],
          PartTso: ['', [Validators.required, Validators.pattern(Expressions.Numerics), Validators.maxLength(25)]],
          detected: ['', [Validators.required, Validators.pattern(Expressions.Alphanumerics)]]
        

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
        this.ataCode2s$ = <Observable<ATACode[]>>of([]);
        if (!alertCode1) {
            return;
        }
        this.sdaForm.get('ataCode2').setValue('');

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

            scheduledGroup.setValidators(CustomValidators.validateScheduledMaintenanceFields);
            scheduledGroup.get("checkType").setValidators([Validators.required]);
            scheduledGroup.get("routineNo").setValidators([Validators.pattern(Expressions.Alphanumerics)]);
            scheduledGroup.get("nonRoutineNo").setValidators([Validators.pattern(Expressions.Alphanumerics)]);
        } else {
            scheduledGroup.clearValidators();
            scheduledGroup.get('checkType').clearValidators();
            scheduledGroup.get('routineNo').clearValidators();
            scheduledGroup.get('nonRoutineNo').clearValidators();
            unscheduledGroup.setValidators(CustomValidators.validateUnscheduledMaintenanceFields);
            unscheduledGroup.get('description').setValidators([Validators.required]);
            unscheduledGroup.get('micNo').setValidators([Validators.pattern(Expressions.Alphanumerics)]);
            unscheduledGroup.get('nonRoutineNo').setValidators([Validators.pattern(Expressions.Alphanumerics), Validators.maxLength(50)]);
        }
        scheduledGroup.updateValueAndValidity();
        unscheduledGroup.updateValueAndValidity();
        scheduledGroup.get('checkType').updateValueAndValidity();
        scheduledGroup.get('routineNo').updateValueAndValidity();
        scheduledGroup.get('nonRoutineNo').updateValueAndValidity();
        unscheduledGroup.get('description').updateValueAndValidity();
        unscheduledGroup.get('micNo').updateValueAndValidity();
        unscheduledGroup.get('nonRoutineNo').updateValueAndValidity();
    }
    saveAlert() {
        this.genericValidator.formSubmitted = true;
        this.displayMessage = this.genericValidator.processMessages(this.sdaForm);
        console.log(this.displayMessage);
        if (!this.sdaForm.valid) { return; }
        this.toastr.success('Details entered are valid', 'Success');
    }

}
