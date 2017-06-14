import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FormControlsModule } from '../../../common/directives/form/form-controls.module';
import { SearchByCorrosionComponent } from './search-by-corrosion.component';
import { CheckBoxListComponent } from '../../../common/directives/check-box-list/check-box-list.component';
import { AppStateService } from '../../../common/services';
import { MockAppStateService } from '../../../common/services/mocks/mock-app-state.service';
describe('SearchByCorrosionComponent', () => {
  let component: SearchByCorrosionComponent;
  let fixture: ComponentFixture<SearchByCorrosionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByCorrosionComponent, CheckBoxListComponent],
      imports: [FormsModule, FormControlsModule],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByCorrosionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
