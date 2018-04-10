import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import * as _ from 'lodash/lodash.min.js';
import { AppStateService } from '@app/common/services';
import { IBaseLookUp } from '@app/common/models';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'aa-search-by-status',
  templateUrl: './search-by-status.component.html',
  styleUrls: ['./search-by-status.component.less']
})
export class SearchByStatusComponent implements OnInit, OnChanges {
  @Input() criteria: any;
  status$: Observable<IBaseLookUp[]>;
  statusForm = new FormGroup({
    status: new FormControl([])
  });
  constructor(private appStateService: AppStateService) { }

  ngOnInit() {
    this.status$ = this.appStateService.getSdaStatus();
    this.statusForm.valueChanges.subscribe(s => this.criteria.searchByStatus = s);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.criteria && changes.criteria.currentValue) {
      if (changes.criteria.currentValue.searchByStatus) {
        this.statusForm.patchValue(changes.criteria.currentValue.searchByStatus, { emitEvent: false });
      } else {
        this.statusForm.reset({}, { emitEvent: false });
      }
    }
  }
}


