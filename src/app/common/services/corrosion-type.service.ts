import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { ICorrosionType } from '../models/corrosion-type.model';
import '../rxjs-extensions';

@Injectable()
export class CorrosionTypeService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}corrosiontypes`;
  constructor(private http: HttpClient) { }

    getAllCorrosionTypes(): Observable<ICorrosionType[]> {
      return this.http.get(this.endPointUrl);
    };

}
