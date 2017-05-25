import { Component, Input, forwardRef, ElementRef, Renderer } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'aac-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true
    }
  ]
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input('id') checkbox_id = '';
  @Input('tabindex') tindex = "0";
  @Input('value') _value = "";
  @Input() message: string;

  private _required = false;
  @Input()
  set required(value: boolean) {
    this._required = true;
  }

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
onInputChange(value: string) {
  this.writeValue(value);
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
