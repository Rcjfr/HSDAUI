import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { IAlertCode } from '../models/alert-code.model';
import '../rxjs-extensions';

@Injectable()
export class AlertCodeService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}alertcodes`;
  constructor(private http: Http) { }

    getAllAlertCodes(): Observable<IAlertCode[]> {
      return this.http.get(this.endPointUrl)
                    .map((result) => result.json());
    };

}
