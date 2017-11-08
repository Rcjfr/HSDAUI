import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ILookupData } from '@app/common/models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LookupDataService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}lookupdata`;
  constructor(private http: HttpClient) { }

  getLookupData(): Observable<ILookupData> {
    return this.http.get<ILookupData>(this.endPointUrl);
  };

}
