import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { AppStateService } from '../../common/services';
import { BaseFormComponent } from '../base-form.component';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { ICorrosionLevel } from '../../common/models';

@Component({
  selector: 'app-cpcp-disposition-section',
  templateUrl: './cpcp-disposition-section.component.html',
  styleUrls: ['./cpcp-disposition-section.component.less']
})
export class CpcpDispositionSectionComponent extends BaseFormComponent implements OnInit {
    corrosionLevels$: Observable<List<ICorrosionLevel>>;
    cpcpDispositionSectionFormGroup: FormGroup;
    constructor(private fb: FormBuilder, private appStateService: AppStateService) {
        super('cpcpDispositionSectionFormGroup');
    }

    ngOnInit() {
        this.corrosionLevels$ = this.appStateService.getCorrosionLevels();
        this.cpcpDispositionSectionFormGroup = this.fb.group({
            nonCpcp: ['', []],
            isCpcpTaskNoCorrect: ['', []],
            isCorrosionLevelCorrect: ['', []],
            corrosionLevel: ['', []],
            reasonsForChange: ['', []],
            localCorrosion: ['', [Validators.required]],
            wideSpreadCorrosion: ['', [Validators.required]],
            engineeringComments: ['', []],
            qcFeedback: ['', []],
            reviewComplete: ['', []]
        });
  }

}
