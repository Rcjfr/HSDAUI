import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AccordionPanelComponent } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStateService } from '../../common/services';
import { ConfirmComponent } from '../../common/components/confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Subject, Observable } from 'rxjs/Rx';

@Component({
  selector: 'aa-alerts-search',
  templateUrl: './alerts-search.component.html',
  styleUrls: ['./alerts-search.component.less']
})
export class AlertsSearchComponent implements OnInit {
  @ViewChildren(AccordionPanelComponent) panels: AccordionPanelComponent[];

  searchBySDA$: Subject<any> = new Subject();
  searchByAircraft$: Subject<any> = new Subject();
  criteria;

  models: {
    searchByDateRange: {
      dateFrom: any;
      dateThrough: any;
    };
    searchBySDA: {
      id: any;
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
    searchByAircraft: {
      aircraftNo: string;
      manufacturer: string;
      model: string;
      serialNo: string;
    };
    pageData: any;
  };

  //Each element represents one section of the form and whether or not it has at least one value entered
  isValid = [false, false, false];

  constructor(private fb: FormBuilder, private appStateService: AppStateService, private dialogService: DialogService) {
    this.models = {
      searchByDateRange: { dateFrom: undefined, dateThrough: undefined },
      searchBySDA: {
        id: undefined, station: undefined, alertCode: undefined, sdrNumber: undefined, department: undefined,
        ataCode1: undefined, originator: undefined, ataCode2: undefined, fleet: undefined, checkType: undefined
      },
      searchByAircraft: { aircraftNo: undefined, manufacturer: undefined, model: undefined, serialNo: undefined },
      pageData: undefined
    };
  }

  ngOnInit() {
    Observable.combineLatest(this.searchBySDA$.startWith(undefined), this.searchByAircraft$.startWith(undefined), this.combineCriteria).subscribe(s => this.criteria = s );

  }

  combineCriteria(searchBySDA, searchByAircraft) {
    return { searchBySDA, searchByAircraft }
  }

  expandCollapseAll(expandAll: boolean) {
    this.panels.forEach(p => p.isOpen = expandAll);

    return false;
  }

  isFalse(element, index, array) {
    return element === false;
  }

  searchAlerts() {
    // const formIsInvalid = this.isValid.every(this.isFalse);

    // if (!formIsInvalid) {
      this.appStateService.saveSdaSearchCriteria(this.criteria);
    // } else {
    //   this.dialogService.addDialog(ConfirmComponent, {
    //     title: 'Search Filters',
    //     message: 'Please input at least one search filter.'
    //   })
    // }
  }
}
