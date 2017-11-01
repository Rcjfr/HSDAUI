import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { TextMaskModule } from 'angular2-text-mask';
import { TypeaheadModule, TabsModule } from 'ngx-bootstrap';
import { NgPipesModule } from 'ng-pipes';
import { FormControlsModule } from './../../common/components/form-controls.module';

import { SearchByDateRangeComponent } from './search-by-date-range/search-by-date-range.component';
import { SearchBySdaFormComponent } from './search-by-sda-form/search-by-sda-form.component';
import { SearchByAircraftComponent } from './search-by-aircraft/search-by-aircraft.component';
import { SearchByCorrosionComponent } from './search-by-corrosion/search-by-corrosion.component';
import { SearchByMaintenanceComponent } from './search-by-maintenance/search-by-maintenance.component';
import { SearchByStatusComponent } from './search-by-status/search-by-status.component';
import { SearchByCorrectiveActionComponent } from './search-by-corrective-action/search-by-corrective-action.component';
import { SearchByDefectComponent } from './search-by-defect/search-by-defect.component';
import { SearchByCpcpDispositionComponent } from './search-by-cpcp-disposition/search-by-cpcp-disposition.component';
import { SearchByPartComponent } from './search-by-part/search-by-part.component';
import { SearchReportComponent } from './search-report/search-report.component';
import { SearchOptionsComponent } from './search-options/search-options.component';
import { SavedSearchesComponent } from './saved-searches/saved-searches.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NKDatetimeModule,
    TextMaskModule,
    NgPipesModule,
    TypeaheadModule.forRoot(),
    TabsModule.forRoot(),
    FormControlsModule
  ],
  exports: [
    SearchByDateRangeComponent,
    SearchBySdaFormComponent,
    SearchByAircraftComponent,
    SearchByCorrosionComponent,
    SearchByMaintenanceComponent,
    SearchByMaintenanceComponent,
    SearchByStatusComponent,
    SearchByCorrectiveActionComponent,
    SearchByDefectComponent,
    SearchByCpcpDispositionComponent,
    SearchByPartComponent,
    SearchReportComponent,
    SearchOptionsComponent,
    SavedSearchesComponent
  ],
  declarations: [
    SearchByDateRangeComponent,
    SearchBySdaFormComponent,
    SearchByAircraftComponent,
    SearchByCorrosionComponent,
    SearchByMaintenanceComponent,
    SearchByMaintenanceComponent,
    SearchByStatusComponent,
    SearchByCorrectiveActionComponent,
    SearchByDefectComponent,
    SearchByCpcpDispositionComponent,
    SearchByPartComponent,
    SearchReportComponent,
    SearchOptionsComponent,
    SavedSearchesComponent
  ],
  providers: []
})
export class SdaSearchModule { }
