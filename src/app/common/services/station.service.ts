import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { IStation } from '../models/station.model';
import '../rxjs-extensions';

@Injectable()
export class StationService {
  private endPointUrl = `${environment.hsdaApiBaseUrl}stations`;
  constructor(private http: HttpClient) { }

  getStations(token: string): Observable<IStation[]> {
    const url = `${this.endPointUrl}?token=${token}`;

    return this.http.get<IStation[]>(url);
  };
}
