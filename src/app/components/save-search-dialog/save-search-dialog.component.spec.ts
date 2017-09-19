import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent, DialogService, BootstrapModalModule } from 'ng2-bootstrap-modal';
import { SaveSearchDialogComponent } from './save-search-dialog.component';

describe('ConfirmComponent', () => {
  let component: SaveSearchDialogComponent;
  let fixture: ComponentFixture<SaveSearchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveSearchDialogComponent ],
      imports: [
        BootstrapModalModule.forRoot({container: document.body})],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
