import { Component, Input, forwardRef, ElementRef, Renderer } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
let identifier = 0;
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
  public identifier = `form-radio-${identifier++}`;
  @Input('id') radio_id = '';
  @Input('name') radio_group_name = '';
  @Input('tabindex') tindex = "0";
  @Input('value') _value = null;
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
  constructor(private _elRef: ElementRef, private _renderer: Renderer) { }
  ngOnInit() {
    this._renderer.setElementAttribute(this._elRef.nativeElement, 'tabindex', null);
    this._renderer.setElementAttribute(this._elRef.nativeElement, 'id', null);

  }
onSelectionChange() {
  this.writeValue(this._value);
}
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
