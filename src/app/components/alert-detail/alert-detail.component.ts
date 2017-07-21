import { Component, OnInit, ViewContainerRef, OnDestroy, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, ValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import * as models from '../../common/models';
import { List } from 'immutable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import '../../common/rxjs-extensions';
import { of } from 'rxjs/observable/of';
import { AppStateService } from '../../common/services';
import { Subscription } from 'rxjs/Rx';
import '@ngrx/core/add/operator/select';
import { ComponentCanDeactivate } from '../../common/components/pending-changes.guard';
import { AlertDetailViewComponent } from '../alert-detail-view/alert-detail-view.component';
@Component({
  selector: 'aa-alert-detail',
  templateUrl: './alert-detail.component.html',
  styleUrls: ['./alert-detail.component.less'],
  providers: []
})
export class AlertDetailComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
  sda$: Observable<models.ISda>;
  actionsSubscription: Subscription;
  loading$: Observable<boolean>;
  @ViewChild(AlertDetailViewComponent) alertDetailView: AlertDetailViewComponent
  constructor(private appStateService: AppStateService,
    private vcr: ViewContainerRef,
    private toastr: ToastsManager,
    private route: ActivatedRoute,

  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.alertDetailView.sdaForm.dirty;
  }
  ngOnInit(): void {
    this.loadSda();
    this.loading$ = this.appStateService.getSelectedAlertLoading();
    this.appStateService.loadNoseNumbers('');
    this.actionsSubscription = this.route.params.select<string>('id').subscribe(id => {
      let sdaId = 0;
      if (id !== 'new') {
        sdaId = Number.parseInt(id);
      } else {
        this.loadSda();
      }
      this.appStateService.loadSda(sdaId);
    });
  }
  loadSda() {
    this.sda$ = this.appStateService.getSelectedSda().map(d => d && d.toJS());
  }
  ngOnDestroy() {
    this.actionsSubscription && this.actionsSubscription.unsubscribe();
  }
}
