import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { SearchData } from '../models';
import * as searchesActions from '../actions/searches';
import { Store } from '@ngrx/store';
import { AppStore } from '../store/app-store';

@Injectable()
export class SearchesService {

    constructor(private store: Store<AppStore>) { }

    loadSearches() {
        this.store.dispatch(new searchesActions.LoadSearchesAction());
    }

    saveSearch(criteria) {
        this.store.dispatch(new searchesActions.SaveSearchCriteria(criteria));
    }
}