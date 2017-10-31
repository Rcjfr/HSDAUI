import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { BaseFormComponent } from '../../base-form.component';
import { ConfirmComponent } from '../../../../common/components/confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';

import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { Expressions } from '../../../../common/validators/generic-validator';


import * as moment from 'moment';
import { Observable } from 'rxjs/Rx';
import { List } from 'immutable';
import * as models from '../../../../common/models';
import { AppStateService, AuthService } from '../../../../common/services';
import { DteMonitorItemsArrayComponent } from '../dte-monitor-items-array/dte-monitor-items-array.component';
import { DteThresholdItemsArrayComponent } from '../dte-threshold-items-array/dte-threshold-items-array.component';

@Component({
  selector: 'aa-damage-tolerance-evaluation',
  templateUrl: './damage-tolerance-evaluation.component.html',
  styleUrls: ['./damage-tolerance-evaluation.component.less']
})
export class DamageToleranceEvaluationComponent extends BaseFormComponent implements OnInit, OnChanges {
  @Input() editable = false;

  dteStatus$: Observable<List<models.IBaseLookUp>>;
  repairInspectionStatus$: Observable<List<models.IBaseLookUp>>;
  public uploader = new FileUploader({ url: '/api/attachments' });
  displayName: string;
  createNumberMask = createNumberMask;
  public decimalNumberMask = createNumberMask({
    prefix: '',
    allowDecimal: true,
    includeThousandsSeparator: false,
    decimalLimit: 2,
    requireDecimal: false
  });
  public numberMask = createNumberMask({
    prefix: '',
    allowDecimal: false,
    includeThousandsSeparator: false,
    allowLeadingZeroes: false
  });

  constructor(private fb: FormBuilder, private appStateService: AppStateService, private dialogService: DialogService, authService: AuthService) {
    super('damageToleranceEvaluationGroup', authService);
    this.formGroup = this.fb.group({
      dteStatus: ['', [Validators.required]],
      totalShipTime: ['', [Validators.required, Validators.maxLength(20)]],
      cycles: ['', [Validators.required, Validators.maxLength(20)]],
      repairInspectionStatus: ['', [Validators.required]],
      isFatigueCritical: [undefined, [Validators.required]],
      stage1RTSDate: [undefined, [Validators.required]],
      stage1Duration: [6, [Validators.required]],
      stage2Date: [undefined, []],
      stage3Date: [undefined, []],
      srNumber: ['', [Validators.maxLength(25)]],
      rdasNumber: ['', [Validators.maxLength(25)]],
      etdNumber: ['', [Validators.maxLength(25)]],
      esmSubItemNumber: ['', [Validators.maxLength(25)]],
      comments: ['', [Validators.maxLength(500)]],
      qcFeedback: ['', [Validators.maxLength(250)]],
      submittedToQC: [false, []],
      updatedBy: [{ value: '', disabled: true }, []],
      updatedDate: new FormControl({ value: new Date(), disabled: true }),
      dueDate: new FormControl({ value: '', disabled: true }),
      thresholdItems: DteThresholdItemsArrayComponent.buildItems([{}]),
      monitorItems: DteMonitorItemsArrayComponent.buildItems([{}]),
      attachments: this.fb.array([])

    });
  }

  ngOnInit() {
    this.dteStatus$ = this.appStateService.getDTEStatus();
    this.repairInspectionStatus$ = this.appStateService.getRepairInspectionStatus();
    this.authService.auditDisplayName().take(1).subscribe(u => {
      this.displayName = u;
    });
    this.formGroup.get('qcFeedback').valueChanges.filter(v => this.editable).subscribe(val => {
      if (!val) {
        this.formGroup.get('submittedToQC').disable();
      } else {
        this.formGroup.get('submittedToQC').enable();
      }
    });
    this.parent.addControl(this.formGroupName, this.formGroup);
    const dteStatusControl = this.formGroup.get('dteStatus');
    const stage1RTSDateControl = this.formGroup.get('stage1RTSDate');
    const durationControl = this.formGroup.get('stage1Duration');
    const dteDueDateControl = this.formGroup.get('dueDate');
    Observable.merge(dteStatusControl.valueChanges,
      stage1RTSDateControl.valueChanges,
      durationControl.valueChanges)
      .mapTo(1).subscribe(v => {
        dteDueDateControl.setValue('');
        if (stage1RTSDateControl.value == null) { return; }
        const stage1RTSDate = <Date>stage1RTSDateControl.value;
        const durationMonths = <number>durationControl.value;
        const dteStatus = Number(dteStatusControl.value);
        switch (dteStatus) {
          case 1: //Open
            {
              const copiedDate = new Date(stage1RTSDate.getTime());
              const dueDate = new Date(copiedDate.setMonth(copiedDate.getMonth() + durationMonths));
              dteDueDateControl.setValue(moment(dueDate).format('MM/DD/YYYY'));
              break;
            }
          case 2: //Closed
            dteDueDateControl.setValue('Completed');
            break;
          case 3: //TBD
            dteDueDateControl.setValue('');
            break;
          default:
            dteDueDateControl.setValue('');
        }

      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      if (newSda.dteSection) {
        this.formGroup.patchValue(newSda.dteSection);
        this.formGroup.patchValue({
          dteStatus: newSda.dteSection.dteStatus,
          repairInspectionStatus: newSda.dteSection.repairInspectionStatus || ''
        });
        this.formGroup.setControl('thresholdItems', DteThresholdItemsArrayComponent.buildItems(newSda.dteSection.thresholdItems));
        this.formGroup.setControl('monitorItems', DteMonitorItemsArrayComponent.buildItems(newSda.dteSection.monitorItems));
      } else {
        this.formGroup.setControl('thresholdItems', DteThresholdItemsArrayComponent.buildItems([{}]));
        this.formGroup.setControl('monitorItems', DteMonitorItemsArrayComponent.buildItems([{}]));
        this.formGroup.reset({
          dteStatus: '',
          repairInspectionStatus: '',
          stage1Duration: 6,
          stage1RTSDate: undefined,
          stage2Date: undefined,
          stage3Date: undefined,
          totalShipTime: newSda.generalSection.totalShipTime,
          cycles: newSda.generalSection.cycles,
          updatedBy: '',
          updatedDate: { value: new Date(), disabled: true }
        });
      }
      this.formGroup.markAsPristine();
    }
    if (!this.editable) {
      this.formGroup.disable({ emitEvent: false });
    }
  }
}
