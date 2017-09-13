import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FormControlsModule } from '../../../common/components/form-controls.module';
import { SearchByStatusComponent } from './search-by-status.component';
import { AppStateService } from '../../../common/services';
import { MockAppStateService } from '../../../common/services/mocks/mock-app-state.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('SearcyByStatusComponent', () => {
  let component: SearchByStatusComponent;
  let fixture: ComponentFixture<SearchByStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByStatusComponent],
      imports: [ReactiveFormsModule, FormControlsModule],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});