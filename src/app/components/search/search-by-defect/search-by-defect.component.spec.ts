import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FormControlsModule } from '../../../common/components/form-controls.module';
import { SearchByDefectComponent } from './search-by-defect.component';
import { AppStateService } from '../../../common/services';
import { MockAppStateService } from '../../../common/services/mocks/mock-app-state.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('SearchByDefectComponent', () => {
  let component: SearchByDefectComponent;
  let fixture: ComponentFixture<SearchByDefectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByDefectComponent],
      imports: [FormsModule, ReactiveFormsModule, FormControlsModule],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByDefectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});