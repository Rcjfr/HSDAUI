import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../../common/services';
import { Observable } from 'rxjs/Rx';
import { List } from 'immutable';
import { ICorrosionLevel, IReasonForChange} from '../../../common/models';
@Component({
  selector: 'aa-search-by-cpcp-disposition',
  templateUrl: './search-by-cpcp-disposition.component.html',
  styleUrls: ['./search-by-cpcp-disposition.component.less']
})
export class SearchByCpcpDispositionComponent implements OnInit {
  corrosionLevels$: Observable<List<ICorrosionLevel>>;
  reasonsForChange$: Observable<List<IReasonForChange>>;
  constructor(private appStateService: AppStateService) { }

  ngOnInit() {
    this.corrosionLevels$ = this.appStateService.getCorrosionLevels();
    this.reasonsForChange$ = this.appStateService.getReasonsForChange();
  }

}
