import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '@env/environment';
import { IAircraftInfo } from '@app/common/models/aircraft-info.model';
import { IAircraftInfoPayload } from '@app/common/models/payload/aircraft-info-payload.model';
import * as moment from 'moment';
@Injectable()
export class AircraftService {
  private endPointUrl = `${environment.hsdaApiBaseUrl}aircraft`;
  constructor(private http: HttpClient) { }

  queryNoseNumbers(query: string): Observable<Array<IAircraftInfo>> {
    const url = `${this.endPointUrl}?query=${query}`;

    return this.http.get<Array<IAircraftInfo>>(url);
  };
  getAircraftInfo(payload: IAircraftInfoPayload): Observable<IAircraftInfo> {
    let endPoint = `${this.endPointUrl}/${payload.noseNumber}/hsda_attributes`;
    if (payload.flightDate) {
      endPoint = `${endPoint}?flightDate=${moment(payload.flightDate).format('YYYY-MM-DD')}`;
    }

    return this.http.get<IAircraftInfo>(endPoint);
  };

}
