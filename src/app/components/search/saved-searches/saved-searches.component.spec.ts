import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsModule } from 'ngx-bootstrap';
import { SavedSearchesComponent } from './saved-searches.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppStateService, SavedSearchStateService, AuthService } from 'app/common/services';
import { MockAppStateService } from 'app/common/services/mocks/mock-app-state.service';
import { FormControlsModule } from 'app/common/components/form-controls.module';
import { MockSavedSearchStateService } from 'app/common/services/mocks/mock-saved-search-state.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { MockAuthService } from 'app/common/services/mocks/mock-auth-service';

describe('SavedSearchesComponent', () => {
  let component: SavedSearchesComponent;
  let fixture: ComponentFixture<SavedSearchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedSearchesComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        FormControlsModule,
        TabsModule.forRoot()
      ],
      providers: [{ provide: AppStateService, useClass: MockAppStateService },
        { provide: SavedSearchStateService, useClass: MockSavedSearchStateService },
        { provide: DialogService, useClass: MockAuthService },
        { provide: AuthService, useClass: MockAuthService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedSearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
