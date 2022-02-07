import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '@env/environment';
import { Helper } from '@app/common/helper';
import * as models from '@app/common/models';
import { AuthService } from '@app/common/services/auth.service';
import { ISdaListResult } from '@app/common/models';
import { ILoadSda } from '@app/common/models/payload/load-sda.model';
import { ResponseContentType } from '@angular/http';
import { IReportOption, ReportOptions } from '@app/components/search/search-report/options';
import { saveAs } from 'file-saver';
import { of } from 'rxjs/observable/of';
@Injectable()
export class SdaService {

  private endPointUrl = `${environment.hsdaApiBaseUrl}sda`;
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  saveSda(sda: models.ISda): Observable<models.ISda> {
    if (sda.id) {
      return this.http.put(`${this.endPointUrl}/${sda.id}`, sda, { responseType: 'text' })
        .map((result) => Helper.Deserialize(result));
    } else {
      return this.http.post(`${this.endPointUrl}`, sda, { responseType: 'text' })
        .map((result) => Helper.Deserialize(result));
    }
  }

  searchSda(criteria: any, exportToExcel = false): Observable<ISdaListResult> {
    let hasSearchCriteria = false;
    for (const propertyName in criteria) {
      if (typeof criteria[propertyName] !== 'undefined' &&
        propertyName.indexOf('search') > -1) {
        hasSearchCriteria = true;
        break;
      }
    }
    if (!hasSearchCriteria) {
      return of({ records: [], totalRecords: 0 }).delay(1); //TODO: without the delay its failing.need to revisit
    }

    if (exportToExcel) {
      if (!criteria.reportColumns || criteria.reportColumns.length === 0) {
        criteria.reportColumns = ReportOptions;
      }
      const headers = new HttpHeaders({
        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      return this.http.post(this.endPointUrl + '/search', criteria,
        {
          headers: headers,
          responseType: 'blob'
        }).do(blob => {
          saveAs(new Blob([blob]), 'SDAReport.xlsx');
          //let a = document.createElement("a");
          //a.href = URL.createObjectURL(blob);
          //a.download = 'SDAReport.xlsx';
          //document.body.appendChild(a);
          //a.click();
        }).mapTo(null);
    }


    return this.http.post<ISdaListResult>(this.endPointUrl + '/search', criteria);

  }

  exportMrlExcel(criteria: any): Observable<any> {

    const headers = new HttpHeaders({
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    return this.http.post(this.endPointUrl + '/Reports/MRL/Export', criteria,
      {
        headers: headers,
        responseType: 'blob'
      }).do(blob => {
        saveAs(new Blob([blob]), 'MRLReport.xlsx');
      })
      .mapTo(null);
  }

  exportTwdExcel(criteria: any): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    return this.http.post(this.endPointUrl + '/Reports/TWD/Export', criteria,
      {
        headers: headers,
        responseType: 'blob'
      }).do(blob => {
        saveAs(new Blob([blob]), 'TWDReport.xlsx');
      })
      .mapTo(null);
  }

  viewTWD(criteria: any): Observable<ISdaListResult> {
    let hasSearchCriteria = false;
    for (const propertyName in criteria) {
      if (typeof criteria[propertyName] !== 'undefined' &&
        propertyName.indexOf('search') > -1) {
        hasSearchCriteria = true;
        break;
      }
    }
    if (!hasSearchCriteria) {
      return of({ records: [], totalRecords: 0 }).delay(1); //TODO: without the delay its failing.need to revisit
    }
    
    return this.http.post<ISdaListResult>(this.endPointUrl + '/Reports/TWD/View', criteria);
  }

  getSda(payload: ILoadSda): Observable<models.ISda> {
    let url = `${this.endPointUrl}/${payload.sdaId}`;
    if (payload.original) {
      url = `${url}/original`;
    }
    if (payload.version) {
      url = `${url}/version/${payload.version}`;
    }

    return this.http.get(url, { responseType: 'text' })
      .map((result) => Helper.Deserialize(result));
  }

  exportSda(id: number): Observable<models.ISdaListView> {
    return this.http.get<models.ISdaListView>(`${this.endPointUrl}/${id}/export`);
  }

  downloadAttachment(id: number, attachmentPath: string, attachmentName: string): Observable<any> {
    return this.http.get(`${this.endPointUrl}/${id}/attachments/${attachmentPath}/${attachmentName}`,
      {
        responseType: 'blob'
      }).do(blob => {
        saveAs(new Blob([blob]), attachmentName);
      }).mapTo(null);
  }

}
