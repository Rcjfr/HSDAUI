import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormControlsModule } from '@app/common/components/form-controls.module';
import { AtaCodeComponent } from './ata-code.component';
import { FilterByPipe } from 'ng-pipes';
import { NgPipesModule } from 'ng-pipes';
import { Component } from '@angular/core';
describe('AtaCodeComponent', () => {
  let component: AtaCodeComponent;
  let fixture: ComponentFixture<TestComponentWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapperComponent, AtaCodeComponent],
      imports: [FormControlsModule, FormsModule, ReactiveFormsModule, NgPipesModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapperComponent);
    component = <AtaCodeComponent>fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'test-component-wrapper',
  template: '<aa-ata-code [parent]="form" [errorMessages]="displayMessage" [ATACodes]="ataCodes"></aa-ata-code>'
})
class TestComponentWrapperComponent {
  form: FormGroup = new FormGroup({});
  displayMessage: { [key: string]: any } = {};
  ataCodes= [];
}
