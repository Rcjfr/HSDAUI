import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '@env/environment';
import { IChangeLog } from '@app/common/models/change-log.model';
import { Helper } from '@app/common/helper';

@Injectable()
export class ChangeLog {
  private endPointUrl = `${environment.hsdaApiBaseUrl}sda`;
  constructor(private http: HttpClient) { }

  getChangeLog(id: number, version: number): Observable<IChangeLog[]> {
    return this.http.get(`${this.endPointUrl}/${id}/version/${version}/changelog`, { responseType: 'text' })
    .map((result) => Helper.Deserialize(result));
  };

}
