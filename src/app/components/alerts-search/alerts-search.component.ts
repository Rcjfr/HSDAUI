import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { AccordionPanelComponent } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-alerts-search',
  templateUrl: './alerts-search.component.html',
  styleUrls: ['./alerts-search.component.less']
})
export class AlertsSearchComponent implements OnInit {
  @ViewChildren(AccordionPanelComponent) panels: AccordionPanelComponent[];
  

  sdaSearchForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.sdaSearchForm = this.fb.group({});
  }

  ngOnInit() {

  }
  expandCollapseAll(expandAll: boolean) {
    this.panels.forEach(p => p.isOpen = expandAll);
    return false;
  }
  searchAlerts() {

  }
}
