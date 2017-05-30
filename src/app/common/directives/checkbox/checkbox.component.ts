import { Component, Input, forwardRef, ElementRef, Renderer } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'aac-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input('id') checkbox_id = '';
  @Input('tabindex') tindex = "0";
  @Input('value') _value = false;
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
onSelectionChange(checked: boolean) {
  this.writeValue(checked);
}
  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value) {
      this.value = value;
  }

}
