import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormControlsModule } from '../../common/components/form-controls.module';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { CurrentStatusSectionComponent } from './current-status-section.component';
import { Component } from "@angular/core";


describe('CurrentStatusSectionComponent', () => {
  let component: CurrentStatusSectionComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapper, CurrentStatusSectionComponent],
      imports: [FormControlsModule, FormsModule, ReactiveFormsModule, NKDatetimeModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = <CurrentStatusSectionComponent>fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'test-component-wrapper',
  template: '<app-current-status-section [parent]="form" [errorMessages]="displayMessage"></app-current-status-section>'
})
class TestComponentWrapper {
  form: FormGroup = new FormGroup({});
  displayMessage: { [key: string]: any }={};
}
