import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms'; 
import { AppStateService } from '../../common/services';
import { BaseFormComponent } from '../base-form.component';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { ICorrosionLevel } from '../../common/models';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-cpcp-disposition-section',
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
       // const localCorrosion: FormControl = this.fb.control(null, Validators.required);
        this.cpcpDispositionSectionFormGroup = this.fb.group({
            nonCpcp: ['', []],
            isCpcpTaskNoCorrect: ['', []],
            isCorrosionLevelCorrect: ['', []],
            corrosionLevel: ['', []],
            reasonsForChange: ['', []],
            reasonsForChangeTextBox: ['', [Validators.maxLength(250)]],
            localCorrosion: ['', [Validators.required]],
            wsCorrosion: ['', [Validators.required]],
            engineeringComments: ['', [Validators.maxLength(250)]],
            qcFeedback: ['', [Validators.maxLength(250)]],
            reviewComplete: ['', [Validators.maxLength(50)]]
        });
        this.parent.addControl(this.formGroupName, this.cpcpDispositionSectionFormGroup);
        this.cpcpDispositionSectionFormGroup.get('nonCpcp').valueChanges
            .subscribe(val => this.setCorrosionTypeFields(val));
    }
    setCorrosionTypeFields(noncpcp: boolean): void {
        if (noncpcp != true) {
           
            this.cpcpDispositionSectionFormGroup.get('localCorrosion').setValidators([Validators.required]);
            this.cpcpDispositionSectionFormGroup.get('wsCorrosion').setValidators([Validators.required]);
        } else {
            this.cpcpDispositionSectionFormGroup.get('localCorrosion').clearValidators();
            this.cpcpDispositionSectionFormGroup.get('wsCorrosion').clearValidators();
        }
        this.cpcpDispositionSectionFormGroup.get('localCorrosion').updateValueAndValidity();
        this.cpcpDispositionSectionFormGroup.get('wsCorrosion').updateValueAndValidity();

    }

    submitToQc() {
        
        this.toastr.success('Notification sent to QC team', 'Success');
    }
    save()
    {
       this.toastr.success('Form Saved', 'Success');
    }
}


