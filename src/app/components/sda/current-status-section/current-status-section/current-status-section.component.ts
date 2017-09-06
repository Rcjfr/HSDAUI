import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseFormComponent } from '../../base-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'aa-current-status-section',
  templateUrl: './current-status-section.component.html',
  styleUrls: ['./current-status-section.component.less']
})
export class CurrentStatusSectionComponent extends BaseFormComponent implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder) {
    super('currentStatusSectionGroup');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  formatDate(date: Date): string {
    return moment(date).format('LLL');
  }
}
