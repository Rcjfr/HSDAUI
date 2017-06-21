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
    repairDescriptions$: Observable<List<models.IRepairedDescribe>>; 
    repairDocument$: Observable<List<models.IRepairDocument>>; 
//repairDocument$: Observable<IBaseLookUp[]> = Observable.of([
//        { id: 1, description: 'AARD' },
//        { id: 2, description: 'AARD (w/supporting EA)' },
//        { id: 3, description: 'AMM' },
//        { id: 4, description: 'EA' },
//        { id: 5, description: 'ECO' },
//        { id: 6, description: 'DNF ESO' },
//        { id: 7, description: 'Field EA' },
//        { id: 8, description: 'MCM' },
//        { id: 9, description: 'MRB' },
//        { id: 10, description: 'Shop ESO' },
//        { id: 11, description: 'Shop ESO (w/supporting EA)' },
//        { id: 12, description: 'SRM' },
//        { id: 13, description: 'SRM (w/supporting EA)' },
//        { id: 14, description: 'BCSRPP' },
//]);
constructor(private appStateService: AppStateService) { }
    ngOnInit() {
        this.repairDescriptions$ = this.appStateService.getRepairedDescribe();
        this.repairDocument$ = this.appStateService.getRepairDocument();
    }

}
