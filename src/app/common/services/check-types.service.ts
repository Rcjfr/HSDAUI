import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FleetCheckType } from '../models/check-type.model';

@Injectable()
export class CheckTypesService {

  constructor(private http: Http) { }
getCheckTypes(): Observable < Array < FleetCheckType >> {
          return this.http.get('assets/check-types.json')
              .map((result) => result.json());
    };


}
