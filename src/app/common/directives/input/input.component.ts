import { Component, Input, forwardRef, ElementRef, Renderer } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
let identifier = 0;
@Component({
  selector: 'aac-input2',
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
  public identifier = `form-input-${identifier++}`;
  // tslint:disable-next-line:no-input-rename
  @Input('tabindex') tindex = '0';
  @Input() message: string;
  private data = '';
  private _required = false;
  @Input()
  set required(value: boolean) {
    this._required = true;
  }
  // the method set in registerOnChange to emit changes back to the form
  private changed = new Array<(value: string) => void>();
  private touched = new Array<() => void>();

  constructor(private _elRef: ElementRef, private _renderer: Renderer) { }
  ngOnInit() {
    this._renderer.setElementAttribute(this._elRef.nativeElement, 'tabindex', null);
    //this._renderer.setElementAttribute(this._elRef.nativeElement, 'id', null);

  }

  // this is the initial value set to the component
  public writeValue(obj: string) {
    if (obj) {
      this.data = obj;
    }
  }

  // registers 'fn' that will be fired wheb changes are made
  // this is how we emit the changes back to the form
  public registerOnChange(fn: any) {
    this.changed.push(fn);
  }
  public registerOnTouched(fn: any) {
    this.touched.push(fn);
  }
  // change events from the textarea
  private onChange(event) {
    this.data = event.target.value;
    // update the form
    this.changed.forEach(f => f(this.data));
  }
touch() {
    this.touched.forEach(f => f());
  }

}
