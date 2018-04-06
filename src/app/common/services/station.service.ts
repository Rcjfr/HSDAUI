import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '@env/environment';
import { IStation } from '@app/common/models/station.model';


@Injectable()
export class StationService {
  private endPointUrl = `${environment.hsdaApiBaseUrl}stations`;
  constructor(private http: HttpClient) { }

  getStations(token: string): Observable<IStation[]> {
    const url = `${this.endPointUrl}?query=${token}`;

    return this.http.get<IStation[]>(url);
  };
}
