import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as searchesAlert from '../actions/saved-searches';
import * as services from '../services';
import * as models from '../models';
import '../rxjs-extensions';


@Injectable()
export class SavedSearchesEffects {

  @Effect()
  loadSearches$: Observable<Action> = this.actions$
    .ofType(searchesAlert.ActionTypes.LOAD_SEARCHES)
    .switchMap(() => {
      return this.savedSearchService.getSavedSearches()
        .map((data: any) => {
          return new searchesAlert.LoadSearchesCompleteAction(data);
        })
        .catch((err) => {
          return of(new searchesAlert.LoadSearchesFailAction('Failed to load saved searches.'));
        });
    });

  constructor(private actions$: Actions,
    private savedSearchStateService: services.SavedSearchStateService,
    private savedSearchService: services.SavedSearchService,
    private appStateService: services.AppStateService) {
  }

}
