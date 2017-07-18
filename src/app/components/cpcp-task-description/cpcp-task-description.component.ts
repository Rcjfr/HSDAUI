import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormControlName } from '@angular/forms';
import { BaseFormComponent } from '../base-form.component';

@Component({
  selector: 'aa-cpcp-task-description',
  templateUrl: './cpcp-task-description.component.html',
  styleUrls: ['./cpcp-task-description.component.less']
})
export class CpcpTaskDescriptionComponent extends BaseFormComponent implements OnDestroy, OnInit {
    cpcpTaskDescriptionFormGroup: FormGroup;

    constructor(private fb: FormBuilder) {
        super('cpcpTaskDescriptionFormGroup');
    }
    loadData() {
    }
    ngOnInit() {
        this.cpcpTaskDescriptionFormGroup = this.fb.group({
            cpcpTask: new FormControl({ value: '', disabled: true }, [Validators.maxLength(25), Validators.required])
           //cpcpTask: ['', [Validators.maxLength(25), Validators.required, ]]
    });
        this.parent.addControl(this.formGroupName, this.cpcpTaskDescriptionFormGroup);

  }
    ngOnDestroy(): void {
        this.parent.removeControl(this.formGroupName);
    }
}