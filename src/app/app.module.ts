﻿import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgPipesModule } from 'ng-pipes';
import { DataTablesModule } from 'angular-datatables';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FileUploadModule } from 'ng2-file-upload';
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
import { ConfirmComponent } from './common/components/confirm/confirm.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AlertDetailComponent } from './components/alert-detail/alert-detail.component';
import { SdaResolverService } from './common/resolvers/sda-resolver.service';
import * as services from './common/services';
import { PendingChangesGuard } from './common/components/pending-changes.guard';
import { AlertEffects } from './common/effects/alerts.effects';
import { LookupDataEffects } from './common/effects/lookup-data.effects';
import { reducer } from './common/reducers';
import { AlertDetailViewComponent } from './components/alert-detail-view/alert-detail-view.component';

import { FormControlsModule } from './common/components/form-controls.module';
import { SdaFormModule } from './components/sda/sda-form.module';
import { SdaSearchModule } from './components/search/sda-search.module';

import { AlertsSearchComponent } from './components/alerts-search/alerts-search.component';
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

    AlertsGridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FormControlsModule,
    SdaFormModule,
    SdaSearchModule,
    HttpModule,
    DataTablesModule,
    FileUploadModule,
    AppRoutingModule,
    NKDatetimeModule,
    BootstrapModalModule,
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
    SdaResolverService
  ],
  entryComponents: [
    ConfirmComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
