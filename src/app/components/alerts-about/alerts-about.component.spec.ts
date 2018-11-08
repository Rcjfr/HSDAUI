import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsAboutComponent } from './alerts-about.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('AlertsAboutComponent', () => {
  let component: AlertsAboutComponent;
  let fixture: ComponentFixture<AlertsAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertsAboutComponent],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
