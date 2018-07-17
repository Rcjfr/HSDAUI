import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AccordionPanelComponent } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppStateService } from '@app/common/services';
import { SavedSearchStateService } from '@app/common/services/saved-searches-state.service';
import { ConfirmComponent } from '@app/common/components/confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Subject, Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
import { PromptDialogComponent } from '@app/components/prompt-dialog/prompt-dialog.component';
import { List } from 'immutable';
import { AuthService } from '@app/common/services/auth.service';
import { ISearchData, SearchType } from '@app/common/models';
import { ISavedSearch } from '@app/common/models/saved-search.model';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Helper } from '@app/common/helper';
import * as moment from 'moment';


@Component({
  selector: 'aa-alerts-search',
  templateUrl: './alerts-search.component.html',
  styleUrls: ['./alerts-search.component.less']
})
export class AlertsSearchComponent implements OnInit {
  @ViewChildren(AccordionPanelComponent) panels: AccordionPanelComponent[];
  public searchTypes = SearchType;

  //Store data
    currentSearchId: number;

  badgeNumber;
  criteria;

  constructor(private fb: FormBuilder,
    private appStateService: AppStateService,
    private savedSearchStateService: SavedSearchStateService,
    private dialogService: DialogService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.resetFilters();

    this.authService.badgeId()
      .map(badgeId => {
        this.badgeNumber = badgeId;
        this.savedSearchStateService.loadSearches(badgeId);
      }).subscribe();

    this.savedSearchStateService.getCurrentSearchId()
      .map(id => {
        this.currentSearchId = id;
      }).subscribe();
  }

  deserializeDate(object, key) {
    if (object) {
      object[key] = object[key] ? new Date(object[key]) : undefined;
    }
  }
  isSearchModified(savedCriteria: any) {

    if (this.criteria && this.criteria.searchByDateRange) {
      this.criteria.searchByDateRange.dateFrom = this.criteria.searchByDateRange.dateFrom ? moment(this.criteria.searchByDateRange.dateFrom).format('YYYY-MM-DD') + 'T00:00:00' : '';
      this.criteria.searchByDateRange.dateThrough = this.criteria.searchByDateRange.dateThrough ? moment(this.criteria.searchByDateRange.dateThrough).format('YYYY-MM-DD') + 'T00:00:00' : '';
    }

    if (this.criteria && this.criteria.searchByDTE) {
      this.criteria.searchByDTE.stage1RTSDateFrom = this.criteria.searchByDTE.stage1RTSDateFrom ? moment(this.criteria.searchByDTE.stage1RTSDateFrom).format('YYYY-MM-DD') + 'T00:00:00' : '';
      this.criteria.searchByDTE.stage1RTSDateTo = this.criteria.searchByDTE.stage1RTSDateTo ? moment(this.criteria.searchByDTE.stage1RTSDateTo).format('YYYY-MM-DD') + 'T00:00:00' : '';
      this.criteria.searchByDTE.stage2DateFrom = this.criteria.searchByDTE.stage2DateFrom ? moment(this.criteria.searchByDTE.stage2DateFrom).format('YYYY-MM-DD') + 'T00:00:00' : '';
      this.criteria.searchByDTE.stage2DateTo = this.criteria.searchByDTE.stage2DateTo ? moment(this.criteria.searchByDTE.stage2DateTo).format('YYYY-MM-DD') + 'T00:00:00' : '';
      this.criteria.searchByDTE.stage3DateFrom = this.criteria.searchByDTE.stage3DateFrom ? moment(this.criteria.searchByDTE.stage3DateFrom).format('YYYY-MM-DD') + 'T00:00:00' : '';
      this.criteria.searchByDTE.Stage3DateTo = this.criteria.searchByDTE.Stage3DateTo ? moment(this.criteria.searchByDTE.Stage3DateTo).format('YYYY-MM-DD') + 'T00:00:00' : '';
      this.criteria.searchByDTE.updatedDateFrom = this.criteria.searchByDTE.updatedDateFrom ? moment(this.criteria.searchByDTE.updatedDateFrom).format('YYYY-MM-DD') + 'T00:00:00' : '';
      this.criteria.searchByDTE.updatedDateTo = this.criteria.searchByDTE.updatedDateTo ? moment(this.criteria.searchByDTE.updatedDateTo).format('YYYY-MM-DD') + 'T00:00:00' : '';
      this.criteria.searchByDTE.dueDateFrom = this.criteria.searchByDTE.dueDateFrom ? moment(this.criteria.searchByDTE.dueDateFrom).format('YYYY-MM-DD') + 'T00:00:00' : '';
      this.criteria.searchByDTE.dueDateTo = this.criteria.searchByDTE.dueDateTo ? moment(this.criteria.searchByDTE.dueDateTo).format('YYYY-MM-DD') + 'T00:00:00' : '';
    }

    if (_.isEqual(Helper.RemoveNulls(savedCriteria), Helper.RemoveNulls(this.criteria))) {
      return false;
    }

     return true;
  }

  runSavedSearch(criteria) {
    if (this.isSearchModified(criteria)) {
      this.dialogService
        .addDialog(ConfirmComponent, {
          title: 'Confirm',
          message:
          'You have unsaved criteria in the saved search. Search results will not include the updated criteria if the search is not saved. Do you want to continue with the search?',
          okButtonText: 'Yes',
          cancelButtonText: 'No'
        })
        .filter(confirm => confirm === true)
        .subscribe(confirm => {
          this.updateFilters(criteria);
          this.searchAlerts();
        });
    } else {
      this.searchAlerts();
    }
  }

  expandCollapseAll(expandAll: boolean) {
    this.panels.forEach(p => p.isOpen = expandAll);

    return false;
  }

  searchAlerts(excel: boolean = false, searchType: SearchType = SearchType.Regular ) {
    let hasCriteria = false;
    const definedSections = _.pickBy(this.criteria, _.identity);  //Get all defined properties (searchByDateRange, etc)

    if (definedSections.hasOwnProperty('reportColumns')) {
      delete definedSections['reportColumns']
    }

    if (definedSections.hasOwnProperty('searchByOptions')) {
      delete definedSections['searchByOptions']
    }

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

      this.appStateService.saveSearchType(searchType);

      if (excel) {
        this.appStateService.exportSDA(this.criteria);
      } else {
        this.appStateService.saveSdaSearchCriteria(this.criteria);
      }
    }

    return false;
  }

  clearFilters() {
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Clear Filters?',
      message: `Are you sure you want to clear all of the search filters?`
    }).filter(confirm => confirm === true).subscribe(confirm => {
      this.resetFilters();
    });
    window.scrollTo(0, 0);
  }

  resetFilters() {
    this.criteria = {
      searchByDateRange: undefined,
      searchBySda: undefined,
      searchByAircraft: undefined,
      searchByMaintenance: undefined,
      searchByCorrosion: undefined,
      searchByDefect: undefined,
      searchByCorrectiveAction: undefined,
      searchByPart: undefined,
      searchByOptions: undefined,
      searchByDTE: undefined,
      reportColumns: undefined
    };
  }

  updateFilters(criteria) {
    this.criteria = criteria;
  }
}
