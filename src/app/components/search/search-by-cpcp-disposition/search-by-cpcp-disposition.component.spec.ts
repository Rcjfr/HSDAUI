import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControlsModule } from '../../../common/components/form-controls.module';
import { SearchByCpcpDispositionComponent } from './search-by-cpcp-disposition.component';
import { AppStateService } from '../../../common/services';
import { MockAppStateService } from '../../../common/services/mocks/mock-app-state.service';
describe('SearchByCpcpDispositionComponent', () => {
  let component: SearchByCpcpDispositionComponent;
  let fixture: ComponentFixture<SearchByCpcpDispositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByCpcpDispositionComponent],
      imports: [FormControlsModule],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByCpcpDispositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
