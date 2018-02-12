import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsModule } from 'ngx-bootstrap';
import { SearchByAircraftComponent } from './search-by-aircraft.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppStateService, UtilityService } from '@app/common/services';
import { MockAppStateService } from '@app/common/services/mocks/mock-app-state.service';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { MockSavedSearchStateService } from '@app/common/services/mocks/mock-saved-search-state.service';
import { MockUtilityService } from '@app/common/services/mocks/mock-utility-service';

describe('SearchByAircraftComponent', () => {
  let component: SearchByAircraftComponent;
  let fixture: ComponentFixture<SearchByAircraftComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByAircraftComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        FormControlsModule,
        TabsModule.forRoot()
      ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByAircraftComponent);
    component = fixture.componentInstance;
    component.criteria = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
