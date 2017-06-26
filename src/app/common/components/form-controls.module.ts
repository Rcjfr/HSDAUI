import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxContainer } from './checkbox-container/checkbox-container.component';
import { RadioContainer } from './radio-container/radio-container.component';
import { CheckBoxListComponent } from './check-box-list/check-box-list.component';
import { FieldContainerComponent } from './field-container/field-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FieldContainerComponent,
    CheckboxContainer,
    RadioContainer,
    CheckBoxListComponent
  ],
  declarations: [
    FieldContainerComponent,
    CheckboxContainer,
    RadioContainer,
    CheckBoxListComponent
  ],
  providers: []
})
export class FormControlsModule { }
