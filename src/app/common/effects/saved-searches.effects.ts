import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as searchesAlert from '../actions/saved-searches';
import * as services from '../services';
import '../rxjs-extensions';
import { ISavedSearch } from 'app/common/models/saved-search.model';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class SavedSearchesEffects {

  @Effect()
  loadSearches$: Observable<Action> = this.actions$
    .ofType(searchesAlert.ActionTypes.LOAD_SEARCHES)
    .map((action: searchesAlert.LoadSearchesAction) => action.payload)
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
      if (data.searchId !== 0) {
        return this.savedSearchService.updateSearch(data)
          .map((updatedSearchData: ISavedSearch) => {
            this.savedSearchStateService.loadSearches(updatedSearchData.badgeNumber);
            this.toastr.success(data.name, 'Updated Search');

            return new searchesAlert.SaveSearchCompleteAction(updatedSearchData);
          })
          .catch((err) => {
            return of(new searchesAlert.SaveSearchFailAction('Failed to save search.'));
          });
      } else {
        return this.savedSearchService.createSearch(data)
          .map((updatedSearchData: ISavedSearch) => {
            this.savedSearchStateService.loadSearches(updatedSearchData.badgeNumber);
            this.toastr.success(data.name, 'Created Search');

            return new searchesAlert.SaveSearchCompleteAction(updatedSearchData);
          })
          .catch((err) => {
            return of(new searchesAlert.SaveSearchFailAction('Failed to save search.'));
          });
      }
    });

  @Effect()
  deleteSearch$: Observable<Action> = this.actions$
    .ofType(searchesAlert.ActionTypes.DELETE_SEARCH)
    .map((action: searchesAlert.DeleteSearchAction) => action.payload)
    .switchMap((data: number) => {
      return this.savedSearchService
        .deleteSearch(data)
        .switchMap(s => this.authStateService.badgeId())
        .map((badgeId: string) => {
          this.savedSearchStateService.loadSearches(badgeId);
          this.toastr.success('', 'Deleted Search');

          return new searchesAlert.DeleteSearchCompleteAction();
        })
        .catch((err) => {
          return of(new searchesAlert.DeleteSearchFailAction('Failed to delete search.'));
        });
    });


  constructor(private actions$: Actions,
    private savedSearchStateService: services.SavedSearchStateService,
    private savedSearchService: services.SavedSearchService,
    private appStateService: services.AppStateService,
    private authStateService: services.AuthService,
    private toastr: ToastrService) {
  }

}
