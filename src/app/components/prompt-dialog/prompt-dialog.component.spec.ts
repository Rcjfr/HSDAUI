import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent, DialogService, BootstrapModalModule } from 'ng2-bootstrap-modal';
import { PromptDialogComponent } from './prompt-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ConfirmComponent', () => {
  let component: PromptDialogComponent;
  let fixture: ComponentFixture<PromptDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PromptDialogComponent],
      imports: [BootstrapModalModule.forRoot({ container: document.body }), ReactiveFormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
