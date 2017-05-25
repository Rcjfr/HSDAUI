import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormCheckBoxComponent,
        //FormRadioComponent,
        FormSelectComponent,
        FormTextComponent} from './index';
// import { CheckboxComponent } from './common/directives/checkbox/checkbox.component';
import { RadioButtonComponent } from './../radiobutton/radiobutton.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        FormCheckBoxComponent,
        FormSelectComponent,
        // FormRadioComponent,
        FormTextComponent,
        RadioButtonComponent
    ],
    declarations: [
        FormCheckBoxComponent,
        FormSelectComponent,
        // FormRadioComponent,
        FormTextComponent,
        RadioButtonComponent
    ],
    providers: [],
})
export class FormControlsModule { }
