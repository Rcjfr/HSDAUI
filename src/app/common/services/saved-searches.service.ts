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

    constructor(private http: HttpClient, private authService: AuthService) { }

    saveSearch(searchData: any): Observable<any> {
        if (searchData) {
            return this.http.post(`${this.endPointUrl}/savedsearches`, searchData)
        }
    }

    getSavedSearches(): Observable<any> {
        //TODO
        const badgeNumber = '531621';
        const test = this.authService.badgeId;  //This isn't returning a value

        return this.http.get(`${this.endPointUrl}/users/${badgeNumber}/savedsearches`)

        // return Observable.of([
        //     { searchId: 1, name: 'Pending DTE', default: false, criteria: '' },
        //     { searchId: 2, name: 'Existing Inspections Adequate - CAT A', default: true, criteria: ''  },
        //     { searchId: 3, name: 'Permanent Repair', default: false, criteria: ''  },
        //     { searchId: 4, name: 'TimeLimited Repair', default: false, criteria: ''  },
        //     { searchId: 5, name: 'Permanent Repair', default: false, criteria: ''  },
        //     { searchId: 6, name: 'Interim Repair', default: false, criteria: ''  }
        //   ]);
    };
}