import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { CurrentStatusSectionComponent } from './current-status-section.component';
import { Component } from '@angular/core';


describe('CurrentStatusSectionComponent', () => {
  let component: CurrentStatusSectionComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapperComponent, CurrentStatusSectionComponent],
      imports: [FormControlsModule, FormsModule, ReactiveFormsModule, NKDatetimeModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapperComponent);
    component = <CurrentStatusSectionComponent>fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'test-component-wrapper',
  template: '<aa-current-status-section [parent]="form" [errorMessages]="displayMessage"></aa-current-status-section>'
})
class TestComponentWrapperComponent {
  form: FormGroup = new FormGroup({});
  displayMessage: { [key: string]: any }= {};
}
