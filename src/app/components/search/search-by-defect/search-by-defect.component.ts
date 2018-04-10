import { Component, OnInit, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AppStateService } from '@app/common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '@app/common/models';
import { FormGroup, FormControl } from '@angular/forms';
import * as _ from 'lodash/lodash.min.js';
import { decimalsNumberMask } from '@app/common/masks';

@Component({
    selector: 'aa-search-by-defect',
    templateUrl: './search-by-defect.component.html',
    styleUrls: ['./search-by-defect.component.less']
})
export class SearchByDefectComponent implements OnInit, OnChanges {
    @Input() criteria: any;

    defectForm = new FormGroup({
        aircraftStation: new FormControl(),
        stringer: new FormControl(),
        waterLine: new FormControl(),
        buttLine: new FormControl(),
        damageType: new FormControl(),
        detectionMethod: new FormControl(),
        detectionMethodOtherDescription: new FormControl(),
        lengthFrom: new FormControl(),
        lengthTo: new FormControl(),
        widthFrom: new FormControl(),
        widthTo: new FormControl(),
        depthFrom: new FormControl(),
        depthTo: new FormControl()
    });
    detectionMethods$: Observable<models.IBaseLookUp[]>;
    damageTypes$: Observable<models.IBaseLookUp[]>;
    decimalsNumberMask = decimalsNumberMask;

    constructor(private appStateService: AppStateService) { }

    ngOnInit() {
        this.detectionMethods$ = this.appStateService.getDetectionMethods();
        this.damageTypes$ = this.appStateService.getDamageTypes();

        this.defectForm.valueChanges.subscribe(form => {
            form.damageType = _.compact(form.damageType);
            form.detectionMethod = _.compact(form.detectionMethod);
         this.criteria.searchByDefect = form;
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.criteria && changes.criteria.currentValue) {
            if (changes.criteria.currentValue.searchByDefect) {
                this.defectForm.patchValue(changes.criteria.currentValue.searchByDefect, { emitEvent: false });
            } else {
                this.defectForm.reset({}, { emitEvent: false });
            }
        }
    }
}
