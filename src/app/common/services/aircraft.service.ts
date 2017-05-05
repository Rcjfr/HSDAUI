import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import {AircraftInfo} from '../models/aircraft-info.model';

@Injectable()
export class AircraftService {
  private endPointUrl: string = environment.aircraftServiceEndPointUrl;
  constructor(private http: Http) { }

    queryNoseNumbers(search: string): Observable<Array<string>> {
        const url = `${this.endPointUrl}` + (search ? `?search=${search}` : '');
        return this.http.get(url)
                    .map((result) => result.json());
    };
    getAircraftInfo(noseNumber: string): Observable<AircraftInfo> {
        return this.http.get(`${this.endPointUrl}${noseNumber}/hsda_attributes`)
                    .map((result) => result.json());
    };

}
