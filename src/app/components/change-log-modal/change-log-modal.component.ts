import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IReportOption, ReportOptions } from '@app/components/search/search-report/options';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { IChangeLog } from '@app/common/models/change-log.model';
import { AuthService } from '@app/common/services';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'aa-change-log-modal',
  templateUrl: './change-log-modal.component.html',
  styleUrls: ['./change-log-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeLogModalComponent implements OnInit {
  @Input() changeLog: List<IChangeLog>
  @Input() sdaID: number;
  @ViewChild('changeLogModal') public changeLogModal: ModalDirective;
  constructor() { }

  ngOnInit() {
  }

  showModal() {
    this.changeLogModal.show();
  }

  changeLogDisplayAttribute(attribute: string): string {
    const attributeColumn = ReportOptions.find( (option) => option.dbField === attribute )

    return attributeColumn ? attributeColumn.display : attribute
   }

  hideModal() {
    this.changeLogModal.hide();
  }
  formatDate(date: Date): string {
    return moment(date).format('LLL');
  }
}
