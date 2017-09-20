import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class SavedSearchService {
    private endPointUrl = `${environment.hsdaApiBaseUrl}searches`;

    constructor(private http: HttpClient, private authService: AuthService) { }

    saveSearch(searchData: any): Observable<any> {
        if (searchData) {
            return this.http.post(`${this.endPointUrl}/`, searchData, { responseType: 'text' })
        }
    }

    getSavedSearches(): Observable<any> {
        //TODO
        //return this.http.get(`${this.endPointUrl}/`, { responseType: 'text' });

        return Observable.of([
            { id: 1, name: 'Pending DTE', default: false, criteria: '' },
            { id: 2, name: 'Existing Inspections Adequate - CAT A', default: true, criteria: ''  },
            { id: 3, name: 'Permanent Repair', default: false, criteria: ''  },
            { id: 4, name: 'TimeLimited Repair', default: false, criteria: ''  },
            { id: 5, name: 'Permanent Repair', default: false, criteria: ''  },
            { id: 6, name: 'Interim Repair', default: false, criteria: ''  }
          ]);
    };
}