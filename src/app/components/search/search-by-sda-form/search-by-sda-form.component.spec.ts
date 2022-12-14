
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeaheadModule, TabsModule } from 'ngx-bootstrap';
import { SearchBySdaFormComponent } from './search-by-sda-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppStateService, UtilityService } from '@app/common/services';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { MockAppStateService } from 'app/common/services/mocks/mock-app-state.service';
import { NgPipesModule } from 'ng-pipes';

describe('SearchBySdaFormComponent', () => {
  let component: SearchBySdaFormComponent;
  let fixture: ComponentFixture<SearchBySdaFormComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBySdaFormComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        FormControlsModule,
        TabsModule.forRoot(),
        TypeaheadModule.forRoot(),
        NgPipesModule
      ],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBySdaFormComponent);
    component = fixture.componentInstance;
    component.criteria = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
