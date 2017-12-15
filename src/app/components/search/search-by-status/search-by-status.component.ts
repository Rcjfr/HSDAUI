import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import * as _ from 'lodash';
@Component({
    selector: 'aa-search-by-status',
    templateUrl: './search-by-status.component.html',
    styleUrls: ['./search-by-status.component.less']
})
export class SearchByStatusComponent implements OnInit, OnChanges {
    @Input() criteria: any;
    statusForm = new FormGroup({
        status: new FormArray([])
    });
    constructor() { }

    ngOnInit() {
        this.statusForm.valueChanges.subscribe(s => this.criteria.searchByStatus = s);
    }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.criteria && changes.criteria.currentValue) {
        const statusArray = <FormArray>this.statusForm.controls.status;

        if (changes.criteria.currentValue.searchByStatus) {
          this.statusForm.patchValue(changes.criteria.currentValue.searchByStatus, { emitEvent: false });
          while ((statusArray).length) {
            statusArray.removeAt(0);
        }
          changes.criteria.currentValue.searchByStatus.status.forEach(element => {
          statusArray.push(new FormControl(element));
        });
      } else {
          this.statusForm.reset({ }, { emitEvent: false });
          while ((statusArray).length) {
            statusArray.removeAt(0);
        }
      }
    }
  }

  onStatusChange(id: number, isChecked: boolean) {
        const statusArray = <FormArray>this.statusForm.controls.status;
        if (isChecked) {
            statusArray.push(new FormControl(id));
        } else {
            statusArray.removeAt(statusArray.controls.findIndex(x => x.value === id));
        }
    }

    statusContains(id: number) {
        if (_.includes(this.statusForm.controls.status.value, id)) {
            return true;
        }

        return false;
    }
}


