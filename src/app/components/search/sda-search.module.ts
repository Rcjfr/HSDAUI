import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PickListModule } from 'primeng/primeng';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { TextMaskModule } from 'angular2-text-mask';
import { TypeaheadModule, TabsModule } from 'ngx-bootstrap';
import { NgPipesModule } from 'ng-pipes';
import { FormControlsModule } from '@app/common/components/form-controls.module';

import { SearchByDateRangeComponent } from '@app/components/search/search-by-date-range/search-by-date-range.component';
import { SearchBySdaFormComponent } from '@app/components/search/search-by-sda-form/search-by-sda-form.component';
import { SearchByAircraftComponent } from '@app/components/search/search-by-aircraft/search-by-aircraft.component';
import { SearchByCorrosionComponent } from '@app/components/search/search-by-corrosion/search-by-corrosion.component';
import { SearchByMaintenanceComponent } from '@app/components/search/search-by-maintenance/search-by-maintenance.component';
import { SearchByStatusComponent } from '@app/components/search/search-by-status/search-by-status.component';
import { SearchByCorrectiveActionComponent } from '@app/components/search/search-by-corrective-action/search-by-corrective-action.component';
import { SearchByDefectComponent } from '@app/components/search/search-by-defect/search-by-defect.component';
import { SearchByCpcpDispositionComponent } from '@app/components/search/search-by-cpcp-disposition/search-by-cpcp-disposition.component';
import { SearchByPartComponent } from '@app/components/search/search-by-part/search-by-part.component';
import { SearchReportComponent } from '@app/components/search/search-report/search-report.component';
import { SearchOptionsComponent } from '@app/components/search/search-options/search-options.component';
import { SavedSearchesComponent } from '@app/components/search/saved-searches/saved-searches.component';
import { SearchByDteComponent } from '@app/components/search/search-by-dte/search-by-dte.component';


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
    FormControlsModule,
    PickListModule
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
    SavedSearchesComponent,
    SearchByDteComponent
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
    SavedSearchesComponent,
    SearchByDteComponent
  ],
  providers: []
})
export class SdaSearchModule { }
