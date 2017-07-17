import { Component, OnInit } from '@angular/core';
import { ICorrosionLevel, IBaseLookUp } from '../../../common/models';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '../../../common/models';
import { AppStateService } from '../../../common/services';
@Component({
    selector: 'aa-search-by-corrective-action',
    templateUrl: './search-by-corrective-action.component.html',
    styleUrls: ['./search-by-corrective-action.component.less']
})
export class SearchByCorrectiveActionComponent implements OnInit {
    repairDocumentType: string[] = [];
    majorRepairDescription: string[] = [];
    repairDescriptionTypes$: Observable<List<models.IRepairDescriptionType>>;
    repairDocumentTypes$: Observable<List<models.IRepairDocumentType>>;
constructor(private appStateService: AppStateService) { }
    ngOnInit() {
        this.repairDescriptionTypes$ = this.appStateService.getRepairDescriptionTypes();
        this.repairDocumentTypes$ = this.appStateService.getRepairDocumentTypes();
    }

}
