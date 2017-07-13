import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { IFloorboardCondition } from '../models/floorboard-condition.model';
import '../rxjs-extensions';

@Injectable()
export class FloorboardConditionService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}floorboardcondition`;
  constructor(private http: Http) { }

  getAllfloorboardConditions(): Observable<IFloorboardCondition[]> {
    //TODO:Uncomment when lookup table is available
    //return this.http.get(this.endPointUrl)
    //  .map((result) => result.json());
    return Observable.of([
        { id: 1, description: 'Wet' },
      { id: 2, description: 'Dry' },
    ]);
  };
}
