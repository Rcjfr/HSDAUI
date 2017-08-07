import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxContainerComponent } from './checkbox-container/checkbox-container.component';
import { RadioContainerComponent } from './radio-container/radio-container.component';
import { CheckBoxListComponent } from './check-box-list/check-box-list.component';
import { FieldContainerComponent } from './field-container/field-container.component';
import { LoadingComponent } from './loading/loading.component';

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
    CheckBoxListComponent,
    LoadingComponent
  ],
  declarations: [
    FieldContainerComponent,
    CheckboxContainerComponent,
    RadioContainerComponent,
    CheckBoxListComponent,
    LoadingComponent
  ],
  providers: []
})
export class FormControlsModule { }
