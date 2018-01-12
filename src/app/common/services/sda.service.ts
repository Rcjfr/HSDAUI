import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '@env/environment';
import { Helper } from '@app/common/helper';
import * as models from '@app/common/models';
import '@app/common/rxjs-extensions';
import { AuthService } from '@app/common/services/auth.service';
import { ISdaListResult } from '@app/common/models';
import { ILoadSda } from '@app/common/models/payload/load-sda.model';
import { ResponseContentType } from '@angular/http';
import { IReportOption, ReportOptions } from '@app/components/search/search-report/options';
import { saveAs } from 'file-saver';
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
  };

  searchSda(criteria: any, exportToExcel: boolean = false): Observable<ISdaListResult> {
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

  };

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
  };

  exportSda(id: number): Observable<models.ISdaListView> {
    return this.http.get<models.ISdaListView>(`${this.endPointUrl}/${id}/export`);
  }

}
