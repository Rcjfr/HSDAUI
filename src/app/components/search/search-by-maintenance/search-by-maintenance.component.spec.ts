import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FormControlsModule } from '../../../common/components/form-controls.module';
import { SearchByMaintenanceComponent } from './search-by-maintenance.component';
import { AppStateService } from '../../../common/services';
import { MockAppStateService } from '../../../common/services/mocks/mock-app-state.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('SearchByCorrosionComponent', () => {
  let component: SearchByMaintenanceComponent;
  let fixture: ComponentFixture<SearchByMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByMaintenanceComponent],
      imports: [ReactiveFormsModule, FormControlsModule],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
