import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Helper } from '../helper';
import * as models from '../models';
import '../rxjs-extensions';
import { AuthService } from './auth.service';
import { SdaListResult } from 'app/common/models/sda-list-result.model';

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
        return this.http.post(this.endPointUrl, sda)
          .map((result) => result.json());
      }
    });
  };

  searchSda(criteria): Observable<SdaListResult> {
    return this.http.post(this.endPointUrl + '/search', criteria)
      .map((result) => result.json());
  };

  getAllSda(pageData): Observable<SdaListResult> {
    return this.http.post(this.endPointUrl + 's', pageData)
      .map((result) => result.json());
  };

  getSda(sdaId: number): Observable<models.ISda> {
    return this.authService.requestOptions().flatMap(options => {
      return this.http.get(`${this.endPointUrl}/${sdaId}`, options)
        .map((result) => Helper.Deserialize(result.text()));
    });
  };

}
