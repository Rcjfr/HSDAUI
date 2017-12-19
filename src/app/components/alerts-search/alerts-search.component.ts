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
import { ISearchData } from '@app/common/models';
import { ISavedSearch } from '@app/common/models/saved-search.model';
import { SelectItem } from 'primeng/components/common/selectitem';


@Component({
  selector: 'aa-alerts-search',
  templateUrl: './alerts-search.component.html',
  styleUrls: ['./alerts-search.component.less']
})
export class AlertsSearchComponent implements OnInit {
  @ViewChildren(AccordionPanelComponent) panels: AccordionPanelComponent[];

  //Store data
  savedSearches: List<ISavedSearch>;
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

    this.savedSearchStateService.getSavedSearches()
      .do(s => this.savedSearches = s)
      .subscribe();

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

    this.deserializeDate(savedCriteria.searchByDateRange, 'dateFrom');
    this.deserializeDate(savedCriteria.searchByDateRange, 'dateThrough');
    this.deserializeDate(savedCriteria.searchByDTE, 'stage1RTSDateFrom');
    this.deserializeDate(savedCriteria.searchByDTE, 'stage1RTSDateTo');
    this.deserializeDate(savedCriteria.searchByDTE, 'stage2DateFrom');
    this.deserializeDate(savedCriteria.searchByDTE, 'stage2DateTo');
    this.deserializeDate(savedCriteria.searchByDTE, 'stage3DateFrom');
    this.deserializeDate(savedCriteria.searchByDTE, 'Stage3DateTo');
    this.deserializeDate(savedCriteria.searchByDTE, 'updatedDateFrom');
    this.deserializeDate(savedCriteria.searchByDTE, 'updatedDateTo');
    this.deserializeDate(savedCriteria.searchByDTE, 'dueDateFrom');
    this.deserializeDate(savedCriteria.searchByDTE, 'dueDateTo');

    if (JSON.stringify(savedCriteria) === JSON.stringify(this.criteria)) {
      return false;
    } else {
      return true;
    }
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

  searchAlerts(excel: boolean = false) {
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
