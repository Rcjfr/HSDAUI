import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AccordionPanelComponent } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStateService } from '../../common/services';

@Component({
  selector: 'aa-alerts-search',
  templateUrl: './alerts-search.component.html',
  styleUrls: ['./alerts-search.component.less']
})
export class AlertsSearchComponent implements OnInit {
  @ViewChildren(AccordionPanelComponent) panels: AccordionPanelComponent[];
  models: {
    SearchByDateRange: {
      dateFrom: any;
      dateThrough: any;
    };
    SearchBySDA: {
      sdrId: any;
      station: any;
      alertCode: any;
      sdrNumber: any;
      department: any;
      ataCode1: any;
      originator: any;
      ataCode2: any;
      fleet: any;
      checkType: any;
    };
    PageData: any;
  };

  isValid: false;
  searchState = 'SearchByDateRange';
  sdaSearchForm: FormGroup;

  constructor(private fb: FormBuilder, private appStateService: AppStateService) {
    this.models = {
      SearchByDateRange: { dateFrom: undefined, dateThrough: undefined },
      SearchBySDA: { sdrId: undefined, station: undefined, alertCode: undefined, sdrNumber: undefined, department: undefined,
                      ataCode1: undefined, originator: undefined, ataCode2: undefined, fleet: undefined, checkType: undefined },
      PageData: undefined
    };
  }

  ngOnInit() { }

  expandCollapseAll(expandAll: boolean) {
    this.panels.forEach(p => p.isOpen = expandAll);

    return false;
  }

  searchAlerts() {
    this.appStateService.saveSdaSearchCriteria(this.models);
  }
}
