import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import { IATACode } from '../models/ata-code.model';
import { environment } from '../../../environments/environment';
@Injectable()
export class ATACodesService {
  private endPointUrl = `${environment.hsdaApiBaseUrl}atacodes`;
  constructor(private http: HttpClient) { }

  getATACodes(): Observable<IATACode[]> {
    return this.http.get(this.endPointUrl);
  };

}
