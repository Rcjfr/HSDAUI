import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '@env/environment';
import { Helper } from '@app/common/helper';
import * as models from '@app/common/models';
import '@app/common/rxjs-extensions';
import { AuthService } from '@app/common/services/auth.service';
import { ISdaListResult } from '@app/common/models';
import { ILoadSda } from '@app/common/models/payload/load-sda.model';

@Injectable()
export class SdaService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}sda`;
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  saveSda(sda: models.ISda): Observable<models.ISda> {
    if (sda.id) {
      return this.http.put(`${this.endPointUrl}/${sda.id}`, sda, { responseType: 'text' })
        .map((result) => Helper.Deserialize(result));
    } else {
      return this.http.post(this.endPointUrl, sda, { responseType: 'text' })
        .map((result) => Helper.Deserialize(result));
    }
  };

  searchSda(criteria): Observable<ISdaListResult> {
    return this.http.post<ISdaListResult>(this.endPointUrl + '/search', criteria);
  };

  getSda(payload: ILoadSda): Observable<models.ISda> {
    let url = `${this.endPointUrl}/${payload.sdaId}`;
    if (payload.original) {
      url = `${url}/original`;
    }
    if (payload.version) {
      url = `${url}/version/${payload.version}`;
    }

    return this.http.get(url, { responseType: 'text' })
      .map((result) => Helper.Deserialize(result));
  };

}
