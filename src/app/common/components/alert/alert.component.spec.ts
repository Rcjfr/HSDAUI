import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent, DialogService, BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent ],
      imports: [
        BootstrapModalModule.forRoot({container: document.body})],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
