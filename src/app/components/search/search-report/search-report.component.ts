import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReportOptions } from './options';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
  selector: 'aa-search-report',
  templateUrl: './search-report.component.html',
  styleUrls: ['./search-report.component.less']
})
export class SearchReportComponent implements OnInit, OnChanges {
  @Input() criteria: any;

  options: any[];
  selectedOptions: any[];
  highlightedAvailableOption;
  highlightedSelectedOption;

  constructor() { }

  ngOnInit() {
    this.options = ReportOptions;
    this.selectedOptions = [];
    this.criteria.searchByReport = { filters: [] };
  }

  highlightAvailableOption(selected) {
    if (this.highlightedAvailableOption === selected) {
      this.highlightedAvailableOption = null;
    } else {
      this.highlightedAvailableOption = selected;
    }
  }

  highlightSelectedOption(selected) {
    if (this.highlightedSelectedOption === selected) {
      this.highlightedSelectedOption = null;
    } else {
      this.highlightedSelectedOption = selected;
    }
  }

  movetoSelected() {
    if (this.highlightedAvailableOption) {
      if (this.highlightedSelectedOption) { //insert it after the highlighted item
        const index = _.findIndex(this.selectedOptions, this.highlightedSelectedOption);
        this.selectedOptions.splice(index + 1, 0, this.highlightedAvailableOption);
      } else {  //insert it at end of list
        this.selectedOptions = [...this.selectedOptions, this.highlightedAvailableOption];
      }
      this.setSearchByReportFilters(this.selectedOptions);
      this.options = this.options.filter((val, i) => val !== this.highlightedAvailableOption);
      this.highlightedAvailableOption = null;
    }
  }

  moveToAvailable() {
    if (this.highlightedSelectedOption) {
      this.selectedOptions = this.selectedOptions.filter((val, i) => val !== this.highlightedSelectedOption);
      this.setSearchByReportFilters(this.selectedOptions);
      this.options = _.differenceWith(ReportOptions, this.selectedOptions, _.isEqual);
      this.highlightedSelectedOption = null;
    }
  }

  moveUp() {
    if (this.highlightedSelectedOption) {
      if (this.selectedOptions.length === 1) {
        return;
      }
      const index = _.findIndex(this.selectedOptions, this.highlightedSelectedOption);
      if (index > 0) {
        const value = this.selectedOptions[index];
        this.selectedOptions[index] = this.selectedOptions[index - 1];
        this.selectedOptions[index - 1] = value;
        this.setSearchByReportFilters(this.selectedOptions);
      }
    }
  }

  moveDown() {
    if (this.highlightedSelectedOption) {
      if (this.selectedOptions.length === 1) {
        return;
      }
      const index = _.findIndex(this.selectedOptions, this.highlightedSelectedOption)
      if (index >= 0 && index < this.selectedOptions.length - 1) {
        const value = this.selectedOptions[index];
        this.selectedOptions[index] = this.selectedOptions[index + 1];
        this.selectedOptions[index + 1] = value;
        this.setSearchByReportFilters(this.selectedOptions);
      }
    }
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
      this.highlightedSelectedOption = null;
      this.highlightedAvailableOption = null;
    }
  }
}