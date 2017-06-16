import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../../common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { IDetectionMethod } from '../../../common/models';

@Component({
    selector: 'app-search-by-defect',
    templateUrl: './search-by-defect.component.html',
    styleUrls: ['./search-by-defect.component.less']
})
export class SearchByDefectComponent implements OnInit {
    detectionMethods$: Observable<List<IDetectionMethod>>;
    constructor(private appStateService: AppStateService) { }

    ngOnInit() {
        this.detectionMethods$ = this.appStateService.getDetectionMethods();
    }

}
