﻿import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import * as models from '../../common/models';
import { List } from 'immutable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import '../../common/rxjs-extensions';
import { of } from 'rxjs/observable/of';
import { AppStateService } from '../../common/services';
import { Subscription } from "rxjs/Rx";
import '@ngrx/core/add/operator/select';
@Component({
  selector: 'aa-alert-detail',
  templateUrl: './alert-detail.component.html',
  styleUrls: ['./alert-detail.component.less'],
  providers: []
})
export class AlertDetailComponent implements OnInit, OnDestroy {
  alert$: Observable<models.ISda>;
  actionsSubscription: Subscription;
  loading$: Observable<boolean>;
  constructor(private appStateService: AppStateService,
    private vcr: ViewContainerRef,
    private toastr: ToastsManager,
    private route: ActivatedRoute,

  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit(): void {
    this.alert$ = this.appStateService.getSelectedSda(); // .map(d => d && d.toJS());// .subscribe((s: Alert) => this.alert = s);
    this.loading$ = this.appStateService.getSelectedAlertLoading();
    this.appStateService.loadNoseNumbers('');
    this.actionsSubscription = this.route.params.select<string>('id').subscribe(id => {
      if (id !== "new") {
        let sdaId = Number.parseInt(id);
        this.appStateService.loadSDA(sdaId);
      }
    });
  }
  ngOnDestroy() {
    this.actionsSubscription && this.actionsSubscription.unsubscribe();
  }
}
