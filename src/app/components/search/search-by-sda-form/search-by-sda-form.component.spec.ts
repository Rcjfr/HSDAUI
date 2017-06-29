import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBySdaFormComponent } from './search-by-sda-form.component';
import { AppStateService } from '../../../common/services';
import { MockAppStateService } from '../../../common/services/mocks/mock-app-state.service';
import { FormsModule} from '@angular/forms';
import { FilterByPipe } from 'ng-pipes';
import { TypeaheadModule } from 'ngx-bootstrap';
import { NgPipesModule } from 'ng-pipes';
import { FormControlsModule } from '../../../common/components/form-controls.module';
describe('SearchBySdaFormComponent', () => {
  let component: SearchBySdaFormComponent;
  let fixture: ComponentFixture<SearchBySdaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBySdaFormComponent],
      imports: [NgPipesModule, TypeaheadModule.forRoot(), FormsModule, FormControlsModule],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBySdaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
