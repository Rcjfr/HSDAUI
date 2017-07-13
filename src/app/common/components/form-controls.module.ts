import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxContainerComponent } from './checkbox-container/checkbox-container.component';
import { RadioContainerComponent } from './radio-container/radio-container.component';
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
    CheckboxContainerComponent,
    RadioContainerComponent,
    CheckBoxListComponent
  ],
  declarations: [
    FieldContainerComponent,
    CheckboxContainerComponent,
    RadioContainerComponent,
    CheckBoxListComponent
  ],
  providers: []
})
export class FormControlsModule { }
