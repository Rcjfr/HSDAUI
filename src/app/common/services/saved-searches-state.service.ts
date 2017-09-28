import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
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

    getCurrentSearchId() {
        return this.store.select(fromRoot.getCurrentSearchId);
    }

    loadSearches(badgeNumber) {
        this.store.dispatch(new searchesActions.LoadSearchesAction(badgeNumber));
    }

    saveSearch(criteria) {
        this.store.dispatch(new searchesActions.SaveSearchAction(criteria));
    }

    updateSearch(criteria) {
        this.store.dispatch(new searchesActions.SaveSearchAction(criteria));
    }

    setCurrentSearchId(id) {
        this.store.dispatch(new searchesActions.SetCurrentSearchId(id));
    }

    deleteSearch(id) {
        this.store.dispatch(new searchesActions.DeleteSearchAction(id));
    }
}