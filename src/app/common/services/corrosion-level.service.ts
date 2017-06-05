import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { ICorrosionLevel } from '../models/corrosion-level.model';
import '../rxjs-extensions';

@Injectable()
export class CorrosionLevelService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}corrosionlevels`;
  constructor(private http: Http) { }

    getAllCorrosionLevels(): Observable<ICorrosionLevel[]> {
      return this.http.get(this.endPointUrl)
                    .map((result) => result.json());
    };


}
