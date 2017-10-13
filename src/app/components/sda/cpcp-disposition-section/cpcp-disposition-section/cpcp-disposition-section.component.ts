import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { AppStateService, AuthService } from '../../../../common/services';
import { BaseFormComponent } from '../../base-form.component';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '../../../../common/models';


@Component({
  selector: 'aa-cpcp-disposition-section',
  templateUrl: './cpcp-disposition-section.component.html',
  styleUrls: ['./cpcp-disposition-section.component.less']
})
export class CpcpDispositionSectionComponent extends BaseFormComponent implements OnInit, OnChanges {
  corrosionLevels$: Observable<List<models.ICorrosionLevel>>;
  reasons$: Observable<List<models.IReasonForChange>>;
  @Input() editable = false;
  badgeNo: string;
  displayName: string;
  constructor(private fb: FormBuilder, private appStateService: AppStateService, authService: AuthService) {
    super('cpcpDispositionSectionFormGroup', authService);
    this.formGroup = this.fb.group({
      isNonCPCPRelatedEvent: [false, []],
      isWideSpreadCorrosion: [undefined, [Validators.required]],
      isCorrosionLevelCorrect: [undefined, [Validators.required]],
      correctedCorrosionLevel: [undefined, [Validators.required]],
      isCorrosionTaskNoCorrect: [undefined, [Validators.required]],
      correctedCorrosionTaskNo: [undefined, [Validators.required]],
      corrosionLevelChangeReason: [undefined, []],
      corrosionLevelChangeReasonOtherText: ['', [Validators.maxLength(250)]],

      engineeringComments: ['', []],
      qcFeedback: ['', []],
      isReviewComplete: ['', []],
      reviewer: ['', [Validators.maxLength(50)]],
      reviewerBadgeNo: ['', []],
      submittedToQC: [false, []]
    });
  }

  ngOnInit() {
    this.corrosionLevels$ = this.appStateService.getCorrosionLevels();
    this.reasons$ = this.appStateService.getReasonsForChange();

    this.parent.addControl(this.formGroupName, this.formGroup);
    this.formGroup.get('isCorrosionTaskNoCorrect').valueChanges.subscribe(val => this.updatecpcpTaskBehavior(val));
    this.formGroup.get('isCorrosionLevelCorrect').valueChanges.subscribe(val => this.updateIsCorrosionLevelCorrectBehavior(val));
    this.formGroup.get('isNonCPCPRelatedEvent').valueChanges.subscribe(val => this.updateNonCpcp(val));

    this.formGroup.get('isReviewComplete').valueChanges.subscribe(val => this.updateReviewComplete(val));
    this.formGroup.get('qcFeedback').valueChanges.subscribe(val => {
      if (!val) {
        this.formGroup.get('submittedToQC').disable();
      } else {
        this.formGroup.get('submittedToQC').enable();
      }
    });
    this.authService.auditDisplayName().take(1).subscribe(u => {
      this.displayName = u;
    });
    this.authService.badgeId().take(1).subscribe(u => {
      this.badgeNo = u;
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sda) {
      const newSda: models.ISda = changes.sda.currentValue;
      if (newSda.cpcpDispositionSection && newSda.cpcpDispositionSection.isNonCPCPRelatedEvent != null) {
        this.formGroup.patchValue(newSda.cpcpDispositionSection);
      } else {
        this.resetToDefaults();
      }

      const isReviewComplete = this.formGroup.get('isReviewComplete').value;
      const isNonCPCPRelatedEvent = this.formGroup.get('isNonCPCPRelatedEvent').value;
      this.updatecpcpTaskBehavior(this.formGroup.get('isCorrosionTaskNoCorrect').value);
      this.updateIsCorrosionLevelCorrectBehavior(this.formGroup.get('isCorrosionLevelCorrect').value);
      if (!isNonCPCPRelatedEvent) {
        if (isReviewComplete) {
          this.disableSection();
          this.formGroup.get('reviewer').disable();
        }
      } else {
        this.formGroup.get('isReviewComplete').disable();
        this.formGroup.get('reviewer').disable();
      }
      if (this.editable === false) {
        this.formGroup.disable();
      }

    }
  }
  resetToDefaults(): void {
    this.formGroup.patchValue({
      isCorrosionTaskNoCorrect: undefined,
      correctedCorrosionTaskNo: this.sda.cpcpSection.corrosionTaskNo,
      isCorrosionLevelCorrect: undefined,
      correctedCorrosionLevel: this.sda.cpcpSection.corrosionLevel,
      corrosionLevelChangeReason: null,
      engineeringComments: '',
      qcFeedback: '',
      corrosionLevelChangeReasonOtherText: '',
      isWideSpreadCorrosion: undefined,
      submittedToQC: false,
      reviewer: ''
    });
  }
  resetToEmpty(): void {
    this.formGroup.patchValue({
      isCorrosionTaskNoCorrect: undefined,
      correctedCorrosionTaskNo: undefined,
      isCorrosionLevelCorrect: undefined,
      correctedCorrosionLevel: undefined,
      corrosionLevelChangeReason: undefined,
      engineeringComments: undefined,
      qcFeedback: undefined,
      corrosionLevelChangeReasonOtherText: undefined,
      isWideSpreadCorrosion: undefined,
      submittedToQC: false,
      reviewer: ''
    });
  }
  updateNonCpcp(noncpcp: boolean): void {
    if (!noncpcp) {
      this.enableSection();
      this.resetToDefaults();
      this.formGroup.get('isReviewComplete').enable();
      this.formGroup.get('isReviewComplete').reset(false);
      this.formGroup.get('reviewer').enable();
      //this.formGroup.get('reviewer').reset(this.displayName);
      //this.formGroup.get('reviewerBadgeNo').reset(this.badgeNo);
      this.updatecpcpTaskBehavior(this.formGroup.get('isCorrosionTaskNoCorrect').value);
      this.updateIsCorrosionLevelCorrectBehavior(this.formGroup.get('isCorrosionLevelCorrect').value);
    } else {
      this.disableSection();
      this.resetToEmpty();
      this.formGroup.get('isReviewComplete').disable();
      this.formGroup.get('isReviewComplete').reset(true);
      this.formGroup.get('reviewer').disable();
      this.formGroup.get('reviewer').reset('Review not required');
    }


  }
  enableSection(): void {
    this.formGroup.get('isCorrosionTaskNoCorrect').enable();
    this.formGroup.get('correctedCorrosionTaskNo').enable();
    this.formGroup.get('isCorrosionLevelCorrect').enable();
    this.formGroup.get('correctedCorrosionLevel').enable();
    this.formGroup.get('corrosionLevelChangeReason').enable();
    this.formGroup.get('corrosionLevelChangeReasonOtherText').enable();
    this.formGroup.get('isWideSpreadCorrosion').enable();
    this.formGroup.get('qcFeedback').enable();
    this.formGroup.get('engineeringComments').enable();
    this.formGroup.get('submittedToQC').enable();

  }
  disableSection(): void {
    this.formGroup.get('isCorrosionTaskNoCorrect').disable();
    this.formGroup.get('correctedCorrosionTaskNo').disable();
    this.formGroup.get('isCorrosionLevelCorrect').disable();
    this.formGroup.get('correctedCorrosionLevel').disable();
    this.formGroup.get('corrosionLevelChangeReason').disable();
    this.formGroup.get('corrosionLevelChangeReasonOtherText').disable();
    this.formGroup.get('isWideSpreadCorrosion').disable();
    this.formGroup.get('qcFeedback').disable();
    this.formGroup.get('engineeringComments').disable();
    this.formGroup.get('submittedToQC').disable();
  }
  updateReviewComplete(reviewComplete: boolean): void {
    const isNonCPCPRelatedEvent = this.formGroup.get('isNonCPCPRelatedEvent').value;
    if (!isNonCPCPRelatedEvent) {
      if (reviewComplete) {
        //this.disableSection();
        //this.formGroup.get('reviewer').disable();
        this.formGroup.get('reviewer').reset(this.displayName);
        this.formGroup.get('reviewerBadgeNo').reset(this.badgeNo);
      } else {
        this.enableSection();
        this.formGroup.get('reviewer').enable();
        this.formGroup.get('reviewer').reset(undefined);
        this.formGroup.get('reviewerBadgeNo').reset(undefined);
        this.updatecpcpTaskBehavior(this.formGroup.get('isCorrosionTaskNoCorrect').value);
        this.updateIsCorrosionLevelCorrectBehavior(this.formGroup.get('isCorrosionLevelCorrect').value);
      }
      this.setFeedBackBehavior();
    }


  }

  updatecpcpTaskBehavior(cpcpTaskNoCorrect: boolean): void {
    if (cpcpTaskNoCorrect === false) {
      this.formGroup.get('correctedCorrosionTaskNo').enable();
    } else {
      this.formGroup.get('correctedCorrosionTaskNo').disable();
      this.formGroup.get('correctedCorrosionTaskNo').reset(this.sda.cpcpSection.corrosionTaskNo);
    }

  }

  updateIsCorrosionLevelCorrectBehavior(correstionLevelCorrect: boolean): void {
    if (correstionLevelCorrect === false) {
      this.formGroup.get('correctedCorrosionLevel').enable();
      this.formGroup.get('corrosionLevelChangeReason').enable();
    } else {
      this.formGroup.get('correctedCorrosionLevel').disable();
      this.formGroup.get('corrosionLevelChangeReason').disable();
    }

  }

  setFeedBackBehavior() {

    const isCorrossionLevel: boolean = this.formGroup.get('isCorrosionTaskNoCorrect').value;
    const cpcpTaskCorrect: boolean = this.formGroup.get('isCorrosionLevelCorrect').value;
    if (this.isReviewComplete()) {
      this.formGroup.get('isCorrosionTaskNoCorrect').setValidators([Validators.required]);
      this.formGroup.get('isCorrosionLevelCorrect').setValidators([Validators.required]);

      if (!cpcpTaskCorrect || !isCorrossionLevel) {
        this.formGroup.get('engineeringComments').setValidators([Validators.required,
        Validators.maxLength(250)]);
        this.formGroup.get('qcFeedback').setValidators([Validators.required,
        Validators.maxLength(250)]);

      } else {
        this.formGroup.get('engineeringComments').clearValidators();
        this.formGroup.get('qcFeedback').clearValidators();

      }

      if (this.formGroup.get('correctedCorrosionLevel').value !== this.sda.cpcpSection.corrosionLevel) {
        this.formGroup.get('corrosionLevelChangeReason').setValidators([Validators.required]);
      } else {
        this.formGroup.get('corrosionLevelChangeReason').clearValidators();
      }
    } else {
      this.formGroup.get('isCorrosionTaskNoCorrect').clearValidators();
      this.formGroup.get('isCorrosionLevelCorrect').clearValidators();
    }


    this.formGroup.get('engineeringComments').updateValueAndValidity();
    this.formGroup.get('qcFeedback').updateValueAndValidity();
  }

  isReviewComplete(): boolean {
    return this.formGroup.get('isReviewComplete').value === true;
  }
  isNonCPCPRelatedEvent(): boolean {
    return this.formGroup.get('isNonCPCPRelatedEvent').value === true;
  }
  isCorrosionLevelCorrect(): boolean {
    return this.formGroup.get('isCorrosionLevelCorrect').value === false;
  }
  isCorrosionTaskNoCorrect(): boolean {
    return this.formGroup.get('isCorrosionTaskNoCorrect').value === false;
  }


}


