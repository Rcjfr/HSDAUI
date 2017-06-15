import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-search-by-corrective-action',
    templateUrl: './search-by-corrective-action.component.html',
    styleUrls: ['./search-by-corrective-action.component.less']
})
export class SearchByCorrectiveActionComponent implements OnInit {
    repairDocument: string[] = [];
    repairDesc: string[] = [];
    constructor() { }

    ngOnInit() {
    }

}
