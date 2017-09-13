import {
  Component, OnInit, Input, ViewChildren, ElementRef,
  AfterViewInit, ChangeDetectionStrategy, ContentChildren, ViewChild, AfterContentInit, EventEmitter, Output, HostListener, OnDestroy, OnChanges, SimpleChanges
} from '@angular/core';
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
import { ISda, Status } from '../../common/models';
import * as moment from 'moment';
import { GenericValidator } from '../../common/validators/generic-validator';
import { ValidationMessages } from './alert-detail-view.messages';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppStateService, AuthService } from '../../common/services';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';
import { CustomValidators } from '../../common/validators/custom-validators';
import { ConfirmComponent } from '../../common/components/confirm/confirm.component';
@Component({
  selector: 'aa-alert-detail-view',
  templateUrl: './alert-detail-view.component.html',
  styleUrls: ['./alert-detail-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertDetailViewComponent implements OnInit, AfterContentInit, OnDestroy, OnChanges {
  getCurrentSdaIdSubscription: Subscription;
  @Input() sda: ISda;
  @Input() loading: boolean;
  @Output() onReset = new EventEmitter();
  currentSdaId: number;
  lastModifiedBy: string;
  statusUpdatedBy: string;
  lastModifiedOn: Date = new Date();
  statusUpdatedOn: Date = this.lastModifiedOn;
  public Status = Status; // to make it available in template
  public currentStatus: number;
  public newSdaStus$: Observable<Status>;
  @ViewChild('statusModal') public statusModal: ModalDirective;

  // @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  // @ContentChildren(FormControlName, {read:ElementRef, descendants:true}) formInputElements: ElementRef[];
  sdaForm: FormGroup;
  sdaStatusForm: FormGroup;
  public sdaStatusTitle = '';

  // Use with the generic validation message class
  displayMessage$ = new BehaviorSubject<any>({});

  private genericValidator: GenericValidator;

  constructor(private toastr: ToastrService,
    private fb: FormBuilder, private elRef: ElementRef, private router: Router,
    public appStateService: AppStateService, public authService: AuthService, private dialogService: DialogService) {
    this.sdaForm = this.fb.group({
      status: ['', [Validators.required]],
    });
    this.sdaStatusForm = this.fb.group({
      status: ['', [Validators.required]],
      completedBy: ['', [Validators.required]],
      completedOn: ['', [Validators.required, CustomValidators.validateFutureDate]],
      comments: ['', []],
    });
    this.genericValidator = new GenericValidator(ValidationMessages);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currentSdaId = this.sda.id;
    this.currentStatus = this.sda.status;
  }

  ngAfterContentInit(): void {
    const frm = this.elRef.nativeElement.querySelector('form');
    const formElements = Array.prototype.slice.call(frm.querySelectorAll('input,select,textarea'));
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = formElements
      .map((formControl: any) => {
        return Observable.fromEvent(formControl, 'blur');
      }
      );

    // Merge the blur event observable with the valueChanges observable
    //Observable.merge(this.sdaForm.valueChanges, this.sdaForm.statusChanges, ...controlBlurs)
    Observable.merge(this.sdaForm.valueChanges, this.sdaForm.statusChanges)
      .mapTo(1)
      .throttleTime(500)
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
      this.statusUpdatedBy = s;
      if (!this.sda.id) { //in case of new sda
        this.sda.correctiveActionSection.completedBy = s;
      }
    });
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

  saveAlert(newStatus: number) {
    //this.sda.status = newStatus;
    this.sdaForm.patchValue({ status: newStatus });
    this.appStateService.setNewSdaStatus(newStatus);
    setTimeout(() => { //TODO: need to revisit to see if there is any better way
      this.validateAlertData(newStatus);
    }, 100);
  }

  saveStatusModal() {
    this.markAsDirty(this.sdaStatusForm);
    this.sdaStatusForm.updateValueAndValidity();
    if (!this.sdaStatusForm.valid) {
      return;
    }
    this.sda.statusUpdatedBy = this.sdaStatusForm.get('completedBy').value;
    this.sda.statusUpdatedOn = new Date(this.sdaStatusForm.get('completedOn').value);

    this.sda.comments = this.sdaStatusForm.get('comments').value;
    this.hideStatusModal();
    this.saveAlertData();
  }

  requestSdrNumber() {
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Confirm?',
      message: `Are you sure you want to request SDR for this SDA:${this.sda.id}?`
    }).filter(confirm => confirm === true).subscribe(confirm => {
      this.sda.generalSection.sdrNumber = 'Y';
      this.sdaForm.get('generalSectionFormGroup').patchValue({ 'sdrNumber': 'Y' });
      this.sdaForm.patchValue({ status: this.currentStatus });
      this.sda.statusUpdatedBy = this.lastModifiedBy;
      this.sda.statusUpdatedOn = new Date();
      this.sda.comments = 'SDR Requested';
      this.saveAlertData();
    });
  }

  validateAlertData(newStatus: Status) {
    this.sdaForm.updateValueAndValidity();
    this.markAsDirty(this.sdaForm);
    this.genericValidator.formSubmitted = true;
    const messages = this.genericValidator.processMessages(this.sdaForm);
    this.logErrors(this.sdaForm);
    this.displayMessage$.next(messages);
    if (!this.sdaForm.valid) {
      this.logErrors(this.sdaForm);
      this.toastr.error('Details entered are invalid. Please correct and try again.', 'Error');

      return;
    }
    if (newStatus === Status.Open) {
      if (this.sda.status === Status.Complete || this.sda.status === Status.Closed) {  //Reopening the form
        this.sdaStatusTitle = `Reopen SDA(SDA ID:${this.sda.id})`;
        this.sdaStatusForm.patchValue({ status: newStatus, completedBy: this.lastModifiedBy, completedOn: this.statusUpdatedOn, comments: '' });
        this.statusModal.show();
      } else {
        // User can not change UpdatedBy/Date.so no need to show the modal
        this.sda.statusUpdatedBy = this.statusUpdatedBy;
        this.sda.statusUpdatedOn = this.statusUpdatedOn;
        this.saveAlertData();
      }
    } else {
      if (newStatus === Status.Closed) {
        this.sdaStatusTitle = `Accept SDA(SDA ID:${this.sda.id})`;
      } else if (newStatus === Status.Complete) {
        this.sdaStatusTitle = 'Complete SDA' + (this.sda.id ? `(SDA ID:${this.sda.id})` : '');
      } else if (newStatus === Status.Audited) {
        this.sdaStatusTitle = this.sda.id ? `Audit SDA(SDA ID:${this.sda.id})` : 'Complete SDA';
      } else if (newStatus === Status.Deleted) {
        this.sdaStatusTitle = `Delete/Archive SDA(SDA ID:${this.sda.id})`;
      } else if (newStatus === Status.Rejected) {
        this.sdaStatusTitle = `Reject SDA(SDA ID:${this.sda.id})`;
      }
      this.statusUpdatedOn = new Date();
      this.sdaStatusForm.patchValue({ status: newStatus, completedBy: this.lastModifiedBy, completedOn: this.statusUpdatedOn, comments: '' });
      this.statusModal.show();
    }
  }

  get tomorrow(): Date {
    const tomorrow = moment(new Date()).add(1, 'days');

    return new Date(tomorrow.valueOf());
  }

  saveAlertData() {
    const formData = this.sdaForm.getRawValue();
    const generalSectionData = this.flatten(formData.generalSectionFormGroup);
    generalSectionData.createDate = moment(generalSectionData.createDate).format('YYYY-MM-DD');
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
    const sdaDetail: ISda = Object.assign({}, this.sda,
      {
        lastModifiedBy: this.lastModifiedBy,
        lastModifiedOn: this.lastModifiedOn,

        status: this.sdaForm.get('status').value,
      }
    );
    if (this.sdaForm.value.generalSectionFormGroup) {
      sdaDetail.generalSection = generalSectionData;
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
    let ok = true;
    ok = this.sda.id &&
        (this.currentStatus !== Status.Deleted && this.currentStatus !== Status.Closed) &&
        (this.sda.generalSection.sdrNumber === '' || this.sda.generalSection.sdrNumber == null);

    return ok;
  }
}
