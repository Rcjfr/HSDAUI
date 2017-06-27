/// <reference path="../cause-of-damage-group/cause-of-damage-group.component.ts" />
/// <reference path="../cause-of-damage-description/cause-of-damage-description.component.ts" />
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormControlsModule } from '../../common/components/form-controls.module';
import { Component } from "@angular/core";
import { CpcpSectionComponent } from './cpcp-section.component';
import { CauseOfDamageGroupComponent } from '../cause-of-damage-group/cause-of-damage-group.component';
import { CauseOfDamageDescriptionComponent } from '../cause-of-damage-description/cause-of-damage-description.component';
import { AppStateService } from '../../common/services';
import { MockAppStateService } from '../../common/services/mocks/mock-app-state.service';
describe('CpcpSectionComponent', () => {
  let component: CpcpSectionComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapper, CpcpSectionComponent, CauseOfDamageGroupComponent, CauseOfDamageDescriptionComponent],
      imports: [FormControlsModule, FormsModule, ReactiveFormsModule],
      providers: [{ provide: AppStateService, useClass: MockAppStateService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = <CpcpSectionComponent>fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  selector: 'test-component-wrapper',
  template: '<app-cpcp-section-form [parent]="form" [errorMessages]="displayMessage"></app-cpcp-section-form>'
})
class TestComponentWrapper {
  form: FormGroup = new FormGroup({});
  displayMessage: { [key: string]: any } = {};
}