import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import * as $ from 'jquery';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { TypeaheadModule } from 'ngx-bootstrap';
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
// import { CheckboxComponent } from './common/directives/checkbox/checkbox.component';
import { RadioButtonComponent } from './common/directives/radiobutton/radiobutton.component';
import { ATACodesService } from './common/services/ata-codes.service';
import { AircraftService } from './common/services/aircraft.service';
import { StationService } from './common/services/station.service';
import { AlertEffects } from './common/effects/alerts.effects';
import { reducer } from './common/reducers/index';
import { CheckTypesService } from './common/services/check-types.service';
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
import {FormCheckBoxComponent,
        // FormRadioComponent,
        FormSelectComponent,
        FormTextComponent } from './common/directives/form';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeaderComponent,
    AlertsComponent,
    AlertDetailComponent,
    // CheckboxComponent,
    RadioButtonComponent,
    AlertDetailViewComponent,
    GeneralSectionFormComponent,
    AircraftInfoSectionFormComponent,
    DefectLocationSectionFormComponent,
    DefectDiscoveredDuringSectionFormComponent,
    ScheduledMaintenanceSectionComponent,
    UnscheduledMaintenanceSectionComponent,
    AtaCodeComponent,
    FormCheckBoxComponent,
    //FormRadioComponent,
    FormSelectComponent,
    FormTextComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    NKDatetimeModule,
    TextMaskModule,
    TypeaheadModule.forRoot(),
    ToastModule.forRoot(),
    StoreModule.provideStore(reducer),
    EffectsModule.run(AlertEffects)
  ],
  providers: [ATACodesService, AircraftService, CheckTypesService, StationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
