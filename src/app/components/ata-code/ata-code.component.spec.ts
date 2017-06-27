import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormControlsModule } from '../../common/components/form-controls.module';
import { AtaCodeComponent } from './ata-code.component';
import { FilterByPipe } from 'ng-pipes';
import { NgPipesModule } from 'ng-pipes';
import { Component } from "@angular/core";
describe('AtaCodeComponent', () => {
  let component: AtaCodeComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponentWrapper, AtaCodeComponent],
      imports: [FormControlsModule, FormsModule, ReactiveFormsModule, NgPipesModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = <AtaCodeComponent>fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  selector: 'test-component-wrapper',
  template: '<app-ata-code [parent]="form" [errorMessages]="displayMessage" [ATACodes]="ataCodes"></app-ata-code>'
})
class TestComponentWrapper {
  form: FormGroup = new FormGroup({});
  displayMessage: { [key: string]: any } = {};
  ataCodes=[];
}
