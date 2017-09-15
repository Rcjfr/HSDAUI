import { CorrectiveActionRepairDescriptionComponent } from './corrective-action-repair-description.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppStateService } from '../../../../common/services';
import { MockAppStateService } from '../../../../common/services/mocks/mock-app-state.service';
import { FormControlsModule } from '../../../../common/components/form-controls.module';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { SdaFormModule } from 'app/components/sda/sda-form.module';
import * as models from '../../../../common/models';


describe('SearchByCorrectiveActionComponent', () => {
  let component: CorrectiveActionRepairDescriptionComponent;
  let fixture: ComponentFixture<CorrectiveActionRepairDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormControlsModule, SdaFormModule ],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectiveActionRepairDescriptionComponent);
    component = fixture.componentInstance;

    //Inputs
    component.parent = new FormGroup({});
    component.sda = {};
    component.newSdaStus = models.Status.Open;

    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});