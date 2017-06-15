import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AircraftInfoSectionFormComponent } from './aircraft-info-section-form.component';

describe('AircraftInfoSectionFormComponent', () => {
  let component: AircraftInfoSectionFormComponent;
  let fixture: ComponentFixture<AircraftInfoSectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AircraftInfoSectionFormComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        ReactiveFormsModule, FormsModule,
        HttpModule,
        //TypeaheadModule.forRoot(),
        //ToastModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftInfoSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
