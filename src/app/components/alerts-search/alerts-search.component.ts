import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AccordionPanelComponent } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStateService } from '../../common/services';
import { ConfirmComponent } from '../../common/components/confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Subject, Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'aa-alerts-search',
  templateUrl: './alerts-search.component.html',
  styleUrls: ['./alerts-search.component.less']
})
export class AlertsSearchComponent implements OnInit {
  @ViewChildren(AccordionPanelComponent) panels: AccordionPanelComponent[];

  searchByDateRange$: Subject<any> = new Subject();
  searchBySDA$: Subject<any> = new Subject();
  searchByAircraft$: Subject<any> = new Subject();
  searchByPart$: Subject<any> = new Subject();
  criteria;

  constructor(private fb: FormBuilder, private appStateService: AppStateService, private dialogService: DialogService) { }

  ngOnInit() {
    Observable.combineLatest(this.searchByDateRange$.startWith(undefined),
      this.searchBySDA$.startWith(undefined),
      this.searchByAircraft$.startWith(undefined),
      this.searchByPart$.startWith(undefined),
      this.combineCriteria)
      .subscribe(s => this.criteria = s);
  }

  combineCriteria(searchByDateRange, searchBySDA, searchByAircraft, searchByPart) {
    return { searchByDateRange, searchBySDA, searchByAircraft, searchByPart }
  }

  expandCollapseAll(expandAll: boolean) {
    this.panels.forEach(p => p.isOpen = expandAll);

    return false;
  }

  searchAlerts() {
    const values = _.values(this.criteria);

    let hasCriteria = false;
    _.forIn(this.criteria, (value, key) => {
      if (value) {
        if (_.every(_.values(value), (s) => { return s || s !== ''; })) {
          hasCriteria = true;
        }
      }
    });

    if (!hasCriteria) {
      this.dialogService.addDialog(ConfirmComponent, {
        title: 'Search Filters',
        message: 'Please input at least one search filter.'
      })
    } else {
      this.appStateService.saveSdaSearchCriteria(this.criteria);
    }
  }
}
