import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { IFloorboardCondition } from '../models/floorboard-condition.model';
import '../rxjs-extensions';

@Injectable()
export class FloorboardConditionService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}floorboardcondition`;
  constructor(private http: HttpClient) { }

  getAllfloorboardConditions(): Observable<IFloorboardCondition[]> {
    //TODO:Uncomment when lookup table is available
    //return this.http.get(this.endPointUrl);
    return Observable.of([
        { id: 1, description: 'Wet' },
      { id: 2, description: 'Dry' },
    ]);
  };
}
