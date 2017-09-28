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

  savedSearches$: Observable<List<ISavedSearch>>;
  savedSearches: List<ISavedSearch>;
  selectedSearch: number;

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
      .do(s => this.selectDefaultSearch(s))
      .do(s => this.savedSearches = s);
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

  selectDefaultSearch(searches) {
    if (searches && searches instanceof List) {
      const defaultItem = _.find(searches.toJS(), s => s.isDefault === true);
      if (defaultItem) {
        this.selectedSearch = defaultItem.searchId;
        this.criteria = JSON.parse(defaultItem.criteria);
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
    if (this.selectedSearch !== 0) {
      if (this.savedSearches && this.savedSearches instanceof List) {
        const search = this.savedSearches.find(i => i.searchId === +this.selectedSearch);
        if (search) {
          this.criteria = JSON.parse(search.criteria);
        }
      }
    }
  }

  saveCriteria() {
    if (this.selectedSearch.toString() === '0') {
      this.dialogService.addDialog(PromptDialogComponent, {
        title: 'Save Search Filters',
        message: `What would you like to name this search?`
      }).subscribe(newName => {
        if (newName) {
          this.savedSearchStateService.saveSearch({
            badgeNumber: this.badgeNumber,
            criteria: JSON.stringify(this.criteria),
            id: this.selectedSearch,
            name: newName,
            isDefault: this.isDefault
          });
        }
      });
    }
  }
}
