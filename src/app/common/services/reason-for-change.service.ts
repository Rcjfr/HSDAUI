import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { IReasonForChange } from '../models';
import '../rxjs-extensions';

@Injectable()
export class ReasonForChangeService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}reasonsforchange`;
  constructor(private http: Http) { }

  getAllReasonsForChange(): Observable<IReasonForChange[]> {
    //TODO:Uncomment when lookup table is available
    //return this.http.get(this.endPointUrl)
    //  .map((result) => result.json());
    return Observable.of([
      { id: 1, description: 'Incorrect per Corrosion Level Block Diagram' },
      { id: 2, description: 'Evidence of a previous blend has been determined' },
      { id: 3, description: 'New limits have been defined' },
      { id: 4, description: 'Pre-blended measurements indicate Level - 1; elected to replace part for company convenience' }
    ]);
  };

}
