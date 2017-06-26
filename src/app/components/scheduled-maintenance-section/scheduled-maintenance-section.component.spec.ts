import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormControlsModule } from '../../common/components/form-controls.module';
import { ScheduledMaintenanceSectionComponent } from './scheduled-maintenance-section.component';
import { Component } from "@angular/core";
import { AppStateService } from '../../common/services';
import { MockAppStateService } from '../../common/services/mocks/mock-app-state.service';
describe('ScheduledMaintenanceSectionComponent', () => {
  let component: ScheduledMaintenanceSectionComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponentWrapper, ScheduledMaintenanceSectionComponent ],
      imports: [FormControlsModule, FormsModule, ReactiveFormsModule],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = <ScheduledMaintenanceSectionComponent>fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  selector: 'test-component-wrapper',
  template: '<app-scheduled-maintenance-section [parent]="form" [errorMessages]="displayMessage"></app-scheduled-maintenance-section>'
})
class TestComponentWrapper {
  form: FormGroup = new FormGroup({});
  displayMessage: { [key: string]: any } = {};
}
