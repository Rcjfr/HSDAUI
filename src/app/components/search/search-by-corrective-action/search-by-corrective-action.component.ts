import { Component, OnInit, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IBaseLookUp, IYesNoBoth } from '@app/common/models';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '@app/common/models';
import { AppStateService, UtilityService } from '@app/common/services';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import * as _ from 'lodash';

@Component({
    selector: 'aa-search-by-corrective-action',
    templateUrl: './search-by-corrective-action.component.html',
    styleUrls: ['./search-by-corrective-action.component.less']
})
export class SearchByCorrectiveActionComponent implements OnInit, OnChanges {
    @Input() criteria: any;

    correctiveActionForm = new FormGroup({
        isDeferred: new FormControl(''),
        isMajorRepair: new FormControl(''),
        deferralCode: new FormControl(),
        defectivePartDescription: new FormControl(),
        modifiedPartDescription: new FormControl(),
        repairDescriptionType: new FormControl(),
        majorRepairDescription: new FormControl(),
        completedBy: new FormControl(),
        repairDocumentType: new FormControl(),
        engineeringAuthorization: new FormControl(),
        isExternallyVisible: new FormControl(''),
        repairHeightFrom: new FormControl(),
        repairHeightTo: new FormControl(),
        repairWidthFrom: new FormControl(),
        repairWidthTo: new FormControl(),
        chapFigRepairText: new FormControl(),
        deferralNo: new FormControl(),
        repairType: new FormArray([])
    });
    repairDocumentType: string[] = [];
    majorRepairDescription: string[] = [];
    repairDescriptionTypes$: Observable<models.IBaseLookUp[]>;
    repairDocumentTypes$: Observable<models.IBaseLookUp[]>;
    yesNoBothOptions$: Observable<IYesNoBoth[]>;
    isDeferred: string[] = [];
    isMajorRepair: string[] = [];
    isExternallyVisible: string[] = [];
    constructor(private appStateService: AppStateService, private utilityService: UtilityService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.repairDescriptionTypes$ = this.appStateService.getRepairDescriptions();
        this.repairDocumentTypes$ = this.appStateService.getRepairDocuments();
        this.yesNoBothOptions$ = this.utilityService.getYesNoBothOptions();

        this.correctiveActionForm.valueChanges.subscribe(form => {
            //Remove any empty selections from the multi-select dropdowns
            form.repairDescriptionType = _.compact(form.repairDescriptionType);
            form.repairDocumentType = _.compact(form.repairDocumentType);
            this.criteria.searchByCorrectiveAction = form;
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.criteria && changes.criteria.currentValue) {
            const repairArray = <FormArray>this.correctiveActionForm.controls.repairType;

            if (changes.criteria.currentValue.searchByCorrectiveAction) {
                this.correctiveActionForm.patchValue(changes.criteria.currentValue.searchByCorrectiveAction, { emitEvent: false });
                //FormArray values are not clearing properly after reset()/patch(), see: https://github.com/angular/angular/pull/11051
                while ((repairArray).length) {
                    repairArray.removeAt(0);
                }
                //Repair Type checkboxes
                if (changes.criteria.currentValue.searchByCorrectiveAction.repairType) {
                  changes.criteria.currentValue.searchByCorrectiveAction.repairType.forEach(element => {
                      repairArray.push(new FormControl(element));
                  });
                }
            } else {
                this.correctiveActionForm.reset({
                    isDeferred: '',
                    isMajorRepair: '',
                    isExternallyVisible: ''
                }, { emitEvent: false });
                //FormArray values are not clearing properly after reset()/patch(), see: https://github.com/angular/angular/pull/11051
                while ((repairArray).length) {
                    repairArray.removeAt(0);
                }
            }
        }
    }

    onDefectChange(id: number, isChecked: boolean) {
        const repairArray = <FormArray>this.correctiveActionForm.controls.repairType;

        if (isChecked) {
            repairArray.push(new FormControl(id));
        } else {
            repairArray.removeAt(repairArray.controls.findIndex(x => x.value === id));
        }
    }

    defectContains(id: number) {
        if (_.includes(this.correctiveActionForm.controls.repairType.value, id)) {
            return true;
        }

        return false;
    }
}
