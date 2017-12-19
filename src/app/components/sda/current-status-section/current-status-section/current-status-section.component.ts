import { IChangeLog } from '@app/common/models/change-log.model';
import { IReportOption, ReportOptions } from '@app/components/search/search-report/options';
import { Component, ViewChild, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { List } from 'immutable';
import { BaseFormComponent } from '@app/components/sda/base-form.component';
import { FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { AppStateService, AuthService } from '@app/common/services';
import * as models from '@app/common/models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'aa-current-status-section',
  templateUrl: './current-status-section.component.html',
  styleUrls: ['./current-status-section.component.less'],
changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentStatusSectionComponent extends BaseFormComponent implements OnInit, OnDestroy {
  @ViewChild('statusModal') public statusModal: ModalDirective;
  changeLog$: Observable<List<models.IChangeLog>>;
  constructor(private fb: FormBuilder, authService: AuthService,
    private appStateService: AppStateService
  ) {
    super('currentStatusSectionGroup', authService);
  }
  ngOnInit() {
    this.changeLog$ = this.appStateService.getChangeLog();
  }

 changeLogDisplayAttribute(attribute: string): string {
  const attributeColumn = ReportOptions.find( (option) => option.dbField === attribute )

  return attributeColumn ? attributeColumn.display : attribute
 }
  ngOnDestroy() {
    super.ngOnDestroy();
  }


  showModal(id: number, versionNum: number): void {
    this.appStateService.loadChangelog({ sdaId: id, version: versionNum });
    this.statusModal.show();

    };

  hideStatusModal() {
    this.statusModal.hide();
  }
  formatDate(date: Date): string {
    return moment(date).format('LLL');
  }
}
