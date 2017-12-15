import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AuthService } from '@app/common/services';
@Component({
  selector: 'aa-current-status-section',
  templateUrl: './current-status-section.component.html',
  styleUrls: ['./current-status-section.component.less'],
changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentStatusSectionComponent extends BaseFormComponent implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder, authService: AuthService) {
    super('currentStatusSectionGroup', authService);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  formatDate(date: Date): string {
    return moment(date).format('LLL');
  }
}
