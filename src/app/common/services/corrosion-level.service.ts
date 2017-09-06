import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { ICorrosionLevel } from '../models/corrosion-level.model';
import '../rxjs-extensions';

@Injectable()
export class CorrosionLevelService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}corrosionlevels`;
  constructor(private http: HttpClient) { }

    getAllCorrosionLevels(): Observable<ICorrosionLevel[]> {
      return this.http.get(this.endPointUrl);
    };


}
