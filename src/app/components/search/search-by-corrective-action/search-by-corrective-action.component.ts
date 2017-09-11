import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ICorrosionLevel, IBaseLookUp } from '../../../common/models';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '../../../common/models';
import { AppStateService } from '../../../common/services';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
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
        repairType: new FormControl()
    });
    repairDocumentType: string[] = [];
    majorRepairDescription: string[] = [];
    repairDescriptionTypes$: Observable<List<models.IRepairDescription>>;
    repairDocumentTypes$: Observable<List<models.IRepairDocument>>;
    constructor(private appStateService: AppStateService, private formBuilder: FormBuilder) { }
    ngOnInit() {
        this.repairDescriptionTypes$ = this.appStateService.getRepairDescriptions();
        this.repairDocumentTypes$ = this.appStateService.getRepairDocuments();
        this.correctiveActionForm.valueChanges.subscribe(this.update);
    }

}
