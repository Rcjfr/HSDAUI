import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { IReportOption, ReportOptions } from './options';
import * as _ from 'lodash';

@Component({
  selector: 'aa-search-report',
  templateUrl: './search-report.component.html',
  styleUrls: ['./search-report.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SearchReportComponent implements OnInit, OnChanges {
  @Input() criteria: any;

  options: IReportOption[];
  selectedOptions: IReportOption[];

  constructor() { }

  ngOnInit() {
    this.options = _.clone(ReportOptions);
    this.selectedOptions = [];
    this.criteria.reportColumns = [];
  }

  onMoveToSource() {
    this.options = _.differenceWith(ReportOptions, this.selectedOptions, _.isEqual);
    this.setSearchByReportFilters(this.selectedOptions);
  }

  setSearchByReportFilters(options) {
    this.criteria.reportColumns = options;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.criteria && changes.criteria.currentValue) {
      if (changes.criteria.currentValue.reportColumns) {
        this.selectedOptions = changes.criteria.currentValue.reportColumns;
      } else {
        this.selectedOptions = [];
      }
      this.options = _.differenceWith(ReportOptions, this.selectedOptions, _.isEqual);
    }
  }
}
