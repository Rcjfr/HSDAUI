import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Helper } from '../helper';
import * as models from '../models';
import '../rxjs-extensions';

@Injectable()
export class SdaService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}sda`;
  constructor(private http: Http) { }

  saveSda(sda: models.ISda): Observable<number> {
    if (sda.id) {
      return this.http.put(`${this.endPointUrl}/${sda.id}`, sda)
        .map((result) => result.json());
    } else {
      return this.http.post(this.endPointUrl, sda)
        .map((result) => result.json());
    }
  };
  getAllSda(): Observable<models.ISdaListView[]> {
    return this.http.get(this.endPointUrl)
      .map((result) => result.json());
  };
  getSda(sdaId: number): Observable<models.ISda> {
    return this.http.get(`${this.endPointUrl}/${sdaId}`)
      .map((result) => Helper.Deserialize(result.text()));
  };

}
