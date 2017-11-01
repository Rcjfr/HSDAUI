import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AccordionPanelComponent } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
      searcyByCorrosion: undefined,
      searchByDefect: undefined,
      searchByCorrectiveAction: undefined,
      searchByPart: undefined,
      searchByOptions: undefined,
      searchByReport: undefined
    };
  }

  updateFilters(criteria) {
    this.criteria = criteria;
  }
}
