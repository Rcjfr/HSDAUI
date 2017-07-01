import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import '../rxjs-extensions';
import { environment } from '../../../environments/environment';
import { IBaseLookUp } from '../models/base-lookup.model';
@Injectable()
export class DteStatusService {
  private endPointUrl = `${environment.hsdaApiBaseUrl}dteStatus`;
  constructor(private http: Http) { }
  getAllDTEStatus(): Observable<IBaseLookUp[]> {
    return Observable.of([
      { id: 1, description: 'Open' },
      { id: 2, description: 'Closed' }
    ]);
  }

}
