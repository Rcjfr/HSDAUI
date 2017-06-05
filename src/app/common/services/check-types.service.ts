import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { ICheckType } from '../models/check-type.model';
import '../rxjs-extensions';


@Injectable()
export class CheckTypesService {

  private fleetTypesEndPointUrl = `${environment.hsdaApiBaseUrl}fleettypes`;
  private checkTypesEndPointUrl = `${environment.hsdaApiBaseUrl}checktypes`;
  constructor(private http: Http) { }

    getAllCheckTypes(): Observable<ICheckType[]> {
      return this.http.get(this.checkTypesEndPointUrl)
                    .map((result) => result.json());
    };
 getFleetCheckTypes(fleetType: string): Observable<ICheckType[]> {
      return this.http.get(`${this.fleetTypesEndPointUrl}/${fleetType}/check_types`)
                    .map((result) => result.json());
    };


}
