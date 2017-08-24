import {
  Component, OnInit, Input, ViewChildren, ElementRef,
  ViewContainerRef, AfterViewInit, ChangeDetectionStrategy, ContentChildren, ViewChild, AfterContentInit, EventEmitter, Output, HostListener, OnDestroy
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
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable, Subscription } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppStateService, AuthService } from '../../common/services';
import { Router } from '@angular/router';

@Component({
  selector: 'aa-alert-detail-view',
  templateUrl: './alert-detail-view.component.html',
  styleUrls: ['./alert-detail-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertDetailViewComponent implements OnInit, AfterContentInit, OnDestroy {
  getCurrentSdaIdSubscription: Subscription;
  @Input() sda: ISda;
  @Input() loading: boolean;
  @Output() onReset = new EventEmitter();
  lastModifiedBy: string;
  statusUpdatedBy: string;
  lastModifiedOn: Date = new Date();
  statusUpdatedOn: Date = new Date();
  public Status = Status;// to make it available in template
  public currentStatus: number;


  // @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  // @ContentChildren(FormControlName, {read:ElementRef, descendants:true}) formInputElements: ElementRef[];
  sdaForm: FormGroup;

  // Use with the generic validation message class
  displayMessage$ = new BehaviorSubject<any>({});

  private genericValidator: GenericValidator;
  constructor(private toastr: ToastsManager,
    private fb: FormBuilder, private elRef: ElementRef, private router: Router,
    public appStateService: AppStateService, public authService: AuthService) {
    this.sdaForm = this.fb.group({
      status: ['', [Validators.required]],
    });
    this.genericValidator = new GenericValidator(ValidationMessages);
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
    this.currentStatus = this.sda.status;
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
  saveAlert(newStatus: number) {
    this.sda.status = newStatus;
    this.sdaForm.patchValue({ status: newStatus });

    setTimeout(() => {
      this.saveAlertData(newStatus);
    }, 100);
  }

  saveAlertData(newStatus: number) {
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
    const a = 1;
    if (a === 1) {
      this.toastr.success('Details entered are valid.', 'Success');
      return;
    }
    const generalSectionData = this.flatten(this.sdaForm.value.generalSectionFormGroup);
    generalSectionData.createDate = moment(generalSectionData.createDate).format('YYYY-MM-DD');
    const defectLocationData = this.flatten(this.sdaForm.value.defectLocationSectionFormGroup);
    const causeOfDamageGroup = this.sdaForm.value.cpcpSectionGroup.causeOfDamageGroup;
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
    const cpcpSectionData = Object.assign(this.flatten(this.sdaForm.value.cpcpSectionGroup), { causesOfDamage: causesOfDamage });
    const correctiveActionData = this.flatten(this.sdaForm.value.correctiveActionFormGroup);
    if (correctiveActionData.completedDate) {
      correctiveActionData.completedDate = moment(correctiveActionData.completedDate).format('YYYY-MM-DD');
    }
    const sdaDetail: ISda = Object.assign({}, this.sda,
      {
        lastModifiedBy: this.lastModifiedBy,
        lastModifiedOn: this.lastModifiedOn,
        statusUpdatedBy: this.statusUpdatedBy,
        statusUpdatedOn: this.statusUpdatedOn,
        generalSection: generalSectionData,
        defectLocationSection: defectLocationData,
        cpcpSection: cpcpSectionData,
        correctiveActionSection: correctiveActionData
      }
    );
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
        // if(group.controls[i].invalid){
        //   console.log(group.controls[i]);
        // }
      } else {
        this.markAsDirty(group.controls[i]);
      }
    }
  }
}
