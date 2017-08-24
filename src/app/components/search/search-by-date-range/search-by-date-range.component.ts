import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchBaseFormComponent } from '../search-base-form.component';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';
import * as moment from 'moment';

@Component({
  selector: 'aa-search-by-date-range',
  templateUrl: './search-by-date-range.component.html',
  styleUrls: ['./search-by-date-range.component.less']
})
export class SearchByDateRangeComponent extends SearchBaseFormComponent {

  constructor(private formBuilder: FormBuilder) {
    super(formBuilder.group({
      'dateFrom': [undefined, Validators.required],
      'dateThrough': [undefined, Validators.required]
    }));
  }

  onDateFromChanged(event) {
    this.model.dateFrom = moment(event).format('YYYY-MM-DD') + 'T00:00:00';
  }

  onDateThroughChanged(event) {
    this.model.dateThrough = moment(event).format('YYYY-MM-DD') + 'T00:00:00';
  }
}