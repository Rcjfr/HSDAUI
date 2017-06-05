import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { IStation } from '../models/station.model';
import '../rxjs-extensions';

@Injectable()
export class StationService {
  private endPointUrl = `${environment.hsdaApiBaseUrl}stations`;
  constructor(private http: Http) { }

    getAllStations(): Observable<IStation[]> {
      return this.http.get(this.endPointUrl)
                    .map((result) => result.json());
    };

}
