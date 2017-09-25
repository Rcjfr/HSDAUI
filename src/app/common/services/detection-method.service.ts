import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { IDetectionMethod } from '../models/detection-method.model';
import '../rxjs-extensions';
import { Http } from '@angular/http';
@Injectable()
export class DetectionMethodService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}detectionmethods`;
  constructor(private http: HttpClient) { }

  getAllDetectionMethods(): Observable<IDetectionMethod[]> {
    return this.http.get<IDetectionMethod[]>(this.endPointUrl);
  };
}
