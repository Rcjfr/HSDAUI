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

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    NKDatetimeModule,
    FormsModule,
    ReactiveFormsModule,
    FormControlsModule,
    TypeaheadModule.forRoot(),
    RouterModule.forChild([
      { path: 'mrl', component: MrlReportMainComponent, children: [] },
    ])
  ],
  exports: [MrlReportMainComponent],
  declarations: [MrlReportMainComponent, MrlReportSearchComponent]
})
export class SdaReportsModule { }
