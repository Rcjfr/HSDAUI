import { Component, OnInit, ViewChild } from '@angular/core';
import { AppStateService } from '../../../common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { ICorrosionLevel, ICorrosionType, ICauseOfDamage } from '../../../common/models';

@Component({
  selector: 'app-search-by-corrosion',
  templateUrl: './search-by-corrosion.component.html',
  styleUrls: ['./search-by-corrosion.component.less']
})
export class SearchByCorrosionComponent implements OnInit {
  corrosionTypes$: Observable<List<ICorrosionType>>;
  corrosionLevels$: Observable<List<ICorrosionLevel>>;
  causeOfDamages$: Observable<List<ICauseOfDamage>>;
  corrosionLevels: string[] = [];
  causeOfDamage: string[] = [];
  corrosionType = '';

  constructor(private appStateService: AppStateService) { }

  ngOnInit() {
    this.corrosionLevels$ = this.appStateService.getCorrosionLevels();
    this.corrosionTypes$ = this.appStateService.getCorrosionTypes();
    this.causeOfDamages$ = this.appStateService.getCauseOfDamages();
  }

  hideCorrosionTypeOther() {
    return this.corrosionType !== '5';
  }

  hideCauseOfDamageOther() {
    return this.causeOfDamage.findIndex(d => d === '10') < 0;
  }

  onChangeCorrosionLevel(evnt) {
    if (evnt.target.checked) {
      this.corrosionLevels.push(evnt.target.value);
    } else {
      this.corrosionLevels.splice(this.corrosionLevels.indexOf(evnt.target.value), 1);
    }
  }
}
