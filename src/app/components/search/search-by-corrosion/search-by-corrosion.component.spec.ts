import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FormControlsModule } from '../../../common/components/form-controls.module';
import { SearchByCorrosionComponent } from './search-by-corrosion.component';
import { AppStateService } from '../../../common/services';
import { MockAppStateService } from '../../../common/services/mocks/mock-app-state.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('SearchByCorrosionComponent', () => {
  let component: SearchByCorrosionComponent;
  let fixture: ComponentFixture<SearchByCorrosionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByCorrosionComponent],
      imports: [ReactiveFormsModule, FormControlsModule],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByCorrosionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
