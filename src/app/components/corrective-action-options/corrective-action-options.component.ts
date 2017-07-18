import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChildren, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator, Expressions } from '../../common/validators/generic-validator';
import { CustomValidators } from '../../common/validators/custom-validators';
import { BaseFormComponent } from '../base-form.component';

@Component({
    selector: 'aa-corrective-action-options',
    templateUrl: './corrective-action-options.component.html',
    styleUrls: ['./corrective-action-options.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorrectiveActionOptionsComponent extends BaseFormComponent implements OnInit, OnDestroy {
   correctiveActionOptionFormGroup: FormGroup;
    constructor(private fb: FormBuilder) {
        super('correctiveActionOptionFormGroup');
    }
    loadData() {
    }
    ngOnInit() {
        this.correctiveActionOptionFormGroup = this.fb.group({
            repairType: ['', []],
            modifiedpartDescription: ['', [, Validators.maxLength(30)]],
            defectivePartDescription: ['', [, Validators.maxLength(30)]]
        });
        this.parent.addControl(this.formGroupName, this.correctiveActionOptionFormGroup);
    }
    
    ngOnDestroy() {
        this.parent.removeControl(this.formGroupName);
    }
}
