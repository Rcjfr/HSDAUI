import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { Component } from '@angular/core';
import { CpcpSectionComponent } from './cpcp-section.component';
import { CauseOfDamageGroupComponent } from '@app/components/sda/cpcp-section/cause-of-damage-group/cause-of-damage-group.component';
import { CauseOfDamageDescriptionComponent } from '@app/components/sda/cpcp-section/cause-of-damage-description/cause-of-damage-description.component';
import { AppStateService } from '@app/common/services';
import { MockAppStateService } from '@app/common/services/mocks/mock-app-state.service';
describe('CpcpSectionComponent', () => {
  let component: CpcpSectionComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapperComponent, CpcpSectionComponent, CauseOfDamageGroupComponent, CauseOfDamageDescriptionComponent],
      imports: [FormControlsModule, FormsModule, ReactiveFormsModule],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapperComponent);
    component = <CpcpSectionComponent>fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  selector: 'test-component-wrapper',
  template: '<aa-cpcp-section-form [parent]="form" [errorMessages]="displayMessage"></aa-cpcp-section-form>'
})
class TestComponentWrapperComponent {
  form: FormGroup = new FormGroup({});
  displayMessage: { [key: string]: any } = {};
}
