import {NgModel} from '@angular/forms';

import {Observable} from 'rxjs/Observable';

import {ValueAccessorBase} from './value-accessor-base';
import { Input, ElementRef, Renderer, Component } from '@angular/core';
@Component({})
export abstract class ElementBase<T> extends ValueAccessorBase<T> {
// tslint:disable-next-line:no-input-rename
@Input('tabindex') tindex = '0';
@Input() public label: string;
@Input() public message: string;
protected _required = false;
  @Input()
  set required(value: boolean) {
    this._required = true;
  }
  constructor(private _elRef: ElementRef, private _renderer: Renderer
  ) {
    super();
  }
  ngOnInit() {
    this._renderer.setElementAttribute(this._elRef.nativeElement, 'tabindex', null);
    this._renderer.setElementAttribute(this._elRef.nativeElement, 'id', null);

  }
}
