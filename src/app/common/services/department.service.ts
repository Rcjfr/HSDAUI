import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { IDepartment } from '../models/department.model';
import '../rxjs-extensions';

@Injectable()
export class DepartmentService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}departments`;
  constructor(private http: HttpClient) { }

    getAllDepartments(): Observable<IDepartment[]> {
      return this.http.get(this.endPointUrl);
    };

}
