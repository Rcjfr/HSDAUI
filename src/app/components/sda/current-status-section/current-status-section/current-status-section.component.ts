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
  public moment  = moment;
  constructor(private fb: FormBuilder) {
    super('currentStatusSectionGroup');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
