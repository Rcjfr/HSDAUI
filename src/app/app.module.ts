import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgPipesModule } from 'ng-pipes';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FileUploadModule } from 'ng2-file-upload';
import { ScrollToModule } from 'ng2-scroll-to-el';
import * as $ from 'jquery';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { AccordionModule, TypeaheadModule, TabsModule, ModalModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { TextMaskModule } from 'angular2-text-mask';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InputTextModule, ButtonModule, DataTableModule, DialogModule, DataGridModule } from 'primeng/primeng';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { NavBarComponent } from './common/components/nav-bar/nav-bar.component';
import { HeaderComponent } from './common/components/header/header.component';
import { ConfirmComponent } from './common/components/confirm/confirm.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AlertDetailComponent } from './components/alert-detail/alert-detail.component';
import { SdaResolverService } from './common/resolvers/sda-resolver.service';
import * as services from './common/services';
import { PendingChangesGuard } from './common/components/pending-changes.guard';
import { AlertEffects } from './common/effects/alerts.effects';
import { UserEffects } from './common/effects/user.effects';
import { LookupDataEffects } from './common/effects/lookup-data.effects';
import { reducer } from './common/reducers';
import { AlertDetailViewComponent } from './components/alert-detail-view/alert-detail-view.component';

import { FormControlsModule } from './common/components/form-controls.module';
import { SdaFormModule } from './components/sda/sda-form.module';
import { SdaSearchModule } from './components/search/sda-search.module';

import { AlertsSearchComponent } from './components/alerts-search/alerts-search.component';
import { AlertsSaveSearchesComponent } from './components/alerts-save-searches/alerts-save-searches.component';
import { AlertsGridComponent } from './components/alerts-grid/alerts-grid.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ConfirmComponent,
    HeaderComponent,
    AlertsComponent,
    AlertDetailComponent,
    AlertDetailViewComponent,
    AlertsSearchComponent,
    AlertsSaveSearchesComponent,
    AlertsGridComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FormControlsModule,
    SdaFormModule,
    SdaSearchModule,
    HttpModule,
    HttpClientModule,
    FileUploadModule,
    AppRoutingModule,
    NKDatetimeModule,
    BootstrapModalModule,
    TextMaskModule,
    NgPipesModule,

    //PrimeNG
    InputTextModule,
    ButtonModule,
    DataTableModule,
    DialogModule,
    DataGridModule,

    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot(),
    ScrollToModule.forRoot(),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),  //for debugging
    EffectsModule.run(AlertEffects),
    EffectsModule.run(LookupDataEffects),
    EffectsModule.run(UserEffects)
  ],
  providers: [
    services.AuthService,
    services.AuthGuardService,
    services.AircraftService,
    services.AlertCodeService,
    services.AppStateService,
    services.ATACodesService,
    services.CheckTypesService,
    services.CorrosionLevelService,
    services.CorrosionTypeService,
    services.DepartmentService,
    services.DetectionMethodService,
    services.StationService,
    services.DamageTypeService,
    services.CauseOfDamageService,
    services.FloorboardConditionService,
    services.RepairDocumentService,
    services.RepairDescriptionService,
    services.ReasonForChangeService,
    services.DteStatusService,
    services.RepairInspectionStatusService,
    services.SdaService,
    PendingChangesGuard,
    SdaResolverService, {
      provide: HTTP_INTERCEPTORS,
      useClass: services.AuthInterceptorService,
      multi: true
    }
  ],
  entryComponents: [
    ConfirmComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
