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
import { AccordionModule, TypeaheadModule, TabsModule, ModalModule, AlertModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { TextMaskModule } from 'angular2-text-mask';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InputTextModule, ButtonModule, DataTableModule, DialogModule, DataGridModule } from 'primeng/primeng';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/components/app/app.component';
import { NavBarComponent } from '@app/common/components/nav-bar/nav-bar.component';
import { HeaderComponent } from '@app/common/components/header/header.component';
import { ConfirmComponent } from '@app/common/components/confirm/confirm.component';
import { AlertsComponent } from '@app/components/alerts/alerts.component';
import { AlertDetailComponent } from '@app/components/alert-detail/alert-detail.component';
import { SdaResolverService } from '@app/common/resolvers/sda-resolver.service';
import * as services from '@app/common/services';
import { PendingChangesGuard } from '@app/common/components/pending-changes.guard';
import { AlertEffects } from '@app/common/effects/alerts.effects';
import { UserEffects } from '@app/common/effects/user.effects';
import { LookupDataEffects } from '@app/common/effects/lookup-data.effects';
import { SavedSearchesEffects } from '@app/common/effects/saved-searches.effects';
import { reducer } from '@app/common/reducers';
import { AlertDetailViewComponent } from '@app/components/alert-detail-view/alert-detail-view.component';

import { FormControlsModule } from '@app/common/components/form-controls.module';
import { SdaFormModule } from '@app/components/sda/sda-form.module';
import { SdaSearchModule } from '@app/components/search/sda-search.module';

import { AlertsSearchComponent } from '@app/components/alerts-search/alerts-search.component';
import { AlertsGridComponent } from '@app/components/alerts-grid/alerts-grid.component';
import { PromptDialogComponent } from '@app/components/prompt-dialog/prompt-dialog.component';
import { AlertsDashboardComponent } from '@app/components/alerts-dashboard/alerts-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ConfirmComponent,
    PromptDialogComponent,
    HeaderComponent,
    AlertsComponent,
    AlertDetailComponent,
    AlertDetailViewComponent,
    AlertsSearchComponent,
    AlertsGridComponent,
    AlertsDashboardComponent
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
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot(),
    ScrollToModule.forRoot(),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),  //for debugging
    EffectsModule.run(AlertEffects),
    EffectsModule.run(LookupDataEffects),
    EffectsModule.run(UserEffects),
    EffectsModule.run(SavedSearchesEffects)
  ],
  providers: [
    services.AuthService,
    services.AuthGuardService,
    services.AircraftService,
    services.AppStateService,
    services.CheckTypesService,
    services.StationService,
    services.SdaService,
    services.SavedSearchService,
    services.SavedSearchStateService,
    services.UtilityService,
    services.LookupDataService,
    services.ChangeLog,
    PendingChangesGuard,
    SdaResolverService, {
      provide: HTTP_INTERCEPTORS,
      useClass: services.AuthInterceptorService,
      multi: true
    }
  ],
  entryComponents: [
    ConfirmComponent,
    PromptDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
