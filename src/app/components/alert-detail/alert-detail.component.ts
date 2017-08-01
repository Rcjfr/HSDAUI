import { Component, OnInit, ViewContainerRef, OnDestroy, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ConfirmComponent } from '../../common/components/confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';

@Component({
  selector: 'aa-alert-detail',
  templateUrl: './alert-detail.component.html',
  styleUrls: ['./alert-detail.component.less'],
  providers: []
})
export class AlertDetailComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
  sda$: Observable<models.ISda>;
  currentSdaId = 0;
  newSdaSubscription: Subscription;
  savedStateSubscription: Subscription;
  loading$: Observable<boolean>;
  @ViewChild(AlertDetailViewComponent) alertDetailView: AlertDetailViewComponent
  constructor(private appStateService: AppStateService,
    private vcr: ViewContainerRef,
    private toastr: ToastsManager,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.alertDetailView.sdaForm.dirty;
  }

  ngOnInit(): void {
    //
    this.loading$ = this.appStateService.getSelectedAlertLoading();
    this.loadSda();
    this.newSdaSubscription = this.appStateService.getLoadNewSdaState().subscribe(() => {
      if (this.currentSdaId > 0) {
        return;
      }
      if (this.currentSdaId === 0 && !this.canDeactivate()) {
        this.dialogService.addDialog(ConfirmComponent, {
          title: 'Confirm?',
          message: 'WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.'
        }).subscribe((result) => {
          if (result === true) {
            this.appStateService.loadSda(this.currentSdaId);
            this.alertDetailView.clearForm();
          }
        });
      }

    });
    this.savedStateSubscription =  this.appStateService.getSelectedAlertSavedState().subscribe((savedState) => {
      if (savedState) {
        this.toastr.success('SDA Details saved successfully.', 'Success');
        this.alertDetailView.clearForm();
        if (savedState.sdaId !== this.currentSdaId) { //must be newly created sda
          this.router.navigate(['/alerts', savedState.sdaId]);
        } else {
          this.appStateService.loadSda(this.currentSdaId);
        }
      }
    });
    this.appStateService.loadNoseNumbers('');
    this.route.params.select<string>('id').subscribe(id => {
      if (id !== 'new') {
        this.currentSdaId = Number.parseInt(id);
      } else {
        this.currentSdaId = 0;
      }
      this.alertDetailView.clearForm();
      this.appStateService.loadSda(this.currentSdaId);
    });
  }
  loadSda() {
    this.sda$ = this.appStateService.getSelectedSda().map(d => d && d.toJS());
  }
  resetSda() {
    this.alertDetailView.clearForm();
    this.loadSda();
  }
  ngOnDestroy() {
    this.newSdaSubscription && this.newSdaSubscription.unsubscribe();
    this.savedStateSubscription && this.savedStateSubscription.unsubscribe();
  }
}
