import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SavedSearchStateService, AuthService } from 'app/common/services';
import { DialogService } from 'ng2-bootstrap-modal';
import { List } from 'immutable';
import { ConfirmComponent } from 'app/common/components/confirm/confirm.component';
import { ISavedSearch } from 'app/common/models/saved-search.model';

@Component({
  selector: 'aa-saved-searches',
  templateUrl: './saved-searches.component.html',
  styleUrls: ['./saved-searches.component.less']
})
export class SavedSearchesComponent implements OnInit {
  @Input() criteria: any;
  @Input() currentSearchId: number;
  @Input() badgeNumber: string;
  @Output() onSearchChange = new EventEmitter<string>();

  createForm: FormGroup;
  updateForm: FormGroup;
  savedSearches: List<ISavedSearch>;

  constructor(private savedSearchStateService: SavedSearchStateService,
    private dialogService: DialogService,
    private authService: AuthService) { }

  ngOnInit() {
    this.savedSearchStateService.getSavedSearches()
      .do(s => this.savedSearches = s)
      .do(s => this.selectSearch(s))
      .subscribe();

    this.createForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      isDefault: new FormControl()
    });

    this.updateForm = new FormGroup({
      selected: new FormControl(0, [Validators.min(1)]),
      isDefault: new FormControl()
    });
  }

  selectSearch(searches) {
    //Select the newly created search OR select the default search on load
    if (this.updateForm && searches && searches instanceof List) {
      let search;
      if (this.currentSearchId) {
        search = searches.find(s => s.searchId === this.currentSearchId);
      } else {
        search = searches.find(s => s.isDefault === true);
      }

      if (search) {
        this.updateForm.patchValue({ selected: +search.searchId, isDefault: search.isDefault });
        this.onSearchChange.emit(JSON.parse(search.criteria));

        if (search.isDefault) {
          this.savedSearchStateService.setCurrentSearchId(search.searchId);
        }
      } else {
        this.updateForm.patchValue({ selected: 0, isDefault: false });
        this.savedSearchStateService.setCurrentSearchId(0);
      }
    }
  }

  getSearchDisplayName(search: any) {
    return search.name + (search.isDefault ? ' (Default)' : '');
  }

  onSelectedChange() {
    const selectedSearch = +this.updateForm.controls.selected.value;
    if (selectedSearch !== 0) {
      if (this.savedSearches && this.savedSearches instanceof List) {
        const search = this.savedSearches.find(i => i.searchId === selectedSearch);
        if (search) {
          this.savedSearchStateService.setCurrentSearchId(search.searchId);
          this.onSearchChange.emit(JSON.parse(search.criteria));
          this.updateForm.patchValue({ isDefault: search.isDefault });
        }
      }
    } else {
      this.savedSearchStateService.setCurrentSearchId(0);
      this.onSearchChange.emit(JSON.parse('{}'));
      this.updateForm.patchValue({ isDefault: false });
    }
  }

  createSavedSearch() {
    if (this.createForm.valid) {
      const search = {
        badgeNumber: this.badgeNumber,
        criteria: JSON.stringify(this.criteria),
        searchId: 0,
        name: this.createForm.controls.name.value,
        isDefault: this.createForm.controls.isDefault.value
      }

      this.savedSearchStateService.saveSearch(search);
    }
  }

  updateSavedSearch() {
    if (this.updateForm.valid) {
      const name = this.savedSearches.find(i => i.searchId === +this.updateForm.controls.selected.value).name;

      this.dialogService.addDialog(ConfirmComponent, {
        title: 'Updated Saved Search',
        message: `Are you sure you want to overwrite '${name}' with current search filters?`
      }).filter(confirm => confirm === true).subscribe(confirm => {
        const search = {
          badgeNumber: this.badgeNumber,
          criteria: JSON.stringify(this.criteria),
          searchId: +this.updateForm.controls.selected.value,
          name: name,
          isDefault: this.updateForm.controls.isDefault.value
        }

        this.savedSearchStateService.saveSearch(search);
      });
    }
  }

  deleteSavedSearch() {
    if (this.updateForm.valid) {
      this.dialogService.addDialog(ConfirmComponent, {
        title: 'Delete Saved Search',
        message: `Are you sure you want to delete '${this.savedSearches.find(i => i.searchId === +this.updateForm.controls.selected.value).name}'?`
      }).filter(confirm => confirm === true).subscribe(confirm => {
        this.savedSearchStateService.setCurrentSearchId(undefined);
        this.savedSearchStateService.deleteSearch(this.updateForm.controls.selected.value);
      });
    }
  }
}
