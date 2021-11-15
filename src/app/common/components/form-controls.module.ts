import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxContainerComponent } from './checkbox-container/checkbox-container.component';
import { RadioContainerComponent } from './radio-container/radio-container.component';
import { CheckboxListComponent } from './checkbox-list/checkbox-list.component';
import { BooleanCheckboxListComponent } from './boolean-checkbox-list/boolean-checkbox-list.component';
import { FieldContainerComponent } from './field-container/field-container.component';
import { DTEFieldContainerComponent } from './dte-field-container/dte-field-container.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FieldContainerComponent,
    DTEFieldContainerComponent,
    CheckboxContainerComponent,
    RadioContainerComponent,
    CheckboxListComponent,
    BooleanCheckboxListComponent,
    LoadingComponent
  ],
  declarations: [
    FieldContainerComponent,
    DTEFieldContainerComponent,
    CheckboxContainerComponent,
    RadioContainerComponent,
    CheckboxListComponent,
    BooleanCheckboxListComponent,
    LoadingComponent
  ],
  providers: []
})
export class FormControlsModule { }
