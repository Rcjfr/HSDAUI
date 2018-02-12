import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsModule } from 'ngx-bootstrap';
import { SearchByPartComponent } from './search-by-part.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormControlsModule } from '@app/common/components/form-controls.module';

describe('SearchByPartComponent', () => {
  let component: SearchByPartComponent;
  let fixture: ComponentFixture<SearchByPartComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByPartComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        FormControlsModule,
        TabsModule.forRoot()
      ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByPartComponent);
    component = fixture.componentInstance;
    component.criteria = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
