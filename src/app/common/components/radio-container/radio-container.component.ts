import {
  Component, Input, ElementRef, ViewChild, Renderer, OnInit, AfterContentInit, ContentChild
} from '@angular/core';

import {
  FormControlName
} from '@angular/forms';
let identifier = 0;
@Component({
  selector: 'aac-radio-container',
  templateUrl: './radio-container.component.html',
  styleUrls: ['./radio-container.component.less']
})
export class RadioContainer implements AfterContentInit  {
  public identifier = `form-radio-container-control-${identifier++}`;
  @Input() public label: string;
  @ViewChild('input') formInputElement: ElementRef;
  constructor(private _elRef: ElementRef, private _renderer: Renderer) { }
  ngAfterContentInit() {
    
    let radio = this._elRef.nativeElement.querySelector("input[type=radio]");
    if (!radio) {
      throw new Error("Invalid child control");
    }
    this._renderer.setElementAttribute(radio, 'id', this.identifier);
    
  }
}


