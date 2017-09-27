import { Component, OnInit, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'aa-search-by-date-range',
  templateUrl: './search-by-date-range.component.html',
  styleUrls: ['./search-by-date-range.component.less']
})
export class SearchByDateRangeComponent implements OnInit, OnChanges {
  @Input() criteria: any;

  dateRangeForm = new FormGroup({
    dateFrom: new FormControl(),
    dateThrough: new FormControl()
  });

  constructor() { }

  ngOnInit() {
    this.dateRangeForm.valueChanges.subscribe(values => {
      if (values && values.dateFrom) {
        values.dateFrom = moment(values.dateFrom).format('YYYY-MM-DD') + 'T00:00:00';
      }
      if (values && values.dateThrough) {
        values.dateThrough = moment(values.dateThrough).format('YYYY-MM-DD') + 'T00:00:00';
      }
      this.criteria.searchByDateRange = values;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.criteria && changes.criteria.currentValue) {
      if (changes.criteria.currentValue.searchByDateRange) {
         //Date pickers parsing
         if (changes.criteria.currentValue.searchByDateRange.dateFrom) {
          changes.criteria.currentValue.searchByDateRange.dateFrom = new Date(changes.criteria.currentValue.searchByDateRange.dateFrom);
        }
        if (changes.criteria.currentValue.searchByDateRange.dateThrough) {
          changes.criteria.currentValue.searchByDateRange.dateThrough = new Date(changes.criteria.currentValue.searchByDateRange.dateThrough);
        }

        this.dateRangeForm.patchValue(changes.criteria.currentValue.searchByDateRange, { emitEvent: false });
      } else {
        this.dateRangeForm.reset({}, { emitEvent: false });
      }
    }
  }
}