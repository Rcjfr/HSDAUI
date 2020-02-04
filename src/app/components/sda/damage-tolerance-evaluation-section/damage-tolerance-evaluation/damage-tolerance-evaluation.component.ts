import { Component, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { FileUploader, ParsedResponseHeaders, FileItem } from 'ng2-file-upload';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { ConfirmComponent } from '@app/common/components/confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';

import { environment } from '@env/environment';

import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { Expressions } from '@app/common/validators/generic-validator';


import * as moment from 'moment';
import { List } from 'immutable';
import * as models from '@app/common/models';
import { AppStateService, AuthService } from '@app/common/services';
import { DteMonitorItemsArrayComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-monitor-items-array/dte-monitor-items-array.component';
import { DteThresholdItemsArrayComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-threshold-items-array/dte-threshold-items-array.component';
import { DteComponentComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-component/dte-component.component';
import { DteEngineComponent } from '@app/components/sda/damage-tolerance-evaluation-section/dte-engine/dte-engine.component';
import { DTEStatus } from '@app/common/models/enumerations';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { FilterByPipe } from 'ng-pipes';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'aa-damage-tolerance-evaluation',
  templateUrl: './damage-tolerance-evaluation.component.html',
  styleUrls: ['./damage-tolerance-evaluation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DamageToleranceEvaluationComponent extends BaseFormComponent implements OnInit, OnChanges {
  @Input() editable = false;
  ATACodes$: Observable<models.IATACode[]>;
  ATACodesDte: models.IATACode[];
  ataCodes2Dte: models.IATACode[];
  alertCodes$: Observable<models.IBaseLookUp[]>;
  pipe = new FilterByPipe();
  ataSubscription: Subscription;

  dteStatus$: Observable<models.IBaseLookUp[]>;
  status$: Observable<models.IBaseLookUp[]>;
  repairInspectionStatus$: Observable<models.IBaseLookUp[]>;
  @ViewChild('uploadEl') uploadElRef: ElementRef
  public uploader = new FileUploader({ autoUpload: true, maxFileSize: 10 * 1024 * 1024 });
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

  constructor(private fb: FormBuilder, private appStateService: AppStateService, private dialogService: DialogService, authService: AuthService, private toastrService: ToastrService) {
    super('damageToleranceEvaluationGroup', authService);
    this.formGroup = this.fb.group({
      isExistingRepair: [false, [Validators.required]],
      dteStatus: ['', [Validators.required]],
      totalShipTime: ['', [Validators.required, Validators.maxLength(20)]],
      cycles: ['', [Validators.required, Validators.maxLength(20)]],
      repairInspectionStatus: ['', [Validators.required]],
      isFatigueCritical: [undefined, [Validators.required]],
      stage1RTSDate: [undefined, [Validators.required]],
      stage1Duration: [6, [Validators.required]],
      stage2Date: [undefined, []],
      stage3Date: [undefined, []],
      srNumber: ['', [Validators.maxLength(50)]],
      rdasNumber: ['', [Validators.maxLength(25)]],
      etdNumber: ['', [Validators.maxLength(25)]],
      esmSubItemNumber: ['', [Validators.maxLength(50)]],
      comments: ['', [Validators.maxLength(500)]],
      qcFeedback: ['', [Validators.maxLength(250)]],
      submittedToQC: [false, []],
      submitToQC: [false, []],
      updatedByEmpID: [{ value: '', disabled: true }, []],
      updatedByName: [{ value: '', disabled: true }, []],
      updatedDate: new FormControl({ value: new Date(), disabled: true }),
      dueDate: new FormControl({ value: '', disabled: true }),
      thresholdItems: DteThresholdItemsArrayComponent.buildItems([{}]),
      monitorItems: DteMonitorItemsArrayComponent.buildItems([{}]),
      attachments: this.fb.array([]),
      taskCardNo: ['', [Validators.maxLength(150)]],
      repairDate: [undefined, []],
      airlineCode: ['', [Validators.maxLength(3)]],
      removedByDate: [undefined, []],
      mrbNumber: ['', [Validators.maxLength(50)]],
      mrtNumber: [{ value: '', disabled: true }, [Validators.maxLength(15)]],
      removedByMrt: [{ value: '', disabled: true }, [Validators.maxLength(150)]],
      status: ['', [Validators.maxLength(1)]],
      zone: ['', [Validators.maxLength(50)]],
      repairLocation: ['', [Validators.maxLength(100)]],
      mroDocuments: ['', [Validators.maxLength(150)]],
      legacyEA: ['', [Validators.maxLength(100)]],
      ataCode1Dte: ['', []],
      ataCode2Dte: ['', []],
    });
  }

  ngOnInit() {
    this.alertCodes$ = this.appStateService.getAlertCodes();
    this.ATACodes$ = this.appStateService.getATACodes();
    this.dteStatus$ = this.appStateService.getDTEStatus();
    this.repairInspectionStatus$ = this.appStateService.getRepairInspectionStatus();
    this.status$  = this.appStateService.getDTERepairStatus();
    this.authService.auditDisplayName().take(1).subscribe(u => {
      this.displayName = u;
    });
    this.formGroup.get('qcFeedback').valueChanges.filter(v => this.editable).subscribe(val => {
      if (!val) {
        this.formGroup.get('submitToQC').disable();
      } else {
        this.formGroup.get('submitToQC').enable();
      }
    });
    this.uploader.onAfterAddingFile = (fileItem) => {
      const arr = this.getAttachments();
      if (arr.controls.some((fg: FormGroup) => fg.controls.attachmentName.value.toLowerCase() === fileItem.file.name.toLowerCase())) {
        this.toastrService.error('Attachment with same name already exists.', 'Error');
        this.uploader.removeFromQueue(fileItem);
        this.uploadElRef.nativeElement.value = '';

        return;
      };
      fileItem.withCredentials = false;
      this.appStateService.uploadAttachment();
    };
    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      this.uploader.removeFromQueue(item);
      this.appStateService.uploadAttachmentFail('Error during attachment upload.Please try again.');
    };
    this.uploader.onCompleteItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      if (status === 200) {
        const arr = this.getAttachments();
        const responseData = JSON.parse(response);
        arr.push(this.initAttachment(item.file.name, item.file.size, responseData[0], 0));
        this.appStateService.uploadAttachmentComplete();
      }
      this.uploadElRef.nativeElement.value = '';
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
        //dteDueDateControl.setValue('');
        const dteStatus = Number(dteStatusControl.value);
        switch (dteStatus) {
          case DTEStatus.Open:
            {
              if (stage1RTSDateControl.value == null) { return; }
              const stage1RTSDate = <Date>stage1RTSDateControl.value;
              const durationMonths = <number>durationControl.value;
              const dt = moment(stage1RTSDate).add(durationMonths, 'month').format('MM/DD/YYYY');
              dteDueDateControl.setValue(dt);
              break;
            }
          case DTEStatus.Closed:
            dteDueDateControl.setValue('Completed');
            break;
          case DTEStatus.TBD:
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
          this.formGroup.patchValue({
            updatedByEmpID: newSda.dteSection.updatedByBadgeNo,
            updatedByName: newSda.dteSection.updatedBy
          });
        }
        this.formGroup.setControl('thresholdItems', DteThresholdItemsArrayComponent.buildItems(newSda.dteSection.thresholdItems.length > 0 ? newSda.dteSection.thresholdItems : [{}]));
        this.formGroup.setControl('monitorItems', DteMonitorItemsArrayComponent.buildItems(newSda.dteSection.monitorItems.length > 0 ? newSda.dteSection.monitorItems : [{}]));
        const arr = new FormArray([]);
        for (const attachment of newSda.dteSection.attachments) {
          if (attachment && attachment.attachmentName) {
            arr.push(this.initAttachment(attachment.attachmentName, attachment.attachmentSize, attachment.attachmentPath, attachment.attachmentID));
          }
        }
        this.formGroup.setControl('attachments', arr);
      // //   //Ata Codes
      // //  if (changes.criteria.currentValue.searchByDTE.ataCode1Dte) {
      // //   this.loadAtaCodes2(changes.criteria.currentValue.searchByDTE.ataCode1Dte);

      // //   if (changes.criteria.currentValue.searchByDTE.ataCode2Dte) {
      // //     this.formGroup.patchValue({ ataCode2Dte: changes.criteria.currentValue.searchByDTE.ataCode2Dte }, { emitEvent: false });
      // //   }
      // // }
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
          totalShipTime: newSda.generalSection.totalShipTime ? parseFloat(newSda.generalSection.totalShipTime.replace(':', '.')) : '',
          cycles: newSda.generalSection.cycles ? parseInt(newSda.generalSection.cycles, 10) : '',
          submitToQC: false,
          updatedByName: { value: '', disabled: true },
          updatedByEmpID: { value: '', disabled: true },
          updatedDate: { value: undefined, disabled: true },
          isExistingRepair: false,
          isFatigueCritical: undefined,
          srNumber: '',
          rdasNumber: '',
          etdNumber: '',
          esmSubItemNumber: '',
          comments: '',
          qcFeedback: '',
          submittedToQC: false,
          taskCardNo: '',
          repairDate: undefined,
          airlineCode: '',
          removedByDate: undefined,
          mrbNumber: '',
          mrtNumber: '',
          removedByMrt: '',
          status: '',
          zone: '',
          repairLocation: '',
          mroDocuments: '',
          legacyEA: '',
        });
      }
      this.formGroup.markAsPristine();
        }
    if (!this.editable) {
      this.formGroup.disable({ emitEvent: false });
    }
  }

  initAttachment(fileName: string, fileSize: number, filePath: string, attachmentID: number) {
    return this.fb.group({
      attachmentID: [attachmentID, []],
      attachmentName: [fileName, []],
      attachmentSize: [fileSize, []],
      attachmentPath: [filePath, []]
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

  // onAlertCode1Change(alertCode1: string) {
  //   this.loadAtaCodes2(alertCode1);
  //   this.formGroup.controls['ataCode2Dte'].setValue('');
  // }

  // loadAtaCodes2(alertCode1: string) {
  //   this.ataCodes2Dte = <models.IATACode[]>this.pipe.transform(this.ATACodesDte, ['primaryCode'], alertCode1);
  // }
}
