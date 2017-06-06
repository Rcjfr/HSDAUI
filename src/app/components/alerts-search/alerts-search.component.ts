import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AccordionPanelComponent } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-alerts-search',
  templateUrl: './alerts-search.component.html',
  styleUrls: ['./alerts-search.component.less']
})
export class AlertsSearchComponent implements OnInit {
  @ViewChild('dateRangeGroup') dateRangeGroup: AccordionPanelComponent;
  @ViewChild('sdaFormGroup') sdaFormGroup: AccordionPanelComponent;
  @ViewChild('aircraftGroup') aircraftGroup: AccordionPanelComponent;
  @ViewChild('corrosionGroup') corrosionGroup: AccordionPanelComponent;

  sdaSearchForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.sdaSearchForm = this.fb.group({});
  }

  ngOnInit() {

  }
  expandCollapseAll(expandAll: boolean) {
    this.dateRangeGroup.isOpen = expandAll;
    this.sdaFormGroup.isOpen = expandAll;
    this.aircraftGroup.isOpen = expandAll;
    this.corrosionGroup.isOpen = expandAll;
    return false;
  }
  searchAlerts() {

  }
}
