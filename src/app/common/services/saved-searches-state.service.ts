import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { SearchData } from '../models';
import * as searchesActions from '../actions/saved-searches';
import { Store } from '@ngrx/store';
import { AppStore } from '../store/app-store';
import * as fromRoot from '../reducers';

@Injectable()
export class SavedSearchStateService {

    constructor(private store: Store<AppStore>) { }

    getSavedSearches() {
        return this.store.select(fromRoot.getSavedSearches);
    }

    loadSearches() {
        this.store.dispatch(new searchesActions.LoadSearchesAction());
    }

    saveSearch(criteria) {
        this.store.dispatch(new searchesActions.SaveSearchAction(criteria));
    }
}