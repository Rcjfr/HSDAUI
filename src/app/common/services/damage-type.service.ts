import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { IDamageType } from '../models/damage-type.model';
import '../rxjs-extensions';

@Injectable()
export class DamageTypeService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}damagetypes`;
  constructor(private http: Http) { }

  getAllDamageTypes(): Observable<IDamageType[]> {
    //TODO:Uncomment when lookup table is available
    //return this.http.get(this.endPointUrl)
    //  .map((result) => result.json());
    return Observable.of([
      { id: 1, description: 'Accidental (other than impact)' },
      { id: 2, description: 'Crack' },
      { id: 3, description: 'Corrosion' },
      { id: 4, description: 'Delamination/Disbond' },
      { id: 5, description: 'Impact' },
      { id: 6, description: 'Heat' },
      { id: 7, description: 'Wear' },
      { id: 8, description: 'Lightening Strike/ Static Discharge' },
      { id: 9, description: 'Replacement of Temp Repair' },
      { id: 10, description: 'Scribe Line' },
      { id: 11, description: 'Unknown' }
    ]);
  };
}
