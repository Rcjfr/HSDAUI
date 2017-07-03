import { Component, OnInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { BaseFormComponent } from '../base-form.component';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';

@Component({
    selector: 'aa-corrective-action-chap',
    templateUrl: './corrective-action-chap.component.html',
    styleUrls: ['./corrective-action-chap.component.less']
})
export class CorrectiveActionChapComponent extends BaseFormComponent implements OnDestroy, OnInit {
    correctiveActionChapFormGroup: FormGroup;
    constructor(private fb: FormBuilder) {
        super('correctiveActionChapFormGroup');
    }
    ngOnInit() {
        this.correctiveActionChapFormGroup = this.fb.group({
            chap: ['', [Validators.maxLength(30), Validators.required]]
        });
        this.parent.addControl(this.formGroupName, this.correctiveActionChapFormGroup);

    }


    ngOnDestroy(): void {
        this.parent.removeControl(this.formGroupName);
    }
}