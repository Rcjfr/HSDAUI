import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { IRepairDocument } from '../models/repair-document.model';
import '../rxjs-extensions';

@Injectable()
export class RepairDocumentService {

    private endPointUrl = `${environment.hsdaApiBaseUrl}repairdocument`;
    constructor(private http: Http) { }

    getAllRepairDocuments(): Observable<IRepairDocument[]> {
        //TODO:Uncomment when lookup table is available
        //return this.http.get(this.endPointUrl)
        //  .map((result) => result.json());
        return Observable.of([
              { id: 1, description: 'AARD' },
              { id: 2, description: 'AARD (w/supporting EA)' },
              { id: 3, description: 'AMM' },
              { id: 4, description: 'EA' },
              { id: 5, description: 'ECO' },
              { id: 6, description: 'DNF ESO' },
              { id: 7, description: 'Field EA' },
              { id: 8, description: 'MCM' },
              { id: 9, description: 'MRB' },
              { id: 10, description: 'Shop ESO' },
              { id: 11, description: 'Shop ESO (w/supporting EA)' },
              { id: 12, description: 'SRM (w/supporting EA)' },
              { id: 13, description: 'SRM' },
              { id: 14, description: 'BCSRPP' }
        ]);
    };
}
