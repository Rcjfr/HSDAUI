import { Component, OnInit } from '@angular/core';
import { ICorrosionLevel, IBaseLookUp } from '../../../common/models';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-search-by-corrective-action',
    templateUrl: './search-by-corrective-action.component.html',
    styleUrls: ['./search-by-corrective-action.component.less']
})
export class SearchByCorrectiveActionComponent implements OnInit {
    repairDocument: string[] = [];
    repairDesc: string[] = [];
repairedDesc$: Observable<IBaseLookUp[]> = Observable.of([
    { id: 1, description: 'Bonded Repair' },
    { id: 2, description: 'Bore/Fastener Hole(s) Rework' },
    { id: 3, description: 'Complex Repair' },
    { id: 4, description: 'Doubler Repair, External' },
    { id: 5, description: 'Doubler Repair, Flush' },
    { id: 6, description: 'Doubler Repair, Internal' },
    { id: 7, description: 'Non-reinforcing, Repair' },
    { id: 8, description: 'Non-reinforcing-Supplemental Inspection-MINOR' },
    { id: 9, description: 'Part Replacement - Entire' },
    { id: 10, description: 'Replacement - Sub Assembly' },
    { id: 11, description: 'Refinish - Scribe Line' },
    { id: 12, description: 'Reinforcing - Modification' },
    { id: 13, description: 'Restore Bonded Material' },
    { id: 14, description: 'Splice Repair' },
    { id: 15, description: 'Part Reinforcement ( Nested Angles)' },
    { id: 16, description: 'Plug-Fastener' },
    { id: 17, description: 'Other' }
    ]);
repairDocument$: Observable<IBaseLookUp[]> = Observable.of([
        { id: 1, description: 'AARD' },
        { id: 2, description: 'AARD (w/supporting EA)' },
        { id: 3, description: 'AMM' },
        { id: 4, description: 'EA' },
        { id: 5, description: 'ECO' },
        { id: 6, description: 'DNF ESO' },
        { id: 7, description: 'Field EA' },
        { id: 8, description: 'MCM' },
        { id: 9, description: 'MRB' },
        { id: 10, description: 'Shop ESO' },
        { id: 11, description: 'Shop ESO (w/supporting EA)' },
        { id: 12, description: 'SRM' },
        { id: 13, description: 'SRM (w/supporting EA)' },
        { id: 14, description: 'BCSRPP' },
]);
    constructor() { }
    ngOnInit() {
    }

}
