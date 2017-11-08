import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '@env/environment';
import { IAircraftInfo } from '@app/common/models/aircraft-info.model';

@Injectable()
export class AircraftService {
  private endPointUrl = `${environment.hsdaApiBaseUrl}aircraft`;
  constructor(private http: HttpClient) { }

  queryNoseNumbers(query: string): Observable<Array<IAircraftInfo>> {
    const url = `${this.endPointUrl}?query=${query}`;

    return this.http.get<Array<IAircraftInfo>>(url);
  };
  getAircraftInfo(noseNumber: string): Observable<IAircraftInfo> {
    return this.http.get<IAircraftInfo>(`${this.endPointUrl}/${noseNumber}/hsda_attributes`);
  };

}
