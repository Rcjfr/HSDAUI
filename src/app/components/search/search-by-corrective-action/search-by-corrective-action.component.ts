import { Component, OnInit } from '@angular/core';
import { ICorrosionLevel, IBaseLookUp } from '../../../common/models';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '../../../common/models';
import { AppStateService } from '../../../common/services';
@Component({
    selector: 'app-search-by-corrective-action',
    templateUrl: './search-by-corrective-action.component.html',
    styleUrls: ['./search-by-corrective-action.component.less']
})
export class SearchByCorrectiveActionComponent implements OnInit {
    repairDocument: string[] = [];
    repairDesc: string[] = [];
    repairDescriptions$: Observable<List<models.IRepairDescription>>; 
    repairDocuments$: Observable<List<models.IRepairDocument>>;
constructor(private appStateService: AppStateService) { }
    ngOnInit() {
        this.repairDescriptions$ = this.appStateService.getRepairDescriptions();
        this.repairDocuments$ = this.appStateService.getRepairDocuments();
    }

}
