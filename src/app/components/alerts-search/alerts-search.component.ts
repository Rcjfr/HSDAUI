import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AccordionPanelComponent } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStateService } from '../../common/services';
import { SavedSearchStateService } from 'app/common/services/saved-searches-state.service';
import { ConfirmComponent } from '../../common/components/confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Subject, Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
import { PromptDialogComponent } from 'app/components/prompt-dialog/prompt-dialog.component';
import { List } from 'immutable';
import { AuthService } from 'app/common/services/auth.service';
import { SearchData } from 'app/common/models';
import { ISavedSearch } from 'app/common/models/saved-search.model';

@Component({
  selector: 'aa-alerts-search',
  templateUrl: './alerts-search.component.html',
  styleUrls: ['./alerts-search.component.less']
})
export class AlertsSearchComponent implements OnInit {
  @ViewChildren(AccordionPanelComponent) panels: AccordionPanelComponent[];

  //Store data
  savedSearches$: Observable<List<ISavedSearch>>;
  savedSearches: List<ISavedSearch>;
  currentSearchId: number;

  selectedSearch = 0;
  searchFiltersOpen = false;
  criteria;
  isDefault = false;
  badgeNumber;

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

    this.savedSearches$ = this.savedSearchStateService.getSavedSearches()
      .do(s => this.selectSearch(s))
      .do(s => this.savedSearches = s);

    this.savedSearchStateService.getCurrentSearchId()
      .map(id => {
        this.currentSearchId = id;
      }).subscribe();
  }

  expandCollapseAll(expandAll: boolean) {
    this.panels.forEach(p => p.isOpen = expandAll);

    return false;
  }

  searchAlerts() {
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
      this.appStateService.saveSdaSearchCriteria(this.criteria);
    }
  }

  selectSearch(searches) {
    //Select the newly created search OR select the default search on load
    if (searches && searches instanceof List) {
      let search;
      if (this.currentSearchId) {
        search = _.find(searches.toJS(), s => s.searchId === this.currentSearchId);
      } else {
        search = _.find(searches.toJS(), s => s.isDefault === true);
      }

      if (search) {
        this.selectedSearch = +search.searchId;
        this.criteria = JSON.parse(search.criteria);
        this.isDefault = search.isDefault;
        this.searchFiltersOpen = true;
      } else {
        this.selectedSearch = 0;
      }
    }
  }

  clearFilters() {
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Clear Filters?',
      message: `Are you sure you want to clear all of the search filters?`
    }).filter(confirm => confirm === true).subscribe(confirm => {
      this.resetFilters();
      this.selectedSearch = 0;
      });
    window.scrollTo(0, 0);
  }

  resetFilters() {
    this.criteria = {
      searchByDateRange: undefined,
      searchBySda: undefined,
      searchByAircraft: undefined,
      searchByMaintenance: undefined,
      searcyByCorrosion: undefined,
      searchByDefect: undefined,
      searchByCorrectiveAction: undefined,
      searchByPart: undefined,
      searchByOptions: undefined
    };
  }

  getSearchDisplayName(search: any) {
    return search.name + (search.isDefault ? ' (Default)' : '');
  }

  onSearchChange() {
    this.selectedSearch = +this.selectedSearch; //Angular generates string values in *ngFor instead of numbers
    if (this.selectedSearch !== 0) {
      if (this.savedSearches && this.savedSearches instanceof List) {
        const search = this.savedSearches.find(i => i.searchId === this.selectedSearch);
        if (search) {
          this.savedSearchStateService.setCurrentSearchId(search.searchId);
          this.criteria = JSON.parse(search.criteria);
          this.isDefault = search.isDefault;
        }
      }
    }
  }

  createSavedSearch() {
    this.dialogService.addDialog(PromptDialogComponent, {
      title: 'Create Saved Search',
      message: `What would you like to name this search?`
    }).subscribe(newName => {
      if (newName) {
        this.saveSearch(newName)
      }
    });
  }

  updateSavedSearch() {
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Updated Saved Search',
      message: `Are you sure you want to overwrite '${this.savedSearches.find(i => i.searchId === this.selectedSearch).name}' with current search filters?`
    }).filter(confirm => confirm === true).subscribe(confirm => {
      this.saveSearch(null);
    });
  }

  saveSearch(newName) {
    const search = {
      badgeNumber: this.badgeNumber,
      criteria: JSON.stringify(this.criteria),
      searchId: this.selectedSearch,
      name: (newName ? newName : this.savedSearches.find(i => i.searchId === this.selectedSearch).name),
      isDefault: this.isDefault
    }

    this.savedSearchStateService.saveSearch(search);
  }

  deleteSavedSearch() {
    this.dialogService.addDialog(ConfirmComponent, {
      title: 'Delete Saved Search',
      message: `Are you sure you want to delete '${this.savedSearches.find(i => i.searchId === this.selectedSearch).name}'?`
    }).filter(confirm => confirm === true).subscribe(confirm => {
      this.savedSearchStateService.setCurrentSearchId(undefined);
      this.savedSearchStateService.deleteSearch(this.selectedSearch);
    });
  }
}
