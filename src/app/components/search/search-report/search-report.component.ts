import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ReportOptions } from './options';
import * as _ from 'lodash';

@Component({
  selector: 'aa-search-report',
  templateUrl: './search-report.component.html',
  styleUrls: ['./search-report.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SearchReportComponent implements OnInit, OnChanges {
  @Input() criteria: any;

  options: any[];
  selectedOptions: any[];

  constructor() { }

  ngOnInit() {
    this.options = ReportOptions;
    this.selectedOptions = [];
    this.criteria.searchByReport = { filters: [] };
  }

  setSearchByReportFilters(options) {
    if (!this.criteria.SearchByReport) {
      this.criteria.SearchByReport = { filters: options };
    } else {
      this.criteria.SearchByReport.filters = options;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.criteria && changes.criteria.currentValue) {
      if (changes.criteria.currentValue.SearchByReport) {
        this.selectedOptions = changes.criteria.currentValue.SearchByReport.filters;
      } else {
        this.selectedOptions = [];
      }
      this.options = _.differenceWith(ReportOptions, this.selectedOptions, _.isEqual);
    }
  }
}
