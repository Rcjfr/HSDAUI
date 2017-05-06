import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import * as $ from 'jquery';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { TypeaheadModule } from 'ngx-bootstrap';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
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
import { AlertEffects } from './common/effects/alerts.effects';
import { reducer } from './common/reducers/index';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeaderComponent,
    AlertsComponent,
    AlertDetailComponent,
    CheckboxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NKDatetimeModule,
    TypeaheadModule.forRoot(),
    ToastModule.forRoot(),
    StoreModule.provideStore(reducer),
    EffectsModule.run(AlertEffects)
  ],
  providers: [ATACodesService, AircraftService],
  bootstrap: [AppComponent]
})
export class AppModule { }
