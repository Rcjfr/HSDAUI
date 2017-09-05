import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  saveSda(sda: models.ISda): Observable<models.ISda> {
    if (sda.id) {
      return this.http.put(`${this.endPointUrl}/${sda.id}`, sda);
    } else {
      return this.http.post(this.endPointUrl, sda);
    }
  };

  searchSda(criteria): Observable<SdaListResult> {
    return this.http.post(this.endPointUrl + '/search', criteria);
  };

  getAllSda(pageData): Observable<SdaListResult> {
    return this.http.post(this.endPointUrl + 's', pageData);
  };

  getSda(sdaId: number): Observable<models.ISda> {
    return this.http.get(`${this.endPointUrl}/${sdaId}`, { responseType: 'text' })
      .map((result) => Helper.Deserialize(result));
  };

}
