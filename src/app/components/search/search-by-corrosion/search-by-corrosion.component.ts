﻿import { Component, OnInit, ViewChild } from '@angular/core';
import { AppStateService } from '../../../common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { ICorrosionLevel, ICorrosionType } from '../../../common/models';
@Component({
  selector: 'app-search-by-corrosion',
  templateUrl: './search-by-corrosion.component.html',
  styleUrls: ['./search-by-corrosion.component.less']
})
export class SearchByCorrosionComponent implements OnInit {
corrosionTypes$: Observable<List<ICorrosionType>>;
corrosionLevels$: Observable<List<ICorrosionLevel>>;
  corrosionLevel:string[]=[];
  causeOfDamage: string[] = [];
  corrosionType:string='';
  constructor(private appStateService: AppStateService) { }

  ngOnInit() {
    this.corrosionLevels$ = this.appStateService.getCorrosionLevels();
    this.corrosionTypes$ = this.appStateService.getCorrosionTypes();
    
  }
  hideCorrosionTypeOther(){
    return this.corrosionType != '5';
  }
  hideCauseOfDamageOther() {
    return this.causeOfDamage.findIndex(d => d === 'other') < 0;
  }
}
