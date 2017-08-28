import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseFormComponent } from '../../base-form.component';
import { FormBuilder, Validators } from '@angular/forms';

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
}
