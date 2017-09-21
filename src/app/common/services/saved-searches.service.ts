import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { ISavedSearch } from 'app/common/models/saved-search.model';
import { Helper } from 'app/common/helper';

@Injectable()
export class SavedSearchService {
    private endPointUrl = `${environment.hsdaApiBaseUrl}`;
    badgeNumber = '531621';

    constructor(private http: HttpClient, private authService: AuthService) { }

    saveSearch(searchData: ISavedSearch): Observable<any> {
        if (searchData && this.badgeNumber) {
            searchData.badgeNumber = this.badgeNumber;

            return this.http.post(`${this.endPointUrl}savedsearches`, searchData)
        }
    }

    getSavedSearches(badgeNumber): Observable<any> {
        if (this.badgeNumber) {
            return this.http.get(`${this.endPointUrl}/users/${badgeNumber}/savedsearches`)
        }
    };
}