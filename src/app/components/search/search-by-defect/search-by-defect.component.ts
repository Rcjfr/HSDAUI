import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../../common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '../../../common/models';

@Component({
    selector: 'app-search-by-defect',
    templateUrl: './search-by-defect.component.html',
    styleUrls: ['./search-by-defect.component.less']
})
export class SearchByDefectComponent implements OnInit {
  detectionMethods$: Observable<List<models.IDetectionMethod>>;
  damageTypes$: Observable<List<models.IDamageType>>;
    constructor(private appStateService: AppStateService) { }

    ngOnInit() {
      this.detectionMethods$ = this.appStateService.getDetectionMethods();
      this.damageTypes$ = this.appStateService.getDamageTypes();
    }

}
