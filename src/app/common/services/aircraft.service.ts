import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import {IAircraftInfo} from '../models/aircraft-info.model';

@Injectable()
export class AircraftService {
  private endPointUrl: string = environment.aircraftServiceEndPointUrl;
  constructor(private http: Http) { }

  queryNoseNumbers(search: string): Observable<Array<string>> {
      // TODO: commented till AircraftInfo Service is ready
        // const url = `${this.endPointUrl}` + (search ? `?search=${search}` : '');
        // return this.http.get(url)
        //            .map((result) => result.json());
      return Observable.of(['E190', 'A328']);
    };
    getAircraftInfo(noseNumber: string): Observable<IAircraftInfo> {
        return this.http.get(`${this.endPointUrl}${noseNumber}/hsda_attributes`)
                    .map((result) => result.json());
    };

}
