import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '@env/environment';
import { ICheckType } from '@app/common/models/check-type.model';



@Injectable()
export class CheckTypesService {

  private fleetTypesEndPointUrl = `${environment.hsdaApiBaseUrl}FleetTypes`;
  constructor(private http: HttpClient) { }

  getFleetCheckTypes(fleetType: string): Observable<ICheckType[]> {
    return this.http.get<ICheckType[]>(`${this.fleetTypesEndPointUrl}/${fleetType}/CheckTypes`);
  };


}
