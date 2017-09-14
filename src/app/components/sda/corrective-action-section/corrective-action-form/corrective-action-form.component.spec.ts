import { CorrectiveActionFormGroupComponent } from './corrective-action-form.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppStateService } from '../../../../common/services';
import { MockAppStateService } from '../../../../common/services/mocks/mock-app-state.service';
import { FormControlsModule } from '../../../../common/components/form-controls.module';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { SdaFormModule } from 'app/components/sda/sda-form.module';
import * as models from '../../../../common/models';


describe('SearchByCorrectiveActionComponent', () => {
  let component: CorrectiveActionFormGroupComponent;
  let fixture: ComponentFixture<CorrectiveActionFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormControlsModule, SdaFormModule ],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectiveActionFormGroupComponent);
    component = fixture.componentInstance;

    //Inputs
    component.parent = new FormGroup({});
    component.sda = {};
    component.newSdaStus = models.Status.Open;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});