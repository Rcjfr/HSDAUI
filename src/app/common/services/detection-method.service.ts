import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { IDetectionMethod } from '../models/detection-method.model';
import '../rxjs-extensions';

@Injectable()
export class DetectionMethodService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}detectionmethods`;
  constructor(private http: Http) { }

    getAllDetectionMethods(): Observable<IDetectionMethod[]> {
      return this.http.get(this.endPointUrl)
                    .map((result) => result.json());
    };


}
