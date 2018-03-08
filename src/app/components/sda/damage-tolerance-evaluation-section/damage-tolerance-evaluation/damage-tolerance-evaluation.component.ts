import { Component, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { FileUploader, ParsedResponseHeaders, FileItem } from 'ng2-file-upload';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { ConfirmComponent } from '@app/common/components/confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';

import { environment } from '@env/environment';

import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { Expressions } from '@app/common/validators/generic-validator';


import * as moment from 'moment';
import { Observable } from 'rxjs/Rx';
import { List } from 'immutable';
import * as models from '@app/common/models';
import { AppStateService, AuthService } from '@app/common/services';
import { DteMonitorItemsArrayComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-monitor-items-array/dte-monitor-items-array.component';
import { DteThresholdItemsArrayComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-threshold-items-array/dte-threshold-items-array.component';

@Component({
  selector: 'aa-damage-tolerance-evaluation',
  templateUrl: './damage-tolerance-evaluation.component.html',
  styleUrls: ['./damage-tolerance-evaluation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DamageToleranceEvaluationComponent extends BaseFormComponent implements OnInit, OnChanges {
  @Input() editable = false;

  dteStatus$: Observable<models.IBaseLookUp[]>;
  repairInspectionStatus$: Observable<models.IBaseLookUp[]>;
  public uploader = new FileUploader({ autoUpload: true, maxFileSize: 5 * 1024 * 1024 });
  displayName: string;
  createNumberMask = createNumberMask;
  public hsdaApiBaseUrl = environment.hsdaApiBaseUrl;
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
      updatedByEmpID: [{ value: '', disabled: true }, []],
      updatedByName: [{ value: '', disabled: true }, []],
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
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.appStateService.uploadAttachment();
    };
    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      console.log('Error during attachment upload.Please try again.', response);
      this.appStateService.uploadAttachmentFail('Error during attachment upload.Please try again.');
    };
    this.uploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      const arr = this.getAttachments();
      const responseData = JSON.parse(response);
      arr.push(this.initAttachment(item.file.name, item.file.size, responseData[0]));
      this.appStateService.uploadAttachmentComplete();
    };
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
              const dt = moment(stage1RTSDate).add(durationMonths, 'month').format('MM/DD/YYYY');
              dteDueDateControl.setValue(dt);
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
      this.uploader.setOptions({ url: `${environment.hsdaApiBaseUrl}sda/${newSda.id}/attachments` });

      if (newSda.dteSection) {
        this.formGroup.patchValue(newSda.dteSection);
        this.formGroup.patchValue({
          dteStatus: newSda.dteSection.dteStatus,
          repairInspectionStatus: newSda.dteSection.repairInspectionStatus || ''
        });
        if (newSda.dteSection.updatedBy) {
          const index = newSda.dteSection.updatedBy.indexOf('-')
          this.formGroup.patchValue({
            updatedByEmpID: newSda.dteSection.updatedBy.slice(0, index - 1),
            updatedByName: newSda.dteSection.updatedBy.slice(index + 2, newSda.dteSection.updatedBy.length)
          });
        }
        this.formGroup.setControl('thresholdItems', DteThresholdItemsArrayComponent.buildItems(newSda.dteSection.thresholdItems));
        this.formGroup.setControl('monitorItems', DteMonitorItemsArrayComponent.buildItems(newSda.dteSection.monitorItems));
        const arr = new FormArray([]);
        for (const attachment of newSda.dteSection.attachments) {
          arr.push(this.initAttachment(attachment.attachmentName, attachment.attachmentSize, attachment.attachmentPath));
        }
        this.formGroup.setControl('attachments', arr);
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
          submittedToQC: false,
          updatedByName: '',
          updatedByEmpID: '',
          updatedDate: { value: undefined, disabled: true }
        });
      }
      this.formGroup.markAsPristine();
    }
    if (!this.editable) {
      this.formGroup.disable({ emitEvent: false });
    }
  }

  initAttachment(fileName: string, fileSize: number, filePath: string) {
    return this.fb.group({
      attachmentID: ['', [Validators.maxLength(50)]],
      attachmentName: [fileName, [Validators.maxLength(50)]],
      attachmentSize: [fileSize, [Validators.maxLength(50)]],
      attachmentPath: [filePath, [Validators.maxLength(50)]]
    });
  }

  deleteAttachment(index: number) {
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirm?',
      message: 'Are you sure you want to delete this attachment?'
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          const arr = this.getAttachments();
          arr.removeAt(index);
        }
      });

    return false;
  }

  downloadAttachment(sdaid: number, attachmentPath: string, attachmentName: string) {
    this.appStateService.downloadAttachment(sdaid, attachmentPath, attachmentName);

    return false;
  }

  getAttachments(): FormArray {
    return <FormArray>this.formGroup.get('attachments');
  }
}
