import { Component, OnInit, OnDestroy, ViewContainerRef, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidatorFn, AbstractControl } from '@angular/forms';

import { ATACodesService } from '../../common/services/ata-codes.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Alert } from '../../common/models/alert.model';
import { IStation } from '../../common/models/station.model';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { AircraftService } from '../../common/services/aircraft.service';
import { StationService } from '../../common/services/station.service';
import * as fromRoot from '../../common/reducers';
import { AppStore } from '../../common/store/app-store';
import * as selectedAlert from '../../common/actions/selected-alert';
import * as lookupData from '../../common/actions/lookup-data';
import '@ngrx/core/add/operator/select';
import { List } from 'immutable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import '../../common/rxjs-extensions';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'app-alert-detail',
    templateUrl: './alert-detail.component.html',
    styleUrls: ['./alert-detail.component.less'],
    providers: []
})
export class AlertDetailComponent implements OnInit {
    alert$: Observable<Alert>;
    loading$: Observable<boolean>;
    constructor(private store: Store<AppStore>,
                private vcr: ViewContainerRef,
                private toastr: ToastsManager,
                ) {
        this.toastr.setRootViewContainerRef(vcr);
    }
    ngOnInit(): void {
        this.alert$ = this.store.select(fromRoot.getSelectedAlert); // .map(d => d && d.toJS());// .subscribe((s: Alert) => this.alert = s);
        this.loading$ = this.store.select(fromRoot.getSelectedAlertLoading);
        this.store.dispatch(new selectedAlert.LoadNoseNumbersAction(''));
        this.store.dispatch(new lookupData.LoadLookupDataAction());


    }
}
