import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { IAircraftInfo } from '../models/aircraft-info.model';

@Injectable()
export class AircraftService {
  private endPointUrl = `${environment.hsdaApiBaseUrl}aircraft`;
  constructor(private http: HttpClient) { }

  queryNoseNumbers(search: string): Observable<Array<string>> {
    // TODO: commented till AircraftInfo Service is ready
     const url = `${this.endPointUrl}?search=${search}`;
     return this.http.get(url);
    //return Observable.of(['E190', 'A328']);
  };
  getAircraftInfo(noseNumber: string): Observable<IAircraftInfo> {
    return this.http.get(`${this.endPointUrl}/${noseNumber}/hsda_attributes`);
  };

}
