import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { AppStateService } from '../../common/services';
import { BaseFormComponent } from '../base-form.component';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { ICorrosionLevel } from '../../common/models';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'aa-cpcp-disposition-section',
    templateUrl: './cpcp-disposition-section.component.html',
    styleUrls: ['./cpcp-disposition-section.component.less']
})
export class CpcpDispositionSectionComponent extends BaseFormComponent implements OnInit {
    corrosionLevels$: Observable<List<ICorrosionLevel>>;
    cpcpDispositionSectionFormGroup: FormGroup;
    constructor(private fb: FormBuilder, private appStateService: AppStateService, private toastr: ToastsManager) {
        super('cpcpDispositionSectionFormGroup');
    }

    ngOnInit() {
        this.corrosionLevels$ = this.appStateService.getCorrosionLevels();
        const corrossionLevel: FormControl = this.fb.control({ value: '', disabled: true });
        const clReasonForChange: FormControl = this.fb.control({ value: '', disabled: true });
        this.cpcpDispositionSectionFormGroup = this.fb.group({
            nonCpcp: ['', []],
            isCpcpTaskNoCorrect: ['', []],
            isCorrosionLevelCorrect: ['', []],
            corrosionLevel: corrossionLevel,
            reasonsForChange: clReasonForChange,
            reasonForChangeTextBox: ['', [Validators.maxLength(250)]],
            corrosion: ['', [Validators.required]],
            engineeringComments: ['', []],
            qcFeedback: ['', []],
            reviewComplete: ['', []],
            reviewCompleteText: ['', [Validators.maxLength(50)]]
        });
        this.parent.addControl(this.formGroupName, this.cpcpDispositionSectionFormGroup);
        this.cpcpDispositionSectionFormGroup.get('isCpcpTaskNoCorrect').valueChanges
            .subscribe(val => this.updatecpcpTaskBehavior(val));
        this.cpcpDispositionSectionFormGroup.get('isCorrosionLevelCorrect').valueChanges
            .subscribe(val => this.updateIsCorrosionLevelCorrectBehavior(val));
        this.cpcpDispositionSectionFormGroup.get('nonCpcp').valueChanges
            .subscribe(val => this.updateNonCpcp(val));
        this.cpcpDispositionSectionFormGroup.get('reviewComplete').valueChanges
            .subscribe(val => this.updateReviewComplete(val));
    }

    updateNonCpcp(noncpcp: boolean): void {
        if (!noncpcp) {
            this.cpcpDispositionSectionFormGroup.get('isCpcpTaskNoCorrect').enable();
            this.cpcpDispositionSectionFormGroup.get('isCorrosionLevelCorrect').enable();
            this.cpcpDispositionSectionFormGroup.get('corrosionLevel').enable();
            this.cpcpDispositionSectionFormGroup.get('corrosion').enable();
            this.cpcpDispositionSectionFormGroup.get('reasonsForChange').enable();
            this.cpcpDispositionSectionFormGroup.get('engineeringComments').enable();
            this.cpcpDispositionSectionFormGroup.get('qcFeedback').enable();
            this.cpcpDispositionSectionFormGroup.get('reviewComplete').enable();
            this.cpcpDispositionSectionFormGroup.get('reviewCompleteText').enable();
            this.cpcpDispositionSectionFormGroup.get('cpcpTaskDescriptionFormGroup').get('cpcpTask').enable();

        }
        else {
            this.cpcpDispositionSectionFormGroup.get('isCpcpTaskNoCorrect').reset();
            this.cpcpDispositionSectionFormGroup.get('isCorrosionLevelCorrect').reset();
            this.cpcpDispositionSectionFormGroup.get('corrosionLevel').reset();
            this.cpcpDispositionSectionFormGroup.get('corrosion').reset();
            this.cpcpDispositionSectionFormGroup.get('reasonsForChange').reset();
            this.cpcpDispositionSectionFormGroup.get('engineeringComments').reset();
            this.cpcpDispositionSectionFormGroup.get('qcFeedback').reset();
            this.cpcpDispositionSectionFormGroup.get('reviewComplete').reset();
            this.cpcpDispositionSectionFormGroup.get('reviewCompleteText').reset();
            this.cpcpDispositionSectionFormGroup.get('cpcpTaskDescriptionFormGroup').get('cpcpTask').reset();
            this.cpcpDispositionSectionFormGroup.get('isCpcpTaskNoCorrect').disable();
            this.cpcpDispositionSectionFormGroup.get('isCorrosionLevelCorrect').disable();
            this.cpcpDispositionSectionFormGroup.get('corrosionLevel').disable();
            this.cpcpDispositionSectionFormGroup.get('corrosion').disable();
            this.cpcpDispositionSectionFormGroup.get('reasonsForChange').disable();
            this.cpcpDispositionSectionFormGroup.get('engineeringComments').disable();
            this.cpcpDispositionSectionFormGroup.get('reviewComplete').disable();
            this.cpcpDispositionSectionFormGroup.get('reviewCompleteText').disable();
            this.cpcpDispositionSectionFormGroup.get('qcFeedback').disable();
            this.cpcpDispositionSectionFormGroup.get('cpcpTaskDescriptionFormGroup').get('cpcpTask').disable();
        }
        this.setFeedBackBehavior();
        this.updatecpcpTaskBehavior(1);
        this.updateIsCorrosionLevelCorrectBehavior(1);
    }

    updateReviewComplete(reviewComplete: boolean): void {
        const noncpcpChecked = this.cpcpDispositionSectionFormGroup.get('nonCpcp').value;
        if (!noncpcpChecked) {
            if (!reviewComplete) {
                this.cpcpDispositionSectionFormGroup.get('reviewCompleteText').enable();
                this.cpcpDispositionSectionFormGroup.get('engineeringComments').enable();
                this.cpcpDispositionSectionFormGroup.get('isCpcpTaskNoCorrect').enable();
                this.cpcpDispositionSectionFormGroup.get('corrosion').enable();
                this.cpcpDispositionSectionFormGroup.get('qcFeedback').enable();
                this.cpcpDispositionSectionFormGroup.get('isCorrosionLevelCorrect').enable();
                // this.cpcpDispositionSectionFormGroup.get('noncpcp').enable();
                this.cpcpDispositionSectionFormGroup.get('corrosionLevel').enable();
                this.cpcpDispositionSectionFormGroup.get('reasonsForChange').enable();
                this.cpcpDispositionSectionFormGroup.get('cpcpTaskDescriptionFormGroup').enable();
            }
            else {
                this.cpcpDispositionSectionFormGroup.get('reviewCompleteText').reset();
                this.cpcpDispositionSectionFormGroup.get('reviewCompleteText').disable();
                ///  this.cpcpDispositionSectionFormGroup.get('noncpcp').disable();
                this.cpcpDispositionSectionFormGroup.get('qcFeedback').disable();
                this.cpcpDispositionSectionFormGroup.get('engineeringComments').disable();
                this.cpcpDispositionSectionFormGroup.get('isCpcpTaskNoCorrect').disable();
                this.cpcpDispositionSectionFormGroup.get('corrosion').disable();
                this.cpcpDispositionSectionFormGroup.get('isCorrosionLevelCorrect').disable();
                this.cpcpDispositionSectionFormGroup.get('corrosionLevel').disable();
                this.cpcpDispositionSectionFormGroup.get('reasonsForChange').disable();
                this.cpcpDispositionSectionFormGroup.get('cpcpTaskDescriptionFormGroup').disable();
            }
        }
        // this.setFeedBackBehavior();
        const isCpcpTaskNoCorrect = this.cpcpDispositionSectionFormGroup.get('isCpcpTaskNoCorrect').value;
        const corrosionLevel = this.cpcpDispositionSectionFormGroup.get('isCorrosionLevelCorrect').value;
        if (isCpcpTaskNoCorrect != 0)
            this.cpcpDispositionSectionFormGroup.get('cpcpTaskDescriptionFormGroup').get('cpcpTask').disable();

        if (corrosionLevel != 0) {
            this.cpcpDispositionSectionFormGroup.get('corrosionLevel').disable();
            this.cpcpDispositionSectionFormGroup.get('reasonsForChange').disable();
        }
    }

    updatecpcpTaskBehavior(cpcpTaskNoCorrect: number): void {
        //var reviewComplete = this.cpcpDispositionSectionFormGroup.get('isCpcpTaskNoCorrect').value;
        if (cpcpTaskNoCorrect == 0)
            this.cpcpDispositionSectionFormGroup.get('cpcpTaskDescriptionFormGroup').get('cpcpTask').enable();
        else {
            this.cpcpDispositionSectionFormGroup.get('cpcpTaskDescriptionFormGroup').get('cpcpTask').disable();
            this.cpcpDispositionSectionFormGroup.get('cpcpTaskDescriptionFormGroup').get('cpcpTask').reset();
        }
    }

    updateIsCorrosionLevelCorrectBehavior(correstionLevelCorrect: number): void {
        if (correstionLevelCorrect == 0) {
            this.cpcpDispositionSectionFormGroup.get('corrosionLevel').enable();
            this.cpcpDispositionSectionFormGroup.get('reasonsForChange').enable();
        }
        else {

            this.cpcpDispositionSectionFormGroup.get('reasonsForChange').reset();
            this.cpcpDispositionSectionFormGroup.get('corrosionLevel').reset();
            this.cpcpDispositionSectionFormGroup.get('corrosionLevel').disable();
            this.cpcpDispositionSectionFormGroup.get('reasonsForChange').disable();
        }
        this.setFeedBackBehavior();
    }

    setFeedBackBehavior() {

        const isCorrossionLevel = this.cpcpDispositionSectionFormGroup.get('isCpcpTaskNoCorrect').value;
        const cpcpTaskCorrect = this.cpcpDispositionSectionFormGroup.get('isCorrosionLevelCorrect').value;

        if (cpcpTaskCorrect == "0" || isCorrossionLevel == "0") {
            this.cpcpDispositionSectionFormGroup.get('engineeringComments').setValidators([Validators.required,
            Validators.maxLength(250)]);
            this.cpcpDispositionSectionFormGroup.get('qcFeedback').setValidators([Validators.required,
            Validators.maxLength(250)]);
        }
        else {
            this.cpcpDispositionSectionFormGroup.get('engineeringComments').clearValidators();
            this.cpcpDispositionSectionFormGroup.get('qcFeedback').clearValidators();
        }
        this.cpcpDispositionSectionFormGroup.get('engineeringComments').updateValueAndValidity();
        this.cpcpDispositionSectionFormGroup.get('qcFeedback').updateValueAndValidity();
    }

    submitToQc() {

        this.toastr.success('Notification sent to QC team', 'Success');
    }

    save() {
        this.toastr.success('Form Saved', 'Success');
    }

}


