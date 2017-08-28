import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'aa-search-by-date-range',
  templateUrl: './search-by-date-range.component.html',
  styleUrls: ['./search-by-date-range.component.less']
})
export class SearchByDateRangeComponent implements OnInit {
  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  dateRangeForm = new FormGroup({
    dateFrom: new FormControl(),
    dateThrough: new FormControl()
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dateRangeForm.valueChanges.subscribe(values => {
      if (values && values.dateFrom) {
        values.dateFrom = moment(values.dateFrom).format('YYYY-MM-DD') + 'T00:00:00';
      }
      if (values && values.dateThrough) {
        values.dateThrough = moment(values.dateThrough).format('YYYY-MM-DD') + 'T00:00:00';
      }
      this.update.emit(values);
    });
  }
}