import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormControlsModule } from '../../common/directives/form/form-controls.module';
import { AlertsSearchComponent } from './alerts-search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('AlertsSearchComponent', () => {
  let component: AlertsSearchComponent;
  let fixture: ComponentFixture<AlertsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertsSearchComponent],
      imports: [FormControlsModule, FormsModule, ReactiveFormsModule, AccordionModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
