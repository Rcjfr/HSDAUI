/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InjectionToken, SimpleChange,  NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { AppStateService, AuthService } from '@app/common/services';
import { HttpModule } from '@angular/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TextMaskModule } from 'angular2-text-mask';
import { DialogService } from 'ng2-bootstrap-modal';
import { NgPipesModule } from 'ng-pipes';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { FileUploadModule, FileUploader } from 'ng2-file-upload';
import { MockAppStateService } from '@app/common/services/mocks/mock-app-state.service';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { DamageToleranceEvaluationComponent } from './damage-tolerance-evaluation.component';

import { DteThresholdItemComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-threshold-item/dte-threshold-item.component';
import { DteThresholdItemsArrayComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-threshold-items-array/dte-threshold-items-array.component';

import { DteInspectionItemComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-inspection-item/dte-inspection-item.component';
import { DteInspectionItemsArrayComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-inspection-items-array/dte-inspection-items-array.component';

import { DteMonitorItemComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-monitor-item/dte-monitor-item.component';
import { DteMonitorItemsArrayComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-monitor-items-array/dte-monitor-items-array.component';

import { DteEngineComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-engine/dte-engine.component';
import { DteComponentComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-component/dte-component.component';
import { ConfirmationService } from 'primeng/api';

describe('DamageToleranceEvaluationComponent', () => {
  // let component: DamageToleranceEvaluationComponent;
  // let fixture: ComponentFixture<DamageToleranceEvaluationComponent>;
  const sda1 = {
    dteSection: {
      attachments: [],
      monitorItems: [
        {
          monitorItemID: 3,
          monitorItemDescription: 'm'
        }
      ],

      thresholditems: [
        {
          thresholdItemID: 3,
          inspectionThreshold: 'tt',
          inspectionInterval: 'ti',
          inspectionMethod: 'tim'
        }
      ],

      inspectionitems: [
        {
          thresholdItemID: 3,
          inspectionThreshold: 'it',
          inspectionInterval: 'ii',
          inspectionMethod: 'im'
        }
      ],
      versionID: 759,
      dteStatus: 1,
      totalShipTime: '15574.11',
      cycles: '6207',
      repairInspectionStatus: null,
      isFatigueCritical: true,
      stage1RTSDate: new Date(),
      stage1Duration: 6,
      stage2Date: new Date(),
      stage3Date: new Date(),
      srNumber: 'sr',
      rdasNumber: 'rdas',
      etdNumber: 'etd',
      esmSubItemNumber: 'esm',
      comments: 'dte comments',
      updatedByBadgeNo: '00123456',
      updatedBy: 'LASTNAME, FIRSTNAME',
      updatedDate: new Date(),
      dueDate: '05/01/2018',
      qcFeedback: 'qc feedback',
      submittedToQC: true
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }, DialogService, AuthService,
        ToastrService, ConfirmationService],
      declarations: [DamageToleranceEvaluationComponent,
        DteMonitorItemComponent,
        DteMonitorItemsArrayComponent,
        DteInspectionItemComponent,
        DteInspectionItemsArrayComponent,
        DteThresholdItemComponent,
        DteThresholdItemsArrayComponent,
        DteMonitorItemComponent,
        DteThresholdItemsArrayComponent