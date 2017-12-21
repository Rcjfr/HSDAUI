import { of } from 'rxjs/observable/of';
import { observable } from 'rxjs/symbol/observable';
//import { delay } from 'rxjs/operators';
import { setTimeout } from 'timers';
import { DialogModule } from 'primeng/primeng';
import { debug } from 'util';
import { Observable } from 'rxjs/Rx';
import { Ptor } from 'protractor/built/ptor';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { AlertDetailViewComponent } from '@app/components/alert-detail-view/alert-detail-view.component';
import { CurrentStatusSectionComponent } from '@app/components/sda/current-status-section/current-status-section/current-status-section.component';
import { RepairDetailsSectionComponent } from '@app/components/sda/repair-details-section/repair-details-section/repair-details-section.component';
import { GeneralSectionFormComponent } from '@app/components/sda/general-section/general-section-form/general-section-form.component';
import {ChangeLogModalComponent} from '../change-log-modal/change-log-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgPipesModule } from 'ng-pipes';
import { TextMaskModule } from 'angular2-text-mask';
import { MockAppStateService } from '@app/common/services/mocks/mock-app-state.service';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { TypeaheadModule, AlertModule, ModalModule } from 'ngx-bootstrap';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { AppStateService, UtilityService } from '@app/common/services';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { DefectLocationSectionFormComponent } from '@app/components/sda/defect-location-section/defect-location-section-form/defect-location-section-form.component';
import { CpcpSectionComponent } from '@app/components/sda/cpcp-section/cpcp-section/cpcp-section.component';
import { CorrectiveActionFormGroupComponent } from '@app/components/sda/corrective-action-section/corrective-action-form/corrective-action-form.component';
import { DamageToleranceEvaluationComponent } from '@app/components/sda/damage-tolerance-evaluation-section/damage-tolerance-evaluation/damage-tolerance-evaluation.component';
import { CpcpDispositionSectionComponent } from '@app/components/sda/cpcp-disposition-section/cpcp-disposition-section/cpcp-disposition-section.component';
import { Routes, RouterModule } from '@angular/router';
import { AtaCodeComponent } from '@app/components/sda/general-section/ata-code/ata-code.component';
import { AircraftInfoSectionFormComponent } from '@app/components/sda/general-section/aircraft-info-section-form/aircraft-info-section-form.component';
import {
  DefectDiscoveredDuringSectionFormComponent
} from '@app/components/sda/general-section/defect-discovered-during-section-form/defect-discovered-during-section-form.component';
import { PreciseLocationGroupComponent } from '@app/components/sda/defect-location-section/precise-location-group/precise-location-group.component';

import { CauseOfDamageGroupComponent } from '@app/components/sda/cpcp-section/cause-of-damage-group/cause-of-damage-group.component';
import { CauseOfDamageDescriptionComponent } from '@app/components/sda/cpcp-section/cause-of-damage-description/cause-of-damage-description.component';
import { CorrectiveActionOptionsComponent } from '@app/components/sda/corrective-action-section/corrective-action-options/corrective-action-options.component';
import { DteThresholdItemsArrayComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-threshold-items-array/dte-threshold-items-array.component';
import { DteMonitorItemsArrayComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-monitor-items-array/dte-monitor-items-array.component';
import { FileUploadModule } from 'ng2-file-upload';
import {
  UnscheduledMaintenanceSectionComponent
} from '@app/components/sda/general-section/unscheduled-maintenance-section/unscheduled-maintenance-section.component';

import { ScheduledMaintenanceSectionComponent } from '@app/components/sda/general-section/scheduled-maintenance-section/scheduled-maintenance-section.component';
import {
  CorrectiveActionRepairDescriptionComponent
} from '@app/components/sda/corrective-action-section/corrective-action-repair-description/corrective-action-repair-description.component';
import { ModifiedPartDescriptionComponent } from '@app/components/sda/corrective-action-section/modified-part-description/modified-part-description.component';
import { DefectivePartDescriptionComponent } from '@app/components/sda/corrective-action-section/defective-part-description/defective-part-description.component';
import { DteThresholdItemComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-threshold-item/dte-threshold-item.component';
import { DteMonitorItemComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-monitor-item/dte-monitor-item.component';
import { CorrectiveActionChapComponent } from '@app/components/sda/corrective-action-section/corrective-action-chap/corrective-action-chap.component';
import { RouterTestingModule } from '@angular/router/testing';
import * as services from '@app/common/services';
import { HttpModule } from '@angular/http';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ConfirmComponent } from '@app/common/components/confirm/confirm.component';

describe('AlertDetailViewComponent', () => {
  let component: AlertDetailViewComponent;
  let fixture: ComponentFixture<AlertDetailViewComponent>;
  let dialogService: any;
  let cpcpSectionGroup: any;
  let correctiveActionFormGroup: any;
  let orignalTimeOutInterval: number;
  beforeAll(function (done) {
    orignalTimeOutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 320000;
    done();
  });

  afterAll(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = orignalTimeOutInterval;
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertDetailViewComponent,
        CurrentStatusSectionComponent,
        RepairDetailsSectionComponent,
        GeneralSectionFormComponent,
        DefectLocationSectionFormComponent,
        CpcpSectionComponent,
        CpcpDispositionSectionComponent,
        CorrectiveActionFormGroupComponent,
        DamageToleranceEvaluationComponent,
        AtaCodeComponent,
        ChangeLogModalComponent,
        AircraftInfoSectionFormComponent,
        DefectDiscoveredDuringSectionFormComponent,
        PreciseLocationGroupComponent,
        CauseOfDamageGroupComponent,
        CauseOfDamageDescriptionComponent,
        CorrectiveActionOptionsComponent,
        DteThresholdItemsArrayComponent,
        DteMonitorItemsArrayComponent,
        UnscheduledMaintenanceSectionComponent,
        ScheduledMaintenanceSectionComponent,
        CorrectiveActionRepairDescriptionComponent,
        ModifiedPartDescriptionComponent,
        DefectivePartDescriptionComponent,
        DteThresholdItemComponent,
        DteMonitorItemComponent,
        CorrectiveActionChapComponent,
        ConfirmComponent
      ],
      imports: [
        RouterTestingModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        FormControlsModule,
        FileUploadModule,
        HttpModule,
        ModalModule.forRoot(),
        AlertModule.forRoot(),
        TypeaheadModule.forRoot(),
        ToastrModule.forRoot({
          timeOut: 800,
          progressBar: true,
          onActivateTick: true,
          enableHtml: true,
        }),
        NKDatetimeModule,
        NgPipesModule, TextMaskModule],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }, services.AuthService, DialogService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AlertDetailViewComponent);
    component = fixture.componentInstance;
    component.sda = {
      id: 0, history: [{
        status: 1, versionID: null, statusText: null, statusUpdatedBy: null, statusUpdatedOn: null, version: null, lastModifiedBy: null,
        lastModifiedOn: null
      }], correctiveActionSection: {  },
      generalSection: {}, defectLocationSection: {}, cpcpSection: {}
    };
    //component.sda = {id: 0, correctiveActionSection : {completedBy: null}, generalSection: {}, defectLocationSection: {}, cpcpSection: {} };
    fixture.detectChanges();
    dialogService = fixture.debugElement.injector.get(DialogService);
    cpcpSectionGroup = component.sdaForm.get('cpcpSectionGroup');
    correctiveActionFormGroup = component.sdaForm.get('correctiveActionFormGroup');
  }
  ));

  //TODO: Work on cleaning the objects from memory.
  // afterEach(() => {
  //   fixture.destroy();
  //   fixture = null;
  //   component = null;

  //   dialogService = null;
  //   cpcpSectionGroup.destroy();
  //   correctiveActionFormGroup.destroy();
  //  // spy = null;
  //  delay(1000);
  // });

  it('should create', () => {
    //TODO:work on checking ngonit call also.
    //spyOn(component, 'ngOnInit')//.and.callThrough();
    // fixture.detectChanges();
    // expect(component.ngOnInit).toHaveBeenCalledTimes(1);
    expect(component).toBeTruthy();
  });

  it('should call  confirmDeferralInf when CPCP related event is No', () => {
    cpcpSectionGroup.get('isCPCPRelatedEvent').setValue(false);
    fixture.detectChanges();
    spyOn(component, 'confirmDeferralInf').and.returnValue(Observable.of(false));
    component.confirmInformation(0);
    expect(component.confirmDeferralInf).toHaveBeenCalledTimes(1);
  });

  it('should call  confirmDeferralInf when corrosion level 1 is selected', () => {
    cpcpSectionGroup.get('isCPCPRelatedEvent').setValue(true);
    cpcpSectionGroup.get('corrosionLevel').setValue(1);
    fixture.detectChanges();
    spyOn(dialogService, 'addDialog');
    spyOn(component, 'confirmDeferralInf');
    component.confirmInformation(0);
    expect(dialogService.addDialog).toHaveBeenCalledTimes(0);
    expect(component.confirmDeferralInf).toHaveBeenCalledTimes(1);
  });

  it('should show corrosionLevel 2 dialogue box and cancel is clicked', () => {
    cpcpSectionGroup.get('isCPCPRelatedEvent').setValue(true);
    cpcpSectionGroup.get('corrosionLevel').setValue(2);
    fixture.detectChanges();
    spyOn(dialogService, 'addDialog').and.returnValue(Observable.of(false));
    spyOn(component, 'confirmDeferralInf');
    component.confirmInformation(0);
    expect(dialogService.addDialog).toHaveBeenCalledTimes(1);
    expect(component.confirmDeferralInf).toHaveBeenCalledTimes(0);
  });
  it('should show corrosionLevel 2 dialogue box and OK is clicked', () => {
    cpcpSectionGroup.get('isCPCPRelatedEvent').setValue(true);
    cpcpSectionGroup.get('corrosionLevel').setValue(2);
    fixture.detectChanges();
    spyOn(dialogService, 'addDialog').and.returnValue(Observable.of(true));
    spyOn(component.statusModal, 'show').and.returnValue(Observable.of(false));
    spyOn(component, 'confirmDeferralInf');
    component.confirmInformation(0);
    expect(dialogService.addDialog).toHaveBeenCalledTimes(1);
    expect(component.confirmDeferralInf).toHaveBeenCalledTimes(1);
    expect(component.statusModal.show).toHaveBeenCalledTimes(0);
  });

  it('should show corrosionLevel 3 dialogue box and Yes is clicked and Contact Engineering is Ok', () => {
    cpcpSectionGroup.get('isCPCPRelatedEvent').setValue(true);
    cpcpSectionGroup.get('corrosionLevel').setValue(3);
    fixture.detectChanges();
    spyOn(dialogService, 'addDialog').and.returnValues(Observable.of(true), Observable.of(true));
    spyOn(component, 'confirmDeferralInf');
    component.confirmInformation(0);
    expect(dialogService.addDialog).toHaveBeenCalledTimes(2);
    expect(component.confirmDeferralInf).toHaveBeenCalledTimes(1);
  });

  it('should show corrosionLevel 3 dialogue box and Yes is clicked and Contact Engineering is Cancel', () => {
    cpcpSectionGroup.get('isCPCPRelatedEvent').setValue(true);
    cpcpSectionGroup.get('corrosionLevel').setValue(3);
    fixture.detectChanges();
    spyOn(dialogService, 'addDialog').and.returnValues(Observable.of(true), Observable.of(false));
    spyOn(component, 'confirmDeferralInf');
    component.confirmInformation(0);
    expect(dialogService.addDialog).toHaveBeenCalledTimes(2);
    expect(component.confirmDeferralInf).toHaveBeenCalledTimes(0);
  });

  it('should show differal Information dialogue box and No is clicked', () => {
    correctiveActionFormGroup.get('isDeferred').setValue(false);
    correctiveActionFormGroup.get('isMajorRepair').setValue(true);
    fixture.detectChanges();
    spyOn(dialogService, 'addDialog').and.returnValue(Observable.of(false));
    spyOn(component, 'saveAlert');
    component.confirmDeferralInf(0);
    expect(dialogService.addDialog).toHaveBeenCalledTimes(1);
    expect(component.saveAlert).toHaveBeenCalledTimes(1);
    expect(correctiveActionFormGroup.get('isDeferred').value).toBeFalsy();
  });

  it('should Call  saveAlert without any Confirm box, if isMajorRepair is No', () => {
    correctiveActionFormGroup.get('isMajorRepair').setValue(false);
    fixture.detectChanges();
    spyOn(dialogService, 'addDialog').and.returnValue(Observable.of(false));
    spyOn(component, 'saveAlert');
    component.confirmDeferralInf(0);
    expect(dialogService.addDialog).toHaveBeenCalledTimes(0);
    expect(component.saveAlert).toHaveBeenCalledTimes(1);
  });


  it('should show differal Information dialogue box and No is clicked', () => {
    correctiveActionFormGroup.get('isDeferred').setValue(false);
    correctiveActionFormGroup.get('isMajorRepair').setValue(true);
    fixture.detectChanges();
    spyOn(dialogService, 'addDialog').and.returnValue(Observable.of(false));
    spyOn(component, 'saveAlert');
    component.confirmDeferralInf(0);
    expect(dialogService.addDialog).toHaveBeenCalledTimes(1);
    expect(component.saveAlert).toHaveBeenCalledTimes(1);
    expect(correctiveActionFormGroup.get('isDeferred').value).toBeFalsy();
  });

  it('should show differal Information dialogue box and Yes is clicked', () => {
    correctiveActionFormGroup.get('isDeferred').setValue(false);
    correctiveActionFormGroup.get('isMajorRepair').setValue(true);
    fixture.detectChanges();
    spyOn(dialogService, 'addDialog').and.returnValues(Observable.of(true), Observable.of(false));
    component.confirmDeferralInf(0);
    expect(dialogService.addDialog).toHaveBeenCalledTimes(1);
    expect(correctiveActionFormGroup.get('isDeferred').value).toBeTruthy();
  });
});
