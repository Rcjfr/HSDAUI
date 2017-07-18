import {
  Component, OnInit, Input, ViewChildren, ElementRef,
  ViewContainerRef, AfterViewInit, ChangeDetectionStrategy, ContentChildren, ViewChild, AfterContentInit
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
import { ISda } from '../../common/models';
import { GenericValidator } from '../../common/validators/generic-validator';
import { ValidationMessages } from './alert-detail-view.messages';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppStateService } from '../../common/services';

@Component({
  selector: 'aa-alert-detail-view',
  templateUrl: './alert-detail-view.component.html',
  styleUrls: ['./alert-detail-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertDetailViewComponent implements OnInit, AfterContentInit {
  @Input() sda: ISda;
  @Input() loading: boolean;

  // @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  // @ContentChildren(FormControlName, {read:ElementRef, descendants:true}) formInputElements: ElementRef[];
  sdaForm: FormGroup;

  // Use with the generic validation message class
  displayMessage$ = new BehaviorSubject<any>({});

  private genericValidator: GenericValidator;
  constructor(private toastr: ToastsManager,
    private fb: FormBuilder, private elRef: ElementRef,
    public appStateService: AppStateService) {
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
    this.sdaForm = this.fb.group({});

  }
  saveAlert() {
    this.genericValidator.formSubmitted = true;
    this.markAsDirty(this.sdaForm);
    this.displayMessage$.next(this.genericValidator.processMessages(this.sdaForm));
    if (!this.sdaForm.valid) {
      this.logErrors(this.sdaForm);

      return;
    }
    const duringUnscheduledMaintenance = this.sdaForm.value.generalSectionFormGroup.defectDiscoveredDuringSectionFormGroup.defectDiscoveredDuring == "U";
    const generalSectionData = Object.assign({},
      this.sdaForm.value.generalSectionFormGroup,
      this.sdaForm.value.generalSectionFormGroup.aircraftInfoSectionFormGroup,
      this.sdaForm.value.generalSectionFormGroup.ataCodesSectionFormGroup,
      this.sdaForm.value.generalSectionFormGroup.defectDiscoveredDuringSectionFormGroup,
      duringUnscheduledMaintenance
        ? this.sdaForm.value.generalSectionFormGroup.defectDiscoveredDuringSectionFormGroup.unscheduledMaintenanceGroup
        : this.sdaForm.value.generalSectionFormGroup.defectDiscoveredDuringSectionFormGroup.scheduledMaintenanceGroup
    );
    const defectLocationData = Object.assign({},
      this.sdaForm.value.defectLocationSectionFormGroup,
      this.sdaForm.value.defectLocationSectionFormGroup.preciseLocationGroup
    );
    const causeOfDamageGroup = this.sdaForm.value.cpcpSectionGroup.causeOfDamageGroup;
    let causesOfDamage: any = (causeOfDamageGroup.blockedDrain ? 2 : 0) +
      (causeOfDamageGroup.chemicalSpill ? 4 : 0) +
      (causeOfDamageGroup.damageOther ? 256 : 0) +
      (causeOfDamageGroup.environment ? 0 : 0) +
      (causeOfDamageGroup.galleySpill ? 1 : 0) +
      (causeOfDamageGroup.hardwareNotInstalled ? 32 : 0) +
      (causeOfDamageGroup.missingCorrosionInhibitor ? 128 : 0) +
      (causeOfDamageGroup.missingFloorBoardTape ? 16 : 0) +
      (causeOfDamageGroup.poorSealingPractices ? 64 : 0) +
      (causeOfDamageGroup.wetInsulationBlanket ? 8 : 0);
    if (causesOfDamage == 0 && !causeOfDamageGroup.environment) {
      causesOfDamage = null;
    }


    const cpcpSectionData = Object.assign({},
      this.sdaForm.value.cpcpSectionGroup,
      {
        
        causesOfDamage: causesOfDamage
      },
      this.sdaForm.value.cpcpSectionGroup.causeOfDamageGroup.causeOfDamageDescriptionGroup,
    );
    const correctiveActionSection = this.sdaForm.value.correctiveActionFormGroup;
    const correctiveActionData = {
      isDeferred: correctiveActionSection.deferredSectionOptions,
      DeferralCode: correctiveActionSection.deferralCode,
      DeferralNo: correctiveActionSection.deferral,
      RepairType: correctiveActionSection.correctiveActionOptionFormGroup.correctiveActionOptions,
      DefectivePartDescription: correctiveActionSection.correctiveActionOptionFormGroup.defectivePartDescription,
      ModifiedPartDescription: correctiveActionSection.correctiveActionOptionFormGroup.modifiedpartDescription,
      RepairDescriptionType: correctiveActionSection.correctiveActionOptionFormGroup.correctiveActionRepairDescriptionFormGroup.repairedDescribe,
      RepairDocumentType: correctiveActionSection.correctiveActionOptionFormGroup.correctiveActionRepairDescriptionFormGroup.repairDocument,
      ChapFigRepairText: correctiveActionSection.correctiveActionOptionFormGroup.correctiveActionRepairDescriptionFormGroup.correctiveActionChapFormGroup.chap,
      EngineeringAuthorization: correctiveActionSection.correctiveActionOptionFormGroup.correctiveActionRepairDescriptionFormGroup.engineeringAuthorization,
      IsExternallyVisible: correctiveActionSection.correctiveActionOptionFormGroup.correctiveActionRepairDescriptionFormGroup.externalVisible,
      RepairHeight: correctiveActionSection.correctiveActionOptionFormGroup.correctiveActionRepairDescriptionFormGroup.height,
      RepairWidth: correctiveActionSection.correctiveActionOptionFormGroup.correctiveActionRepairDescriptionFormGroup.repairWidth,
      IsMajorRepair: correctiveActionSection.majorRepairOptions,
      MajorRepairDescription: correctiveActionSection.repairDescription,
      CompletedBy: correctiveActionSection.completedBy,
      CompletedDate: correctiveActionSection.completedDate
    };
    
    const sdaDetail: ISda = Object.assign({}, this.sda,
      {
        lastModifiedBy: 'badgeid',
        lastModifiedOn: new Date(),
        statusUpdatedBy: 'badgeid',
        statusUpdatedOn: new Date(),
        generalSection: generalSectionData,
        defectLocationSection: defectLocationData,
        cPCPSection: cpcpSectionData,
        correctiveActionSection: correctiveActionData
      }
    );
    this.appStateService.saveSda(sdaDetail);
    //this.toastr.success('Details entered are valid', 'Success');
  }

  logErrors(group: FormGroup | FormArray) {

    for (const i in group.controls) {
      if (group.controls[i] instanceof FormControl) {
        if (group.controls[i].errors) { console.log(i, group.controls[i].errors); }
        // if(group.controls[i].invalid){
        //   console.log(group.controls[i]);
        // }
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