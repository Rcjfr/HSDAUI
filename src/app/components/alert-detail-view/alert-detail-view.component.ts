import { ILoadChangeLog } from '@app/common/models/payload/change-log.model';
import { IChangeLog } from '@app/common/models/change-log.model';
import {
  Component, OnInit, Input, ViewChildren, ElementRef,
  AfterViewInit, ChangeDetectionStrategy, ContentChildren, ViewChild, AfterContentInit, EventEmitter, Output, HostListener, OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef
} from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormControlName,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { ISda} from '@app/common/models';
import { Status, Source, CorrosionLevel } from '@app/common/models/enumerations';
import * as moment from 'moment';
import { GenericValidator, Expressions } from '@app/common/validators/generic-validator';
import { ValidationMessages } from './alert-detail-view.messages';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppStateService, AuthService, SdaExportService } from '@app/common/services';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';
import { CustomValidators } from '@app/common/validators/custom-validators';
import { ConfirmComponent } from '@app/common/components/confirm/confirm.component';
import { List } from 'immutable';
import { ChangeLogModalComponent } from '../change-log-modal/change-log-modal.component';
import * as _ from 'lodash/lodash.min.js';
import { map, throttleTime, mapTo } from 'rxjs/operators';
import { fromEvent } from 'rxjs/observable/fromEvent';

@Component({
  selector: 'aa-alert-detail-view',
  templateUrl: './alert-detail-view.component.html',
  styleUrls: ['./alert-detail-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertDetailViewComponent implements OnInit, AfterContentInit, OnDestroy, OnChanges {
  getCurrentSdaIdSubscription: Subscription;
  @Input() sda: ISda;
  @Input() readOnly: boolean;
  @Input() original: boolean;
  @Input() loading: boolean;
  @Output() onReset = new EventEmitter();
  currentSdaId: number;
  lastModifiedBy: string;
  statusUpdatedByName: string;
  statusUpdatedBy: string;
  lastModifiedOn: Date = new Date();
  statusUpdatedOn: Date = this.lastModifiedOn;
  saveCPCPSectionDetails = false;
  saveDTESectionDetails = false;
  public Status = Status; // to make it available in template
  public Source = Source; // to make it available in template
  public currentStatus: number;
  public newSdaStus$: Observable<Status>;
  sdrRequestPending = false;

  @ViewChild('statusModal') public statusModal: ModalDirective;
  @ViewChild(ChangeLogModalComponent) changeLogComponent: ChangeLogModalComponent;

  /* @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];*/
  /* @ContentChildren(FormControlName, {read:ElementRef, descendants:true}) formInputElements: ElementRef[];*/
  sdaForm: FormGroup;
  sdaStatusForm: FormGroup;
  public sdaStatusTitle = '';

  // Use with the generic validation message class
  displayMessage$ = new BehaviorSubject<any>({});

  private genericValidator: GenericValidator;
  changeLog$: Observable<List<IChangeLog>>;

  constructor(private toastr: ToastrService,
    private fb: FormBuilder, private elRef: ElementRef, private router: Router,
    public appStateService: AppStateService, public authService: AuthService,
    private dialogService: DialogService, public location: Location,
    private sdaExportService: SdaExportService,
    private cd: ChangeDetectorRef) {
    this.sdaForm = this.fb.group({
      status: ['', [Validators.required]],
    });
    this.sdaStatusForm = this.fb.group({
      status: ['', [Validators.required]],
      completedBy: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(Expressions.AlphanumericsComma)]],
      completedByName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(Expressions.AlphanumericsComma)]],
      completedOn: ['', [Validators.required, CustomValidators.validateFutureDate]],
      comments: ['', []],
    });
    this.genericValidator = new GenericValidator(ValidationMessages);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currentSdaId = this.sda.id;
    this.currentStatus = this.sda.status;
    if (changes.sda) {
      this.sdrRequestPending = false;
    }
  }

  ngAfterContentInit(): void {
    const frm = this.elRef.nativeElement.querySelector('form');
    const formElements = Array.prototype.slice.call(frm.querySelectorAll('input,select,textarea'));
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = formElements
      .map((formControl: any) => {
        return fromEvent(formControl, 'blur');
      }
      );

    // Merge the blur event observable with the valueChanges observable
    //Observable.merge(this.sdaForm.valueChanges, this.sdaForm.statusChanges, ...controlBlurs)
    Observable.merge(this.sdaForm.valueChanges, this.sdaForm.statusChanges)
      .pipe(
      mapTo(1),
      throttleTime(500)
      )
      .subscribe(value => {
        const messages = this.genericValidator.processMessages(this.sdaForm);
        //console.log('Validating...', messages);
        this.displayMessage$.next(messages);
      });

  }

  ngOnInit() {
    this.newSdaStus$ = this.appStateService.getNewSdaStatus();
    this.authService.auditDisplayName().take(1).subscribe(s => {
      this.lastModifiedBy = s;
      //TODO: use slice for names ex. str.slice(0, str.indexOf(',')) once we get validation of id.
    });

    this.authService.displayName().take(1).subscribe(s => {
      this.statusUpdatedByName = s;
    });

    this.authService.badgeId().take(1).subscribe(s => {
      this.statusUpdatedBy = s;
    });

    this.changeLog$ = this.appStateService.getChangeLog();
  }

  ngOnDestroy() {

  }

  clearForm() {
    this.genericValidator.formSubmitted = false;
    //this.sdaForm.reset();
    this.sdaForm.markAsPristine();
    this.sdaForm.markAsUntouched();
    this.displayMessage$.next({});
    window.scrollTo(0, 0);
  }

  flatten(data): any {
    const result = {};
    function recurse(cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        for (let i = 0, l = cur.length; i < l; i++) {
          recurse(cur[i], prop + '[' + i + ']');

          if (l === 0) {
            result[prop] = [];
          }
        }
      } else if (cur instanceof Date) {
        result[prop] = cur;
      } else {
        let isEmpty = true;
        for (const p in cur) {
          if (cur.hasOwnProperty(p)) {
            isEmpty = false;
            recurse(cur[p], p); //recurse(cur[p], prop ? prop+"."+p : p); //if dot notation is required
          }
        }
        if (isEmpty && prop) {
          result[prop] = {};
        }
      }
    }
    recurse(data, '');

    return result;
  }

  hideStatusModal() {
    this.statusModal.hide();
  }

  saveAlert(newStatus: number, showModal: boolean = true, modalTitle: string = null) {
    //this.sda.status = newStatus;
    this.sdaForm.patchValue({ status: newStatus });
    this.appStateService.setNewSdaStatus(newStatus);
    setTimeout(() => { //TODO: need to revisit to see if there is any better way
      this.validateAlertData(newStatus, showModal, modalTitle);
    }, 100);
  }

  saveStatusModal() {
    this.markAsDirty(this.sdaStatusForm);
    this.sdaStatusForm.updateValueAndValidity();
    if (!this.sdaStatusForm.valid) {
      return;
    }

    if ((this.sdaStatusForm.get('completedBy').value !== this.statusUpdatedBy) ||
      (this.sdaStatusForm.get('completedByName').value !== this.statusUpdatedByName)) {
      this.dialogService.addDialog(ConfirmComponent, {
        title: 'Confirm?',
        message: `Are you sure Completed By is correct?`
      }).filter(confirm => confirm === true).subscribe(confirm => {
        this.sda.statusUpdatedBy = `${this.sdaStatusForm.get('completedBy').value} - ${this.sdaStatusForm.get('completedByName').value}`;
        this.sda.statusUpdatedOn = new Date(this.sdaStatusForm.get('completedOn').value);
        this.sda.comments = this.sdaStatusForm.get('comments').value;
        this.hideStatusModal();
        this.saveAlertData();
      });
    } else {
      this.sda.statusUpdatedBy = `${this.sdaStatusForm.get('completedBy').value} - ${this.sdaStatusForm.get('completedByName').value}`;
      this.sda.statusUpdatedOn = new Date(this.sdaStatusForm.get('completedOn').value);

      this.sda.comments = this.sdaStatusForm.get('comments').value;
      this.hideStatusModal();
      this.saveAlertData();
    }
  }

  requestSdrNumber() {
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirm?',
      message: `Are you sure you want to request SDR for this SDA:${this.sda.id}?`

    }).filter(confirm => confirm === true).subscribe(confirm => {
      this.sda.generalSection.sdrNumber = 'Y';
      this.sda.hasSDRRequested = true;
      this.sdrRequestPending = true;
      //this.sdaForm.get('generalSectionFormGroup').patchValue({
      //  'sdrNumber': 'Y'
      //});
      this.sdaForm.patchValue({ status: this.currentStatus });
      this.sda.statusUpdatedBy = this.lastModifiedBy;
      this.sda.statusUpdatedOn = new Date();
      this.sda.comments = 'SDR Requested';
      this.saveAlertData(true);
    });
  }


  confirmInformation(newStatus: number) {
    const cpcpSectionGroup = this.sdaForm.get('cpcpSectionGroup');

    if (cpcpSectionGroup.get('isCPCPRelatedEvent').value) {
      if (cpcpSectionGroup.get('corrosionLevel').value === 2) {
        this.dialogService.addDialog(ConfirmComponent, {
          title: 'Alert',
          message: `Please ensure Engineering is contacted within 48 hours of this Level 2 CPCP finding.`,

        }).filter(confirm => confirm === true).subscribe(confirm => {
          this.confirmDeferralInf(newStatus);
        });
      } else if (cpcpSectionGroup.get('corrosionLevel').value === CorrosionLevel.Level3) {
        this.dialogService.addDialog(ConfirmComponent, {
          title: 'Confirm?',
          message: `This is a Level 3 corrosion finding.  Is this correct?`,
          okButtonText: 'Yes',
          cancelButtonText: 'No'
        }).filter(confirm => confirm === true).subscribe(confirm => {
          this.dialogService.addDialog(ConfirmComponent, {
            title: 'Alert',
            message: `CONTACT ENGINEERING IMMEDIATELY FOR A LEVEL 3 FINDING`
          }).filter(isConfirm => isConfirm === true).subscribe(isConfirm => {
            this.confirmDeferralInf(newStatus);
          });
        });
      } else {
        this.confirmDeferralInf(newStatus);
      }
    } else {
      this.confirmDeferralInf(newStatus);
    }
  }


  confirmDeferralInf(newStatus: number) {

    const correctiveActionFormGroup = this.sdaForm.get('correctiveActionFormGroup');

    if ((correctiveActionFormGroup.get('isDeferred').value === false) && (correctiveActionFormGroup.get('isMajorRepair').value === true)) {
      this.dialogService.addDialog(ConfirmComponent, {
        title: 'Confirm?',
        message: `Is there any additional follow up action associated with this Major Repair (i.e. damage tolerance evaluation, supplemental inspections, etc)?`,
        okButtonText: 'Yes',
        cancelButtonText: 'No'
      }).subscribe(confirm => {
        if (confirm) {

          this.sdaForm.get('correctiveActionFormGroup').patchValue({ 'isDeferred': true });
        } else {
          this.saveAlert(newStatus);
        }
      });
    } else {
      this.saveAlert(newStatus);
    }
  }

  validateSdaForm(): boolean {
    this.sdaForm.updateValueAndValidity();
    this.markAsDirty(this.sdaForm);
    this.genericValidator.formSubmitted = true;
    const messages = this.genericValidator.processMessages(this.sdaForm);
    this.logErrors(this.sdaForm);
    this.displayMessage$.next(messages);
    if (!this.sdaForm.valid) {
      this.logErrors(this.sdaForm);

      return false;
    }

    return true;
  }

  validateAlertData(newStatus: Status, showModal: boolean, modalTitle: string) {
    if (newStatus === Status.Open) {
      if (this.sda.status === Status.Complete ||
        this.sda.status === Status.Audited ||
        this.sda.status === Status.Closed) {
        //no need to validate the form as its a SDA Reopen Action
      } else {
        if (!this.validateSdaForm()) {
          this.toastr.error('Details entered are invalid. Please correct and try again.', 'Error');

          return;
        }
      }
    }
    if (newStatus === Status.Complete || newStatus === Status.Audited) {
      if (!this.validateSdaForm()) {
        this.toastr.error('Details entered are invalid. Please correct and try again.', 'Error');

        return;
      }
    }
    this.statusUpdatedOn = new Date();
    this.sdaStatusForm.patchValue({ status: newStatus, completedBy: this.statusUpdatedBy, completedByName: this.statusUpdatedByName, completedOn: this.statusUpdatedOn, comments: '' });
    if (newStatus === Status.Open) {
      if (this.sda.status === Status.Complete ||
        this.sda.status === Status.Audited ||
        this.sda.status === Status.Closed) {  //Reopening the form
        this.sdaStatusTitle = `Reopen SDA (SDA ID:${this.sda.id})`;
        this.showModal();
      } else {
        // User can not change UpdatedBy/Date.so no need to show the modal
        this.sda.statusUpdatedBy = `${this.statusUpdatedBy} - ${this.statusUpdatedByName}`
        this.sda.statusUpdatedOn = this.statusUpdatedOn;
        this.saveAlertData();
      }
    } else if (newStatus === Status.Closed) {
      this.sdaStatusTitle = `Accept SDA (SDA ID:${this.sda.id})`;
      if (!this.sda.generalSection.sdrNumber) {
        this.dialogService.addDialog(ConfirmComponent, {
          title: 'Confirm?',
          message: `Are you sure you want to accept the SDA (${this.sda.id}) without reqesting SDR?`
        }).filter(confirm => confirm === true).subscribe(confirm => {
          this.showModal();
        });

        return;
      } else {
        this.showModal();
      }
    } else {
      if (newStatus === Status.Complete) {
        this.sdaStatusTitle = 'Complete SDA ' + (this.sda.id ? `(SDA ID:${this.sda.id})` : '');

      } else if (newStatus === Status.Audited) {
        this.sdaStatusTitle = this.sda.id ? `Audit SDA (SDA ID:${this.sda.id})` : 'Complete SDA';

      } else if (newStatus === Status.Deleted) {
        this.sdaStatusTitle = `Delete SDA (SDA ID:${this.sda.id})`;
      } else if (newStatus === Status.Rejected) {
        this.sdaStatusTitle = `Reject SDA (SDA ID:${this.sda.id})`;
      }
      if (showModal) {
        if (modalTitle) {
          this.sdaStatusTitle = modalTitle;
        }
        this.showModal();
      } else {
        if (modalTitle) {
          this.sda.comments = modalTitle;
        }
        this.sda.statusUpdatedBy = `${this.statusUpdatedBy} - ${this.statusUpdatedByName}`;
        this.sda.statusUpdatedOn = this.statusUpdatedOn;
        this.saveAlertData();
      }
    }
  }

  showModal(): void {
    this.cd.detectChanges();
    this.statusModal.show();
  }

  get tomorrow(): Date {
    const tomorrow = moment(new Date()).add(1, 'days');

    return new Date(tomorrow.valueOf());
  }

  saveCPCPDispositionSection() {
    this.saveDTESectionDetails = false;
    this.saveCPCPSectionDetails = true;
    this.sdaForm.patchValue({ status: this.currentStatus });
    this.sda.statusUpdatedBy = `${this.statusUpdatedBy} - ${this.statusUpdatedByName}`;
    this.sda.statusUpdatedOn = new Date();
    this.sda.comments = 'Update CPCP Disposition Section Details';
    this.validateSdaForm();
    if (!this.sdaForm.get('cpcpDispositionSectionFormGroup').valid) {
      this.saveCPCPSectionDetails = false;
      this.toastr.error('Details entered are invalid. Please correct and try again.', 'Error');

      return;
    }
    this.saveAlertData();
    this.saveCPCPSectionDetails = false;
  }

  saveDTESection() {
    this.saveCPCPSectionDetails = false;
    this.saveDTESectionDetails = true;
    this.sdaForm.patchValue({ status: this.currentStatus });
    this.sda.statusUpdatedBy = `${this.statusUpdatedBy} - ${this.statusUpdatedByName}`;
    this.sda.statusUpdatedOn = new Date();
    this.sda.comments = 'Update Damage Tolerance Evaluation Details';
    this.validateSdaForm();
    if (!this.sdaForm.get('damageToleranceEvaluationGroup').valid) {
      this.saveDTESectionDetails = false;
      this.toastr.error('Details entered are invalid. Please correct and try again.', 'Error');

      return;
    }
    this.saveAlertData();
    this.saveDTESectionDetails = false;
  }

  saveAlertData(sdrRequested: boolean = false) {
    const formData = this.sdaForm.getRawValue();
    const generalSectionData = this.flatten(formData.generalSectionFormGroup);
    generalSectionData.createDate = moment(generalSectionData.createDate).format('YYYY-MM-DD');
    if (sdrRequested) {
      generalSectionData.sdrNumber = 'Y';
    }
    const defectLocationData = this.flatten(formData.defectLocationSectionFormGroup);
    let cpcpSectionData = undefined;
    if (formData.cpcpSectionGroup) {
      const causeOfDamageGroup = formData.cpcpSectionGroup.causeOfDamageGroup;
      const causesOfDamage: any = (causeOfDamageGroup.blockedDrain ? 4 : 0) +
        (causeOfDamageGroup.chemicalSpill ? 8 : 0) +
        (causeOfDamageGroup.damageOther ? 512 : 0) +
        (causeOfDamageGroup.environment ? 1 : 0) +
        (causeOfDamageGroup.galleySpill ? 2 : 0) +
        (causeOfDamageGroup.hardwareNotInstalled ? 64 : 0) +
        (causeOfDamageGroup.missingCorrosionInhibitor ? 256 : 0) +
        (causeOfDamageGroup.missingFloorBoardTape ? 32 : 0) +
        (causeOfDamageGroup.poorSealingPractices ? 128 : 0) +
        (causeOfDamageGroup.wetInsulationBlanket ? 16 : 0);
      cpcpSectionData = Object.assign(this.flatten(formData.cpcpSectionGroup), { causesOfDamage: causesOfDamage });
    }
    const correctiveActionData = this.flatten(formData.correctiveActionFormGroup);
    if (correctiveActionData.completedDate) {
      correctiveActionData.completedDate = moment(correctiveActionData.completedDate).format('YYYY-MM-DD');
    }
    const cpcpDispositionData = this.flatten(formData.cpcpDispositionSectionFormGroup);
    const sdaDetail: ISda = Object.assign({}, this.sda,
      {
        lastModifiedBy: this.lastModifiedBy,
        lastModifiedOn: this.lastModifiedOn,

        status: this.sdaForm.get('status').value,
      }
    );
    if (this.sdaForm.value.generalSectionFormGroup) {
      sdaDetail.generalSection = generalSectionData;
      sdaDetail.generalSection.station = sdaDetail.generalSection.station.toUpperCase();
    }
    if (this.sdaForm.value.defectLocationSectionFormGroup) {
      sdaDetail.defectLocationSection = defectLocationData;
    }
    if (this.sdaForm.value.cpcpSectionGroup) {
      sdaDetail.cpcpSection = cpcpSectionData;
    }
    if (this.sdaForm.value.correctiveActionFormGroup) {
      sdaDetail.correctiveActionSection = correctiveActionData;
    }
    sdaDetail.cpcpDispositionSection = null;
    if (this.saveCPCPSectionDetails) {
      sdaDetail.cpcpDispositionSection = cpcpDispositionData;
    }

    sdaDetail.dteSection = null;
    if (this.saveDTESectionDetails) {
      sdaDetail.dteSection = formData.damageToleranceEvaluationGroup;
      sdaDetail.dteSection.thresholdItems = sdaDetail.dteSection.thresholdItems.filter(t => t.inspectionInterval && t.inspectionMethod && t.inspectionThreshold);
      sdaDetail.dteSection.monitorItems = sdaDetail.dteSection.monitorItems.filter(t => t.monitorItemDescription);
      sdaDetail.dteSection.updatedByBadgeNo = this.statusUpdatedBy;
      sdaDetail.dteSection.updatedBy = this.statusUpdatedByName;
      sdaDetail.dteSection.updatedDate = this.lastModifiedOn;
    }

    this.appStateService.saveSda(sdaDetail);
  }

  logErrors(group: FormGroup | FormArray) {
    for (const i in group.controls) {
      if (group.controls[i] instanceof FormControl) {
        if (group.controls[i].errors) {
          console.log(i, group.controls[i].errors);
        }
        if (group.controls[i].invalid) {
          console.log(group.controls[i]);
        }
      } else {
        this.logErrors(group.controls[i]);
      }
    }
  }

  markAsDirty(group: FormGroup | FormArray) {
    group.markAsDirty();
    for (const i in group.controls) {
      if (group.controls[i] instanceof FormControl) {
        group.controls[i].markAsDirty();
      } else {
        this.markAsDirty(group.controls[i]);
      }
    }
  }

  canRequestSdr() {
    const ok = this.sda.id &&
      (this.currentStatus !== Status.Deleted && this.currentStatus !== Status.Closed) &&
      (this.sda.generalSection.sdrNumber === '' || this.sda.generalSection.sdrNumber == null);
    if (this.sdrRequestPending) {
      return true;
    }

    return ok;
  }

  canEditCompletedBy() {
    const ok = this.sdaStatusForm.get('status').value === Status.Complete ||
      this.sdaStatusForm.get('status').value === Status.Audited;

    return ok;

  }

  formatDate(date: Date): string {
    return moment(date).format('LLL');
  }

  completeChangeLog() {
    this.appStateService.loadChangelog({ sdaId: this.sda.id, version: 0 });
    this.changeLogComponent.showModal();
  }

  changeLog(result: ILoadChangeLog) {
    this.appStateService.loadChangelog({ sdaId: result.sdaId, version: result.version });
    this.changeLogComponent.showModal();
  }


  canArchiveSda(): Observable<boolean> {
    return Observable.combineLatest(
      this.authService.isQCInspector(),
      this.authService.isQCManager(),
      this.authService.badgeId(),
      (isQCInspector, isQCManager, loggedInUserBadgeNo) => {
        if (this.currentStatus === Status.Deleted) {
          return false;
        }
        if (isQCManager) {
          return true;
        }
        if (this.currentStatus === Status.Complete && this.sda.generalSection.originatorBadgeNo === loggedInUserBadgeNo) {
          return true;
        }
        if (isQCInspector && (this.sda.id && this.currentStatus === Status.Open)) {
          return true;
        }

        return false;
      });
  }

  isCPCPDispositionSectionEditable(): Observable<boolean> {
    return this.authService.isCPCPTrainedReviewingEngineer().pipe(map(ok => {
      return (ok && !this.readOnly && (this.sda.cpcpSection.isCPCPRelatedEvent) &&
        (this.sda.cpcpSection.corrosionLevel === CorrosionLevel.Level2 ||
        this.sda.cpcpSection.corrosionLevel === CorrosionLevel.Level3) &&
        (this.currentStatus === Status.Audited ||
          this.currentStatus === Status.Closed));
    }));

  }

  isCPCPDispositionSectionVisible(): Observable<boolean> {
    //return this.isCPCPDispositionSectionEditable().map(ok => {
    //  return ok || (this.sda.cpcpDispositionSection != null &&
    //    this.sda.cpcpDispositionSection.isNonCPCPRelatedEvent != null &&
    //    this.sda.history.some(s => s.status === Status.Audited || s.status === Status.Closed));
    //});
    return Observable.of(this.sda.cpcpSection.isCPCPRelatedEvent &&
      (this.sda.cpcpSection.corrosionLevel === CorrosionLevel.Level2 || this.sda.cpcpSection.corrosionLevel === CorrosionLevel.Level3) &&
      (this.currentStatus === Status.Audited || this.currentStatus === Status.Closed));
  }

  isDTESectionEditable(): Observable<boolean> {
    return this.authService.isComplianceEngineer().map(ok => {
      return (ok && !this.readOnly && (this.sda.correctiveActionSection.isMajorRepair) &&
        (this.sda.status === Status.Closed));
    });

  }

  isDTESectionVisible(): Observable<boolean> {
    //return this.isDTESectionEditable().map(ok => {
    //  const hasOldData = (this.sda.dteSection != null && this.sda.history.some(s => s.status === Status.Closed))
    //  return ok || hasOldData;
    //});
    return Observable.of(this.showRepairDetails());
  }

  public showRepairDetails(): boolean {
    return this.sda.correctiveActionSection
      && this.sda.correctiveActionSection.isMajorRepair
      && this.currentStatus === Status.Closed;
  }

  public getImportedDate(): string {
    const importStatus = _.last(this.sda.history);

    return moment(importStatus.lastModifiedOn).format('MM/DD/YYYY');
  }
  public hasOriginalVersion(): boolean {
    return this.sda.history.some(s => s.status === Status.Closed) &&
      this.sda.history[0].status !== Status.Closed;
  }

  public areCommentsRequired(): boolean {
    return this.sdaStatusForm.get('status').value === Status.Rejected ||
      this.sdaStatusForm.get('status').value === Status.Deleted ||
      (this.sdaStatusForm.get('status').value === Status.Open && this.currentStatus !== Status.Open);
  }

  public exportPdf(sdaId: number): void {
    this.appStateService.exportPDF([sdaId]);
  }
}
