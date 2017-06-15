﻿import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('maintenanceGroup') maintenanceGroup: AccordionPanelComponent;
  @ViewChild('statusGroup') statusGroup: AccordionPanelComponent;
  @ViewChild('correctiveGroup') correctiveGroup: AccordionPanelComponent;
  @ViewChild('defectGroup') defectGroup: AccordionPanelComponent;

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
    this.maintenanceGroup.isOpen = expandAll;
    this.statusGroup.isOpen = expandAll;
    this.correctiveGroup.isOpen = expandAll;
    this.defectGroup.isOpen = expandAll;
    return false;
  }
  searchAlerts() {

  }
}
