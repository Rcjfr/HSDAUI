import { Component, OnInit, OnChanges, SimpleChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { AppStateService, AuthService } from '@app/common/services';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '@app/common/models';


@Component({
  selector: 'aa-cpcp-disposition-section',
  templateUrl: './cpcp-disposition-section.component.html',
  styleUrls: ['./cpcp-disposition-section.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CpcpDispositionSectionComponent extends BaseFormComponent implements OnInit, OnChanges {
  @Input() editable = false;

  corrosionLevels$: Observable<models.IBaseLookUp[]>;
  reasons$: Observable<models.IBaseLookUp[]>;
  badgeNo: string;
  displayName: string;

  constructor(private fb: FormBuilder, private appStateService: AppStateService, authService: AuthService) {
    super('cpcpDispositionSectionFormGroup', authService);
    this.formGroup = this.fb.group({
      isNonCPCPRelatedEvent: [false, []],
      isWideSpreadCorrosion: [undefined, []],
      isCorrosionLevelCorrect: [undefined, []],
      correctedCorrosionLevel: [undefined, []],
      isCorrosionTaskNoCorrect: [undefined, []],
      correctedCorrosionTaskNo: [undefined, []],
      corrosionLevelChangeReason: [undefined, []],
      corrosionLevelChangeReasonOtherText: ['', [Validators.maxLength(250)]],

      engineeringComments: ['', []],
      qcFeedback: ['', []],
      isReviewComplete: [false, []],
      reviewer: ['', [Validators.maxLength(50)]],
      reviewerBadgeNo: ['', [Validators.maxLength(50)]],
      submittedToQC: [false, []]
    });
  }

  ngOnInit() {
    this.corrosionLevels$ = this.appStateService.getCorrosionLevels();
    this.reasons$ = this.appStateService.getReasonsForChange();

    this.parent.addControl(this.formGroupName, this.formGroup);
    this.formGroup.get('isCorrosionTaskNoCorrect').valueChanges.filter(v => this.editable).subscribe(val => this.updatecpcpTaskBehavior(val));
    this.formGroup.get('isCorrosionLevelCorrect').valueChanges.filter(v => this.editable).subscribe(val => this.updateIsCorrosionLevelCorrectBehavior(val));
    this.formGroup.get('isNonCPCPRelatedEvent').valueChanges.filter(v => this.editable).subscribe(val => {
      this.updateNonCpcp(val);
    });

    this.formGroup.get('isReviewComplete').valueChanges.filter(v => this.editable).subscribe(val => this.updateReviewComplete(val));
    this.formGroup.get('qcFeedback').valueChanges.filter(v => this.editable).subscribe(val => {
      if (!val) {
        this.formGroup.get('submittedToQC').disable();
      } else {
        this.formGroup.get('submittedToQC').enable();
      }
    });
    this.authService.displayName().take(1).subscribe(u => {
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
        this.formGroup.patchValue(newSda.cpcpDispositionSection, { emitEvent: false });
      } else {
        this.resetToDefaults();
      }

      const isReviewComplete = this.formGroup.get('isReviewComplete').value;
      const isNonCPCPRelatedEvent = this.formGroup.get('isNonCPCPRelatedEvent').value;
      this.updatecpcpTaskBehavior(this.formGroup.get('isCorrosionTaskNoCorrect').value);
      this.updateIsCorrosionLevelCorrectBehavior(this.formGroup.get('isCorrosionLevelCorrect').value);
      if (this.editable === false) {
        this.formGroup.disable({ emitEvent: false });

        return;
      }
      this.formGroup.get('isNonCPCPRelatedEvent').enable({ emitEvent: false });
      this.formGroup.get('isReviewComplete').enable({ emitEvent: false });

      if (!isNonCPCPRelatedEvent) {

        if (isReviewComplete) {
          this.disableSection();
          this.formGroup.get('reviewer').disable();
          this.formGroup.get('reviewerBadgeNo').disable();
        }

      } else {
        this.formGroup.get('isReviewComplete').disable();
        this.formGroup.get('reviewer').disable();
        this.formGroup.get('reviewerBadgeNo').disable();
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
      reviewer: '',
      reviewerBadgeNo: ''
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
      reviewer: '',
      reviewerBadgeNo: ''
    });
  }

  updateNonCpcp(noncpcp: boolean): void {
    if (!noncpcp) {
      this.enableSection();
      this.resetToDefaults();
      this.formGroup.get('isReviewComplete').enable();
      this.formGroup.get('isReviewComplete').reset(false);
      this.formGroup.get('reviewer').enable();
      this.formGroup.get('reviewerBadgeNo').enable();
      this.updatecpcpTaskBehavior(this.formGroup.get('isCorrosionTaskNoCorrect').value);
      this.updateIsCorrosionLevelCorrectBehavior(this.formGroup.get('isCorrosionLevelCorrect').value);
    } else {
      this.disableSection();
      this.resetToEmpty();
      this.formGroup.get('isReviewComplete').disable();
      this.formGroup.get('isReviewComplete').reset(true);
      this.formGroup.get('reviewer').disable();
      this.formGroup.get('reviewerBadgeNo').disable();
      this.formGroup.get('reviewer').reset('Review not required');
      this.formGroup.get('reviewerBadgeNo').reset('Review not required');
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
        this.formGroup.get('reviewerBadgeNo').enable();
        this.formGroup.get('reviewerBadgeNo').reset(undefined);
        this.updatecpcpTaskBehavior(this.formGroup.get('isCorrosionTaskNoCorrect').value);
        this.updateIsCorrosionLevelCorrectBehavior(this.formGroup.get('isCorrosionLevelCorrect').value);
      }
    }
  }

  updatecpcpTaskBehavior(cpcpTaskNoCorrect: boolean): void {
    if (cpcpTaskNoCorrect === false) {
      this.formGroup.get('correctedCorrosionTaskNo').enable();
    } else {
      this.formGroup.get('correctedCorrosionTaskNo').disable();
      this.formGroup.get('correctedCorrosionTaskNo').reset(this.isNonCPCPRelatedEvent() ? undefined : this.sda.cpcpSection.corrosionTaskNo);
    }

  }

  updateIsCorrosionLevelCorrectBehavior(correstionLevelCorrect: boolean): void {
    if (correstionLevelCorrect === false) {
      this.formGroup.get('correctedCorrosionLevel').enable();
      this.formGroup.get('corrosionLevelChangeReason').enable();
    } else {
      this.formGroup.get('correctedCorrosionLevel').disable();
      this.formGroup.get('corrosionLevelChangeReason').disable();
      this.formGroup.get('correctedCorrosionLevel').reset(this.isNonCPCPRelatedEvent() ? undefined : this.sda.cpcpSection.corrosionLevel);
      this.formGroup.get('corrosionLevelChangeReason').reset();
      this.formGroup.get('corrosionLevelChangeReasonOtherText').reset();
    }

  }

  isReviewComplete(): boolean {
    return this.formGroup.get('isReviewComplete').value === true;
  }

  isNonCPCPRelatedEvent(): boolean {
    return this.formGroup.get('isNonCPCPRelatedEvent').value === true;
  }

  isCorrosionLevelCorrect(): boolean {
    return this.formGroup.get('isCorrosionLevelCorrect').value === true;
  }

  isCorrosionTaskNoCorrect(): boolean {
    return this.formGroup.get('isCorrosionTaskNoCorrect').value === true;
  }


}


