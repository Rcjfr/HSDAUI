import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MrlReportMainComponent } from './mrl-report/mrl-report-main/mrl-report-main.component';
import { Routes, RouterModule } from '@angular/router';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MrlReportSearchComponent } from './mrl-report/mrl-report-search/mrl-report-search.component';
import { TypeaheadModule } from 'ngx-bootstrap';
import { TwdReportMainComponent } from './twd-report/twd-report-main/twd-report-main.component';
import { TwdReportSearchComponent } from './twd-report/twd-report-search/twd-report-search.component';
import { TwdReportGridComponent } from './twd-report/twd-report-grid/twd-report-grid.component';
import { DataTableModule } from 'primeng/datatable';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    NKDatetimeModule,
    FormsModule,
    DataTableModule,
    ReactiveFormsModule,
    FormControlsModule,
    TypeaheadModule.forRoot(),
    RouterModule.forChild([
      { path: 'mrl', component: MrlReportMainComponent, children: [] },
      { path: 'twd', component: TwdReportMainComponent, children: [] }
    ])
  ],
  exports: [MrlReportMainComponent],
  declarations: [MrlReportMainComponent, MrlReportSearchComponent, TwdReportMainComponent, TwdReportSearchComponent, TwdReportGridComponent]
})
export class SdaReportsModule { }
