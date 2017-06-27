import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { BaseFormComponent } from '../base-form.component';

@Component({
  selector: 'app-cpcp-task-description',
  templateUrl: './cpcp-task-description.component.html',
  styleUrls: ['./cpcp-task-description.component.less']
})
export class CpcpTaskDescriptionComponent extends BaseFormComponent implements OnDestroy,OnInit {
    cpcpTaskDescriptionFormGroup: FormGroup;
    constructor(private fb: FormBuilder) {
        super('cpcpTaskDescriptionFormGroup');}

    ngOnInit() {
        this.cpcpTaskDescriptionFormGroup = this.fb.group({
            cpcpTask: ['', [Validators.maxLength(25), Validators.required]]
    });
        this.parent.addControl(this.formGroupName, this.cpcpTaskDescriptionFormGroup);
    
  }
    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}