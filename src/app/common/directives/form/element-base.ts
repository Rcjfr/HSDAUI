import { NgModel, ControlValueAccessor } from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import { Input, ElementRef, Renderer, Component } from '@angular/core';
@Component({})
// tslint:disable-next-line:component-class-suffix
export abstract class ElementBase<T> implements ControlValueAccessor {
  private innerValue: T;
  public disabled = false;
  private changed = new Array<(value: T) => void>();
  private touched = new Array<() => void>();
  @Input() labelGridColumnWidth = 4;
  @Input() fieldGridColumnWidth = 8;
// tslint:disable-next-line:no-input-rename
@Input('tabindex') tindex = '0';
@Input() public label: string;
@Input() helptext = '';
@Input() public message: string;
protected _required = false;
  @Input()
  set required(value: boolean) {
    this._required = true;
  }
  get labelCssClass(){
    return `col-sm-${this.labelGridColumnWidth} control-label`;
  }
  get fieldCssClass(){
      return `col-sm-${this.fieldGridColumnWidth}`; //`col-sm-${12 - this.labelGridColumnWidth}`;
  }
  constructor(private _elRef: ElementRef, private _renderer: Renderer) { }
  ngOnInit() {
    this._renderer.setElementAttribute(this._elRef.nativeElement, 'tabindex', null);
    this._renderer.setElementAttribute(this._elRef.nativeElement, 'id', null);

  }


  get value(): T {
    return this.innerValue;
  }

  set value(value: T) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach(f => f(value));
    }
  }

  writeValue(value: T) {
    this.value = value;
  }

  registerOnChange(fn: (value: T) => void) {
    this.changed.push(fn);
  }

  registerOnTouched(fn: () => void) {
    this.touched.push(fn);
  }

  touch() {
    this.touched.forEach(f => f());
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    // disable other components here
  }
}
