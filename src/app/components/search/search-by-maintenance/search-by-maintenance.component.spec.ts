import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsModule } from 'ngx-bootstrap';
import { SearchByMaintenanceComponent } from './search-by-maintenance.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppStateService, UtilityService } from '@app/common/services';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { MockUtilityService } from '@app/common/services/mocks/mock-utility-service';

describe('SearchByMaintenanceComponent', () => {
  let component: SearchByMaintenanceComponent;
  let fixture: ComponentFixture<SearchByMaintenanceComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByMaintenanceComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        FormControlsModule,
        TabsModule.forRoot()
      ],
      providers: [  { provide: UtilityService, useClass: MockUtilityService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByMaintenanceComponent);
    component = fixture.componentInstance;
    component.criteria = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
