import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InjectionToken, SimpleChange } from '@angular/core';
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
import { DteMonitorItemsArrayComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-monitor-items-array/dte-monitor-items-array.component';
import { DteThresholdItemsArrayComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-threshold-items-array/dte-threshold-items-array.component';
import { DteThresholdItemComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-threshold-item/dte-threshold-item.component';
import { DteMonitorItemComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-monitor-item/dte-monitor-item.component';
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
      thresholdItems: [
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
      updatedBy: '00123456 - LASTNAME, FIRSTNAME',
      updatedDate: new Date(),
      dueDate: '05/01/2018',
      qcFeedback: 'qc feedback',
      submittedToQC: true
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AppStateService, useClass: MockAppStateService }, DialogService, AuthService,
        ToastrService, ConfirmationService],
      declarations: [DamageToleranceEvaluationComponent,
        DteMonitorItemsArrayComponent,
        DteThresholdItemsArrayComponent,
        DteThresholdItemComponent,
        DteMonitorItemComponent],
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
    expect(component.formGroup.get('submittedToQC').disabled).toBeFalsy();
    component.formGroup.get('qcFeedback').setValue('');
    expect(component.formGroup.get('submittedToQC').disabled).toBeTruthy();
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
    expect(component.formGroup.get('totalShipTime').value).toBe('15574.11'); //default value from general section
    expect(component.formGroup.get('cycles').value).toBe('6207'); //default value from general section

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

});
