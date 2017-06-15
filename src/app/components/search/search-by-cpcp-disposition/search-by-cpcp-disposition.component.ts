import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../../common/services';
import { Observable } from 'rxjs/Rx';
import { List } from 'immutable';
import { ICorrosionLevel, IBaseLookUp } from '../../../common/models';
@Component({
  selector: 'app-search-by-cpcp-disposition',
  templateUrl: './search-by-cpcp-disposition.component.html',
  styleUrls: ['./search-by-cpcp-disposition.component.less']
})
export class SearchByCpcpDispositionComponent implements OnInit {
  corrosionLevels$: Observable<List<ICorrosionLevel>>;
  reasonsForChange$: Observable<IBaseLookUp[]> = Observable.of([
    { id: 1, description: 'Incorrect per Corrosion Level Block Diagram' },
    { id: 2, description: 'Evidence of a previous blend has been determined' },
    { id: 3, description: 'New limits have been defined' },
    { id: 4, description: 'Pre-blended measurements indicate Level - 1; elected to replace part for company convenience' }
  ]);
  constructor(private appStateService: AppStateService) { }

  ngOnInit() {
    this.corrosionLevels$ = this.appStateService.getCorrosionLevels();
  }

}
