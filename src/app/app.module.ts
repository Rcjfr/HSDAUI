import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgPipesModule } from 'ng-pipes';
import * as $ from 'jquery';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { AccordionModule, TypeaheadModule, TabsModule } from 'ngx-bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { TextMaskModule } from 'angular2-text-mask';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { NavBarComponent } from './common/components/nav-bar/nav-bar.component';
import { HeaderComponent } from './common/components/header/header.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AlertDetailComponent } from './components/alert-detail/alert-detail.component';
import {
  AircraftService,
  AlertCodeService,
  AppStateService,
  ATACodesService,
  CheckTypesService,
  CorrosionLevelService,
  CorrosionTypeService,
  DepartmentService,
  DetectionMethodService,
  StationService,
  DamageTypeService,
  CauseOfDamageService,
  FloorboardConditionService,
  RepairDocumentService,
  RepairDescriptionService,
  ReasonForChangeService

} from './common/services';
import { AlertEffects } from './common/effects/alerts.effects';
import { LookupDataEffects } from './common/effects/lookup-data.effects';
import { reducer } from './common/reducers';
import { AlertDetailViewComponent } from './components/alert-detail-view/alert-detail-view.component';
import { GeneralSectionFormComponent } from './components/general-section-form/general-section-form.component';
import { AircraftInfoSectionFormComponent } from './components/aircraft-info-section-form/aircraft-info-section-form.component';
import { DefectLocationSectionFormComponent } from './components/defect-location-section-form/defect-location-section-form.component';
import {
  DefectDiscoveredDuringSectionFormComponent
} from './components/defect-discovered-during-section-form/defect-discovered-during-section-form.component';
import { ScheduledMaintenanceSectionComponent } from './components/scheduled-maintenance-section/scheduled-maintenance-section.component';
import {
  UnscheduledMaintenanceSectionComponent
} from './components/unscheduled-maintenance-section/unscheduled-maintenance-section.component';
import { AtaCodeComponent } from './components/ata-code/ata-code.component';
import { FormControlsModule } from './common/components/form-controls.module';
import { PreciseLocationGroupComponent } from './components/precise-location-group/precise-location-group.component';
import { CpcpSectionComponent } from './components/cpcp-section/cpcp-section.component';
import { CauseOfDamageGroupComponent } from './components/cause-of-damage-group/cause-of-damage-group.component';
import { CorrectiveActionFormGroupComponent } from './components/corrective-action-form/corrective-action-form.component';
import { CorrectiveActionRepairDescriptionComponent } from './components/corrective-action-repair-description/corrective-action-repair-description.component';
import { CorrectiveActionOptionsComponent } from './components/corrective-action-options/corrective-action-options.component';
import { AlertsSearchComponent } from './components/alerts-search/alerts-search.component';
import { SearchByDateRangeComponent } from './components/search/search-by-date-range/search-by-date-range.component';
import { SearchBySdaFormComponent } from './components/search/search-by-sda-form/search-by-sda-form.component';
import { SearchByAircraftComponent } from './components/search/search-by-aircraft/search-by-aircraft.component';
import { SearchByCorrosionComponent } from './components/search/search-by-corrosion/search-by-corrosion.component';
import { CauseOfDamageDescriptionComponent } from './components/cause-of-damage-description/cause-of-damage-description.component';
import { CorrectiveActionChapComponent } from './components/corrective-action-chap/corrective-action-chap.component';
import { SearchByMaintenanceComponent } from './components/search/search-by-maintenance/search-by-maintenance.component';
import { CurrentStatusSectionComponent } from './components/current-status-section/current-status-section.component';
import { SearchByStatusComponent } from './components/search/search-by-status/search-by-status.component';
import { SearchByCorrectiveActionComponent } from './components/search/search-by-corrective-action/search-by-corrective-action.component';
import { SearchByDefectComponent } from './components/search/search-by-defect/search-by-defect.component';
import { ModifiedPartDescriptionComponent } from './components/modified-part-description/modified-part-description.component';
import { DefectivePartDescriptionComponent } from './components/defective-part-description/defective-part-description.component';
import { SearchByCpcpDispositionComponent } from './components/search/search-by-cpcp-disposition/search-by-cpcp-disposition.component';
import { CpcpDispositionSectionComponent } from './components/cpcp-disposition-section/cpcp-disposition-section.component';
import { CpcpTaskDescriptionComponent } from './components/cpcp-task-description/cpcp-task-description.component';
import { RepairDetailsSectionComponent } from './components/repair-details-section/repair-details-section.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeaderComponent,
    AlertsComponent,
    AlertDetailComponent,
    AlertDetailViewComponent,
    GeneralSectionFormComponent,
    AircraftInfoSectionFormComponent,
    DefectLocationSectionFormComponent,
    DefectDiscoveredDuringSectionFormComponent,
    ScheduledMaintenanceSectionComponent,
    UnscheduledMaintenanceSectionComponent,
    AtaCodeComponent,
    PreciseLocationGroupComponent,
    CpcpSectionComponent,
    CauseOfDamageGroupComponent,
    CorrectiveActionFormGroupComponent,
    CorrectiveActionOptionsComponent,
    CorrectiveActionRepairDescriptionComponent,
    AlertsSearchComponent,
    SearchByDateRangeComponent,
    SearchBySdaFormComponent,
    SearchByAircraftComponent,
    SearchByCorrosionComponent,
    CauseOfDamageDescriptionComponent,
    CorrectiveActionChapComponent,
    SearchByMaintenanceComponent,
    CurrentStatusSectionComponent,
    SearchByMaintenanceComponent,
    SearchByStatusComponent,
    SearchByCorrectiveActionComponent,
    SearchByDefectComponent,
    ModifiedPartDescriptionComponent,
    DefectivePartDescriptionComponent,
    CurrentStatusSectionComponent,
    SearchByCpcpDispositionComponent,
    CpcpDispositionSectionComponent,
    CpcpTaskDescriptionComponent,
    RepairDetailsSectionComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FormControlsModule,
    HttpModule,
    AppRoutingModule,
    NKDatetimeModule,
    TextMaskModule,
    NgPipesModule,
    TypeaheadModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    ToastModule.forRoot(),
    StoreModule.provideStore(reducer),
    EffectsModule.run(AlertEffects),
    EffectsModule.run(LookupDataEffects)
  ],
  providers: [
    AircraftService,
    AlertCodeService,
    AppStateService,
    ATACodesService,
    CheckTypesService,
    CorrosionLevelService,
    CorrosionTypeService,
    DepartmentService,
    DetectionMethodService,
    StationService,
      DamageTypeService,
      CauseOfDamageService,
      FloorboardConditionService,
      RepairDocumentService,
      RepairDescriptionService,
ReasonForChangeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
