import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsModule } from 'ngx-bootstrap';
import { SearchByCpcpDispositionComponent } from './search-by-cpcp-disposition.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppStateService, UtilityService } from '@app/common/services';
import { MockAppStateService } from '@app/common/services/mocks/mock-app-state.service';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { MockSavedSearchStateService } from '@app/common/services/mocks/mock-saved-search-state.service';
import { MockUtilityService } from '@app/common/services/mocks/mock-utility-service';

describe('SearchByCpcpDispositionComponent', () => {
  let component: SearchByCpcpDispositionComponent;
  let fixture: ComponentFixture<SearchByCpcpDispositionComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByCpcpDispositionComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        FormControlsModule,
        TabsModule.forRoot()
      ],
      providers: [{ provide: AppStateService, useClass: MockAppStateService },
        { provide: UtilityService, useClass: MockUtilityService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByCpcpDispositionComponent);
    component = fixture.componentInstance;
    component.criteria = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
