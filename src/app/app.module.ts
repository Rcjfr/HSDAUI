import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgPipesModule } from 'ng-pipes';
import * as $ from 'jquery';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { AccordionModule, TypeaheadModule } from 'ngx-bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { TextMaskModule } from 'angular2-text-mask';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { NavBarComponent } from './common/directives/nav-bar/nav-bar.component';
import { HeaderComponent } from './common/directives/header/header.component';
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
  StationService
} from './common/services/index';
import { AlertEffects } from './common/effects/alerts.effects';
import { LookupDataEffects } from './common/effects/lookup-data.effects';
import { reducer } from './common/reducers/index';
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
import { FormControlsModule } from './common/directives/form/form-controls.module';
import { PreciseLocationGroupComponent } from './components/precise-location-group/precise-location-group.component';
import { CpcpSectionComponent } from './components/cpcp-section/cpcp-section.component';
import { AlertsSearchComponent } from './components/alerts-search/alerts-search.component';
import { SearchByDateRangeComponent } from './components/search/search-by-date-range/search-by-date-range.component';
import { SearchBySdaFormComponent } from './components/search/search-by-sda-form/search-by-sda-form.component';
import { SearchByAircraftComponent } from './components/search/search-by-aircraft/search-by-aircraft.component';
import { SearchByCorrosionComponent } from './components/search/search-by-corrosion/search-by-corrosion.component';

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
    AlertsSearchComponent,
    SearchByDateRangeComponent,
    SearchBySdaFormComponent,
    SearchByAircraftComponent,
    SearchByCorrosionComponent
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
    StationService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
