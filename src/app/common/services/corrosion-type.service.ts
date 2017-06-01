import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { ICorrosionType } from '../models/corrosion-type.model';
import '../rxjs-extensions';

@Injectable()
export class CorrosionTypeService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}corrosiontypes`;
  constructor(private http: Http) { }

    getAllCorrosionTypes(): Observable<ICorrosionType[]> {
      return this.http.get(this.endPointUrl)
                    .map((result) => result.json());
    };

}
