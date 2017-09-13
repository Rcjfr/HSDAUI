import { SearchByCorrectiveActionComponent } from './search-by-corrective-action.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppStateService } from '../../../common/services';
import { MockAppStateService } from '../../../common/services/mocks/mock-app-state.service';
import { FormControlsModule } from '../../../common/components/form-controls.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('SearchByCorrectiveActionComponent', () => {
  let component: SearchByCorrectiveActionComponent;
  let fixture: ComponentFixture<SearchByCorrectiveActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByCorrectiveActionComponent],
      imports: [ReactiveFormsModule, FormControlsModule],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByCorrectiveActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});