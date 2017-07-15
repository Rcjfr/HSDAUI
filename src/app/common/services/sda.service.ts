import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import * as models from '../models';
import '../rxjs-extensions';

@Injectable()
export class SdaService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}sda`;
  constructor(private http: Http) { }

  saveSda(sda:models.ISda): Observable<number> {
    return this.http.post(this.endPointUrl,sda)
      .map((result) => result.json());
  };
  getAllSda(): Observable<models.ISdaListView[]> {
    return this.http.get(this.endPointUrl)
      .map((result) => result.json());
  };

}
