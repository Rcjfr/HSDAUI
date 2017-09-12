import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ICorrosionLevel, IBaseLookUp } from '../../../common/models';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '../../../common/models';
import { AppStateService } from '../../../common/services';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import * as _ from 'lodash';
@Component({
    selector: 'aa-search-by-corrective-action',
    templateUrl: './search-by-corrective-action.component.html',
    styleUrls: ['./search-by-corrective-action.component.less']
})
export class SearchByCorrectiveActionComponent implements OnInit {

    @Output() update: EventEmitter<any> = new EventEmitter<any>();

    correctiveActionForm = new FormGroup({
        isDeferred: new FormControl(),
        isMajorRepair: new FormControl(),
        deferralCode: new FormControl(),
        defectivePartDescription: new FormControl(),
        modifiedPartDescription: new FormControl(),
        repairDescriptionType: new FormControl(),
        majorRepairDescription: new FormControl(),
        completedBy: new FormControl(),
        repairDocumentType: new FormControl(),
        isExternallyVisible: new FormControl(),
        repairHeightFrom: new FormControl(),
        repairHeightTo: new FormControl(),
        repairWidthFrom: new FormControl(),
        repairWidthTo: new FormControl(),
        chapFigRepairText: new FormControl(),
        deferralNo: new FormControl(),
        repairTypes: new FormArray([])
    });
    repairDocumentType: string[] = [];
    majorRepairDescription: string[] = [];
    repairDescriptionTypes$: Observable<List<models.IRepairDescription>>;
    repairDocumentTypes$: Observable<List<models.IRepairDocument>>;
    yesNoOptions: {
        id: number;
        description: string;
    }[];

    constructor(private appStateService: AppStateService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.repairDescriptionTypes$ = this.appStateService.getRepairDescriptions();
        this.repairDocumentTypes$ = this.appStateService.getRepairDocuments();
        this.yesNoOptions = [
            { id: null, description: 'Select' },
            { id: 1, description: 'Yes' },
            { id: 0, description: 'No' }
        ];

        this.correctiveActionForm.valueChanges.subscribe(form => {
            //Remove any empty selections from the multi-select dropdowns
            form.repairDescriptionType = _.compact(form.repairDescriptionType);
            form.repairDocumentType = _.compact(form.repairDocumentType);
            this.update.emit(form);
        });
    }

    onDefectChange(id: string, isChecked: boolean) {
        const repairArray = <FormArray>this.correctiveActionForm.controls.repairTypes;

        if (isChecked) {
            repairArray.push(new FormControl(id));
        } else {
            repairArray.removeAt(repairArray.controls.findIndex(x => x.value === id));
        }
      }
}
