import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Helper } from '../helper';
import * as models from '../models';
import '../rxjs-extensions';
import { AuthService } from './auth.service';

@Injectable()
export class SdaService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}sda`;
  constructor(private http: Http, private authService: AuthService) {
  }

  saveSda(sda: models.ISda): Observable<number> {
    return this.authService.requestOptions().flatMap(options => {
      if (sda.id) {
        return this.http.put(`${this.endPointUrl}/${sda.id}`, sda, options)
          .map((result) => result.json());
      } else {
        return this.http.post(this.endPointUrl, sda, options)
          .map((result) => result.json());
      }
    });
  };
  getAllSda(): Observable<models.ISdaListView[]> {
    return this.authService.requestOptions().flatMap(options => {
      return this.http.get(this.endPointUrl, options)
        .map((result) => result.json());
    });
  };
  getSda(sdaId: number): Observable<models.ISda> {
    return this.authService.requestOptions().flatMap(options => {
      return this.http.get(`${this.endPointUrl}/${sdaId}`, options)
        .map((result) => Helper.Deserialize(result.text()));
    });
  };

}
