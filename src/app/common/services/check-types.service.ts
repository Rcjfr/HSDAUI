import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { ICheckType } from '../models/check-type.model';
import '../rxjs-extensions';


@Injectable()
export class CheckTypesService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}fleettypes`;
  constructor(private http: Http) { }

    getAllCheckTypes(fleetType: string): Observable<ICheckType[]> {
      return this.http.get(`${this.endPointUrl}/${fleetType}/check_types`)
                    .map((result) => result.json());
    };


}
