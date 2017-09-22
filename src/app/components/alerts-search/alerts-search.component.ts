import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AccordionPanelComponent } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStateService } from '../../common/services';
import { SavedSearchStateService } from 'app/common/services/saved-searches-state.service';
import { ConfirmComponent } from '../../common/components/confirm/confirm.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Subject, Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
import { SaveSearchDialogComponent } from 'app/components/save-search-dialog/save-search-dialog.component';
import { List } from 'immutable';
import { AuthService } from 'app/common/services/auth.service';
import { SearchData } from 'app/common/models';

@Component({
  selector: 'aa-alerts-search',
  templateUrl: './alerts-search.component.html',
  styleUrls: ['./alerts-search.component.less']
})
export class AlertsSearchComponent implements OnInit {
  @ViewChildren(AccordionPanelComponent) panels: AccordionPanelComponent[];

  savedSearches$: Observable<List<SearchData>>;

  //Search filters
  searchByDateRange$: Subject<any> = new Subject();
  searchBySDA$: Subject<any> = new Subject();
  searchByAircraft$: Subject<any> = new Subject();
  searchByPart$: Subject<any> = new Subject();
  searchByCorrosion$: Subject<any> = new Subject();
  searchByCorrectiveAction$: Subject<any> = new Subject();
  searchByOptions$: Subject<any> = new Subject();
  criteria;
  selectedSearch = '';
  isDefault = false;

  badgeNumber;

  constructor(private fb: FormBuilder,
    private appStateService: AppStateService,
    private savedSearchStateService: SavedSearchStateService,
    private dialogService: DialogService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.badgeId()
      .map(badgeId => {
        this.badgeNumber = badgeId;
        this.savedSearchStateService.loadSearches(badgeId);
      }).subscribe();

    this.savedSearches$ = this.savedSearchStateService.getSavedSearches().do(searches => this.selectDefaultSearch(searches));

    Observable.combineLatest(this.searchByDateRange$.startWith(undefined),
      this.searchBySDA$.startWith(undefined),
      this.searchByAircraft$.startWith(undefined),
      this.searchByPart$.startWith(undefined),
      this.searchByCorrosion$.startWith(undefined),
      this.searchByCorrectiveAction$.startWith(undefined),
      this.searchByOptions$.startWith(undefined),
      this.combineCriteria)
      .subscribe(s => this.criteria = s);
  }

  combineCriteria(searchByDateRange, searchBySDA, searchByAircraft, searchByPart, searchByCorrosion, searchByCorrectiveAction, searchByOptions) {
    return { searchByDateRange, searchBySDA, searchByAircraft, searchByPart, searchByCorrosion, searchByCorrectiveAction, searchByOptions }
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
      }
      console.log(searches);
    }
  }

  getSearchDisplayName(search: any) {
    return search.name + (search.isDefault ? ' (Default)' : '');
  }

  saveCriteria() {
    if (!this.selectedSearch) {
      this.dialogService.addDialog(SaveSearchDialogComponent, {
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
