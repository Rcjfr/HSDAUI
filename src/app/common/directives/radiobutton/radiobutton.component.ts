import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'aac-radio',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true
    }
  ]
})
export class RadioButtonComponent implements ControlValueAccessor {
  @Input() label = '';
   @Input() id = 'aaRadioButton';
   @Input() tabindex = '';
  @Input('value') _value = '';
  onChange: any = () => { };
  onTouched: any = () => { };
  get value() {
    return this._value;
  }
set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }
  constructor() { }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

}
