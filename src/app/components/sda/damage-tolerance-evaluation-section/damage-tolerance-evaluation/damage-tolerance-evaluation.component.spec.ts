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
  let component: DamageToleranceEvaluationComponent;
  let fixture: ComponentFixture<DamageToleranceEvaluationComponent>;
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
        DteEngineComponent,
        DteComponentComponent
      ],
      imports: [
        ReactiveFormsModule, FormsModule, FormControlsModule, ToastrModule.forRoot(), NgPipesModule,
        NKDatetimeModule, TextMaskModule, FileUploadModule, HttpModule, RouterTestingModule, NgIdleKeepaliveModule.forRoot(), HttpClientTestingModule
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageToleranceEvaluationComponent);
    component = fixture.componentInstance;
    component.sda = {};
    component.editable = true;
    component.parent = new FormGroup({});
    component.errorMessages = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render existing dte section', () => {
    component.editable = true;
    component.ngOnChanges({
      sda: new SimpleChange(null, sda1, true)
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.formGroup.get('updatedByEmpID').value).toBe('00123456'); //default value
    component.formGroup.get('qcFeedback').setValue('testing');
    expect(component.formGroup.get('submitToQC').disabled).toBeFalsy();
    component.formGroup.get('qcFeedback').setValue('');
    expect(component.formGroup.get('submitToQC').disabled).toBeTruthy();
   });
  it('should render new dte section', () => {
    component.editable = true;
    component.ngOnChanges({
      sda: new SimpleChange(null, {
        generalSection: {
          totalShipTime: '15574.11',
          cycles: '6207'
        }
      }, true)
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();

    expect(component.formGroup.get('stage1Duration').value).toBe(6); //default value
    expect(component.formGroup.get('updatedByEmpID').value).toBe(''); //default value
    expect(component.formGroup.get('totalShipTime').value).toBe(15574.11); //default value from general section
    expect(component.formGroup.get('cycles').value).toBe(6207); //default value from general section

  });

  it('should render existing dte section in readonly mode', () => {
    component.editable = false;
    fixture.detectChanges();
    component.ngOnChanges({});
    component.formGroup.updateValueAndValidity();
    expect(component.formGroup.disabled).toBeTruthy();
  });

  it('should calculate dte duedate automatically', () => {

    component.formGroup.get('stage1RTSDate').setValue(new Date(2017, 9, 1));
    component.formGroup.get('stage1Duration').setValue(6);

    component.formGroup.get('dteStatus').setValue(1); //Open
    fixture.detectChanges();
    expect(component.formGroup.get('dueDate').value).toBe('04/01/2018');

    component.formGroup.get('dteStatus').setValue(2); //Closed
    fixture.detectChanges();
    expect(component.formGroup.get('dueDate').value).toBe('Completed');
    component.formGroup.get('dteStatus').setValue(3); //TBD
    fixture.detectChanges();
    expect(component.formGroup.get('dueDate').value).toBe('');

    component.formGroup.get('stage1RTSDate').setValue(null);
    fixture.detectChanges();
    expect(component.formGroup.get('dueDate').value).toBe('');

    component.formGroup.get('dteStatus').setValue('');
    fixture.detectChanges();
    expect(component.formGroup.get('dueDate').value).toBe('');
  });
//   it('should get ATA Codes from service', () => {
//     //Example to use spyOn
//     //const service: AppStateService = TestBed.get(AppStateService);
//     //component.ATACodes$
//     //spyOn(service, 'getATACodes').and.returnValue(Observable.of(mockResponse));
//     //fixture.detectChanges(); // move from the beforEach to here for spyOn to work as detectChanges will invoke ngOnInit
//   component.ATACodes$.subscribe(a => {
//     console.log(a);
//           expect(a.length).toBe(1);
//     });
// });
});
