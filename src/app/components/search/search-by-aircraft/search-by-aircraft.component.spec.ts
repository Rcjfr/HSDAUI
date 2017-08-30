import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControlsModule } from '../../../common/components/form-controls.module';
import { SearchByAircraftComponent } from './search-by-aircraft.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SearchByAircraftComponent', () => {
  let component: SearchByAircraftComponent;
  let fixture: ComponentFixture<SearchByAircraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByAircraftComponent ],
      imports: [ReactiveFormsModule, FormControlsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByAircraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
