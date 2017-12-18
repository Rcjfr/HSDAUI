import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '@env/environment';
import { IChangeLog } from '@app/common/models/change-log.model';

@Injectable()
export class ChangeLog {
  private endPointUrl = `${environment.hsdaApiBaseUrl}changelog`;
  constructor(private http: HttpClient) { }

  getChangeLog(id: number, version: number): Observable<IChangeLog[]> {

    return this.http.get<IChangeLog[]>(`${this.endPointUrl}/${id}/version/${version}`);
  };

}
