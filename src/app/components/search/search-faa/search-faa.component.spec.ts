import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsModule } from 'ngx-bootstrap';
import { SearchFaaComponent } from './search-faa.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { MockAuthService } from '@app/common/services/mocks/mock-auth-service';
import { AuthService } from '@app/common/services';


describe('SearchFaaComponent', () => {
  let component: SearchFaaComponent;
  let fixture: ComponentFixture<SearchFaaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchFaaComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        FormControlsModule,
        TabsModule.forRoot()
      ],
      providers: [{provide: AuthService, useClass: MockAuthService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
