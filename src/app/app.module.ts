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
import { AppComponent } from './app.component';
import { NavBarComponent } from './common/directives/nav-bar/nav-bar.component';
import { HeaderComponent } from './common/directives/header/header.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AlertDetailComponent } from './alert-detail/alert-detail.component';
import { CheckboxComponent } from './common/directives/checkbox/checkbox.component';
import { ATACodesService } from './common/services/ata-codes.service';
import { AircraftService } from './common/services/aircraft.service';
import { StationService } from './common/services/station.service';
import { AlertEffects } from './common/effects/alerts.effects';
import { reducer } from './common/reducers/index';
import { CheckTypesService } from './common/services/check-types.service';
import { AlertDetailViewComponent } from './alert-detail-view/alert-detail-view.component';
import { GeneralSectionFormComponent } from './general-section-form/general-section-form.component';
import { AircraftInfoSectionFormComponent } from './aircraft-info-section-form/aircraft-info-section-form.component';
import { DefectLocationSectionFormComponent } from './defect-location-section-form/defect-location-section-form.component';
import { DefectDiscoveredDuringSectionFormComponent } from './defect-discovered-during-section-form/defect-discovered-during-section-form.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeaderComponent,
    AlertsComponent,
    AlertDetailComponent,
    CheckboxComponent,
    AlertDetailViewComponent,
    GeneralSectionFormComponent,
    AircraftInfoSectionFormComponent,
    DefectLocationSectionFormComponent,
    DefectDiscoveredDuringSectionFormComponent
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
