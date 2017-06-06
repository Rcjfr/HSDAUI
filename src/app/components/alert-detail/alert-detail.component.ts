import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import * as models from '../../common/models';
import { List } from 'immutable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import '../../common/rxjs-extensions';
import { of } from 'rxjs/observable/of';
import { AppStateService } from '../../common/services';
@Component({
    selector: 'app-alert-detail',
    templateUrl: './alert-detail.component.html',
    styleUrls: ['./alert-detail.component.less'],
    providers: []
})
export class AlertDetailComponent implements OnInit {
    alert$: Observable<models.Alert>;
    loading$: Observable<boolean>;
    constructor(private appStateService: AppStateService,
                private vcr: ViewContainerRef,
                private toastr: ToastsManager,
                ) {
        this.toastr.setRootViewContainerRef(vcr);
    }
    ngOnInit(): void {
        this.alert$ = this.appStateService.getSelectedAlert(); // .map(d => d && d.toJS());// .subscribe((s: Alert) => this.alert = s);
        this.loading$ = this.appStateService.getSelectedAlertLoading();
        this.appStateService.loadNoseNumbers('');
        this.appStateService.loadLookupData();


    }
}
