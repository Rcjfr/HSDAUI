﻿import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormCheckBoxComponent,
  //FormRadioComponent,
  FormSelectComponent,
  FormTextAreaComponent,
  FormTextComponent,
  FieldContainer,
  CheckboxContainer,
  RadioContainer

} from './index';
// import { CheckboxComponent } from './common/directives/checkbox/checkbox.component';
import { RadioButtonComponent } from './../radiobutton/radiobutton.component';
import { CheckBoxListComponent  } from '../check-box-list/check-box-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormCheckBoxComponent,
    FormSelectComponent,
    FormTextAreaComponent,
    // FormRadioComponent,
    FormTextComponent,
    RadioButtonComponent,
    FieldContainer,
    CheckboxContainer,
    CheckBoxListComponent
    CheckboxContainer,
    RadioContainer
  ],
  declarations: [
    FormCheckBoxComponent,
    FormSelectComponent,
    FormTextAreaComponent,
    // FormRadioComponent,
    FormTextComponent,
    RadioButtonComponent,
    FieldContainer,
    CheckboxContainer,
    CheckBoxListComponent
    CheckboxContainer,
    RadioContainer
  ],
  providers: []
})
export class FormControlsModule { }
