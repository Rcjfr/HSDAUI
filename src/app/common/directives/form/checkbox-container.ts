﻿import {
  Component, Input, ElementRef, ViewChild, Renderer, OnInit, AfterContentInit, ContentChild
} from '@angular/core';

import {
  FormControlName
} from '@angular/forms';
let identifier = 0;
@Component({
  selector: 'aac-checkbox-container',
  template: `
<div class="customComponent">
  <div>
    <ng-content></ng-content>
    <label class="checkboxLabel" [attr.for]="identifier">
      <span class="control"></span>
    </label>
  </div>
</div>
<label [attr.for]="identifier">{{label}}</label>
  `
})
export class CheckboxContainer implements AfterContentInit  {
  public identifier = `form-checkbox-container-control-${identifier++}`;
  @Input() public label: string;
  @ViewChild('input') formInputElement: ElementRef;
  constructor(private _elRef: ElementRef, private _renderer: Renderer) { }
  ngAfterContentInit() {
    
    let chk = this._elRef.nativeElement.querySelector("input[type=checkbox]");
    if (!chk) {
      throw new Error("Invalid child control");
    }
    this._renderer.setElementAttribute(chk, 'id', this.identifier);
    
  }
}


