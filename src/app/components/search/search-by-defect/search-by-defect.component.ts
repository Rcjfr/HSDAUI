import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { AppStateService } from '../../../common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import * as models from '../../../common/models';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'aa-search-by-defect',
    templateUrl: './search-by-defect.component.html',
    styleUrls: ['./search-by-defect.component.less']
})
export class SearchByDefectComponent implements OnInit {
    @Output() update: EventEmitter<any> = new EventEmitter<any>();

    defectForm = new FormGroup({
        aircraftStation: new FormControl(),
        stringer: new FormControl(),
        waterLine: new FormControl(),
        buttLine: new FormControl(),
        damageType: new FormControl(),
        detectionMethod: new FormControl(),
        lengthFrom: new FormControl(),
        lengthTo: new FormControl(),
        widthFrom: new FormControl(),
        widthTo: new FormControl(),
        depthFrom: new FormControl(),
        depthTo: new FormControl()
    });
  detectionMethods$: Observable<List<models.IDetectionMethod>>;
  damageTypes$: Observable<List<models.IDamageType>>;
    constructor(private appStateService: AppStateService) { }

    ngOnInit() {
      this.detectionMethods$ = this.appStateService.getDetectionMethods();
      this.damageTypes$ = this.appStateService.getDamageTypes();
    }

}
