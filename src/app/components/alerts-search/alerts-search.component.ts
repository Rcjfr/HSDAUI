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
  searchByCorrosion$: Subject<any> = new Subject();
  searchByCorrectiveAction$: Subject<any> = new Subject();
  criteria;

  constructor(private fb: FormBuilder, private appStateService: AppStateService, private dialogService: DialogService) { }

  ngOnInit() {
    Observable.combineLatest(this.searchByDateRange$.startWith(undefined),
      this.searchBySDA$.startWith(undefined),
      this.searchByAircraft$.startWith(undefined),
      this.searchByPart$.startWith(undefined),
      this.searchByCorrosion$.startWith(undefined),
      this.searchByCorrectiveAction$.startWith(undefined),
      this.combineCriteria)
      .subscribe(s => this.criteria = s);
  }

  combineCriteria(searchByDateRange, searchBySDA, searchByAircraft, searchByPart, searchByCorrosion, searchByCorrectiveAction) {
      return { searchByDateRange, searchBySDA, searchByAircraft, searchByPart, searchByCorrosion, searchByCorrectiveAction}
  }

  expandCollapseAll(expandAll: boolean) {
    this.panels.forEach(p => p.isOpen = expandAll);

    return false;
  }

  searchAlerts() {
    let hasCriteria = false;
    const definedSections = _.pickBy(this.criteria, _.identity);  //Get all defined properties (searchByDateRange, etc)
    _.forIn(definedSections, (value, key) => {  //Iterate over all sub-properties of that section (dateFrom, dateThrough, etc)
      //Make sure they're A) defined and B) not an empty array
      const validValues = _.pickBy(_.pickBy(value, _.identity), (x) => {
        if (Array.isArray(x)) {
          return x.length > 0;
        }

        return true;
      });

      if (!_.isEmpty(validValues)) {
        hasCriteria = true;
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
