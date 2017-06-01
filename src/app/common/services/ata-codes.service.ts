import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import { IATACode } from '../models/ata-code.model';

@Injectable()
export class ATACodesService {

    constructor(private http: Http) { }

    getATACodes(): Observable<Array<IATACode>> {
        return this.http.get('assets/ata-codes.json')
          .map((result) => result.json());
    };
}
