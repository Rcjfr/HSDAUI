import {
  Component, Input, ElementRef, ViewChild, Renderer, OnInit, AfterContentInit, ContentChild
} from '@angular/core';

import {
  FormControlName
} from '@angular/forms';
let identifier = 0;
@Component({
  selector: 'aac-checkbox-container',
  templateUrl: './checkbox-container.component.html',
  styleUrls: ['./checkbox-container.component.less']
})
export class CheckboxContainer implements AfterContentInit  {
  public identifier = `form-checkbox-container-control-${identifier++}`;
  @Input() public label: string;
  @ViewChild('input') formInputElement: ElementRef;
  constructor(private _elRef: ElementRef, private _renderer: Renderer) { }
  ngAfterContentInit() {

    let chk = this._elRef.nativeElement.querySelector('input[type=checkbox]');
    if (!chk) {
      throw new Error('Invalid child control');
    }
    this._renderer.setElementAttribute(chk, 'id', this.identifier);

  }
}