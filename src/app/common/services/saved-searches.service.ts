import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { ISavedSearch } from 'app/common/models/saved-search.model';
import { Helper } from 'app/common/helper';

@Injectable()
export class SavedSearchService {
    private endPointUrl = `${environment.hsdaApiBaseUrl}`;

    constructor(private http: HttpClient) { }

    createSearch(searchData: ISavedSearch): Observable<ISavedSearch> {
        if (searchData) {
            return this.http.post<ISavedSearch>(`${this.endPointUrl}savedsearches`, searchData)
        }
    }

    updateSearch(searchData: ISavedSearch): Observable<ISavedSearch> {
        if (searchData) {
            return this.http.put<ISavedSearch>(`${this.endPointUrl}savedsearches/${searchData.searchId}`, searchData)
        }
    }

    deleteSearch(id: number): Observable<ISavedSearch> {
        if (id) {
            return this.http.delete<ISavedSearch>(`${this.endPointUrl}savedsearches/${id}`)
        }
    }

    getSavedSearches(badgeNumber): Observable<ISavedSearch[]> {
        if (badgeNumber) {
            return this.http.get<ISavedSearch[]>(`${this.endPointUrl}users/${badgeNumber}/savedsearches`)
        }
    };
}