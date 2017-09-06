import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { IAlertCode } from '../models/alert-code.model';
import '../rxjs-extensions';

@Injectable()
export class AlertCodeService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}alertcodes`;
  constructor(private http: HttpClient) { }

    getAllAlertCodes(): Observable<IAlertCode[]> {
      return this.http.get(this.endPointUrl);
    };

}
