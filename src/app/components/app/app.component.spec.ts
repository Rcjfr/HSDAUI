import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavBarComponent } from '../../common/components/nav-bar/nav-bar.component';
import { HeaderComponent } from '../../common/components/header/header.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormControlsModule } from '../../common/components/form-controls.module';
import { APP_BASE_HREF } from '@angular/common';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { TypeaheadModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AlertsSearchComponent } from '../alerts-search/alerts-search.component';
import { AlertsComponent } from '../alerts/alerts.component';
import { AlertDetailComponent } from '../alert-detail/alert-detail.component';
import { AppStateService } from '../../common/services';
import { MockAppStateService } from '../../common/services/mocks/mock-app-state.service';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NKDatetimeModule,
        TypeaheadModule.forRoot(),
        AccordionModule.forRoot()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [
        AppComponent,
        HeaderComponent,
        NavBarComponent,
        AlertsSearchComponent,
        AlertsComponent,
        AlertDetailComponent

      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: AppStateService, useClass: MockAppStateService }]
    }).compileComponents();
  }));

  xit('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  xit(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  xit('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});
