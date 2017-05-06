import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';

import { ATACodesService } from '../common/services/ata-codes.service';
import { Observable } from 'rxjs/Observable';
import { ATACode } from '../common/models/ata-code.model';
import { Alert } from '../common/models/alert.model';
import { ICheckboxState } from '../common/directives/checkbox/checkbox.interfaces';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { AircraftService } from '../common/services/aircraft.service';
import * as fromRoot from '../common/reducers';
import {AppStore} from '../common/store/app-store';
import * as selectedAlert from '../common/actions/selected-alert';
import '@ngrx/core/add/operator/select';
import { List } from 'immutable';
import { Subscription } from 'rxjs/Subscription';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-alert-detail',
  templateUrl: './alert-detail.component.html',
  styleUrls: ['./alert-detail.component.less'],
  providers: []
})
export class AlertDetailComponent implements OnInit, OnDestroy {
ataCodes$: Observable<Array<ATACode>>;
ataCode2s$: Observable<Array<ATACode>>;
alert: Alert;
loading$: Observable<boolean>;
lineMaintenance: ICheckboxState= { isChecked: false };
lineMaintenanceLabel= 'Line Maintenance';
noseNumbers$: Observable<Array<string>>;
actionsSubscription$: Subscription;
alertSubscription$: Subscription;



  constructor(private ataCodesService: ATACodesService, private store: Store<AppStore>,
              private vcr: ViewContainerRef, private toastr: ToastsManager) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.ataCodes$ = this.ataCodesService.getATACodes();
    this.alertSubscription$ = this.store.select(fromRoot.getSelectedAlert).map(d => d && d.toJS()).subscribe((s: Alert) => this.alert = s);
    this.loading$ = this.store.select(fromRoot.getSelectedAlertLoading);
    this.noseNumbers$ = this.store.select(fromRoot.getSelectedAlertNoseNumbers).map(d => d && d.toJS()[0]);
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
     // console.log('alert code1', alertCode1);
    this.alert.ataCode2 = '';
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
      console.log('Selected value: ', e.value);
      this.populateAircraftInfo(e.value);
  }
  populateAircraftInfo(noseNumber: string) {
    this.store.dispatch(new selectedAlert.LoadAircraftInfoAction(noseNumber));
  }

}
