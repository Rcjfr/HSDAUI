import { Component, OnInit, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AppStateService, AuthService } from '@app/common/services';
import {ILoadSda} from '@app/common/models/payload/load-sda.model';

@Component({
  selector: 'aa-current-status-section',
  templateUrl: './current-status-section.component.html',
  styleUrls: ['./current-status-section.component.less'],
changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentStatusSectionComponent extends BaseFormComponent implements OnInit, OnDestroy {

  @Output() onChangeLog = new EventEmitter<ILoadSda>();

  constructor(private fb: FormBuilder, authService: AuthService,
    private appStateService: AppStateService
  ) {
    super('currentStatusSectionGroup', authService);
  }
  ngOnInit() { }


  ngOnDestroy() {
    super.ngOnDestroy();
  }


  showModal(id: number, versionNum: number): void {
    this.onChangeLog.emit({ sdaId: id, version: versionNum});
    };


  formatDate(date: Date): string {
    return moment(date).format('LLL');
  }
}
