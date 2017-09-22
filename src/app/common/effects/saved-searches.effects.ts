import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as searchesAlert from '../actions/saved-searches';
import * as services from '../services';
import '../rxjs-extensions';
import { ISavedSearch } from 'app/common/models/saved-search.model';


@Injectable()
export class SavedSearchesEffects {

  @Effect()
  loadSearches$: Observable<Action> = this.actions$
    .ofType(searchesAlert.ActionTypes.LOAD_SEARCHES)
    .map((action: searchesAlert.LoadSearchesAction) => action.badgeNumber)
    .switchMap((badgeNumber: string) => {
      return this.savedSearchService.getSavedSearches(badgeNumber)
        .map((data: ISavedSearch[]) => {
          return new searchesAlert.LoadSearchesCompleteAction(data);
        })
        .catch((err) => {
          return of(new searchesAlert.LoadSearchesFailAction('Failed to load saved searches.'));
        });
    });

  @Effect()
  saveSearch$: Observable<Action> = this.actions$
    .ofType(searchesAlert.ActionTypes.SAVE_SEARCH)
    .map((action: searchesAlert.SaveSearchAction) => action.payload)
    .switchMap((data: ISavedSearch) => {
      return this.savedSearchService.saveSearch(data)
        .map((updatedSearchData: ISavedSearch) => {
          this.savedSearchStateService.loadSearches(updatedSearchData.badgeNumber);

          return new searchesAlert.SaveSearchCompleteAction(updatedSearchData);
        })
        .catch((err) => {
          return of(new searchesAlert.SaveSearchFailAction('Failed to save search.'));
        });
    });


  constructor(private actions$: Actions,
    private savedSearchStateService: services.SavedSearchStateService,
    private savedSearchService: services.SavedSearchService,
    private appStateService: services.AppStateService) {
  }

}
