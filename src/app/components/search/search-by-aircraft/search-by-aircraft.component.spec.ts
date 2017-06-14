import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FormControlsModule } from '../../../common/directives/form/form-controls.module';
import { SearchByAircraftComponent } from './search-by-aircraft.component';

describe('SearchByAircraftComponent', () => {
  let component: SearchByAircraftComponent;
  let fixture: ComponentFixture<SearchByAircraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByAircraftComponent ],
imports:[FormsModule,FormControlsModule]
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
