import {
  Component, Input, ElementRef, ViewChild, Renderer, OnInit
} from '@angular/core';

import {
  FormControlName
} from '@angular/forms';
let identifier = 0;
@Component({
  selector: 'aac-field-container',
  template: `
    <div class="row form-group" [class.has-error]="message">
      <label class="{{labelCssClass}}" [attr.for]="for || identifier">{{label}} <span class="req" *ngIf="required">*</span></label>
      <div class="{{fieldCssClass}}">
        <ng-content></ng-content>
        <span *ngIf="helptext" class="help-block">{{helptext}}</span>
        <span *ngIf="message" class="help-block">{{message}}</span>
      </div>

    </div>
  `
})
export class FieldContainer implements OnInit {
  public identifier = `form-container-control-${identifier++}`;
  @Input() public label: string;
  @Input() helptext = '';
  @Input() public message: string;
  @Input() labelGridColumnWidth = 4;
  @Input() fieldGridColumnWidth = 8;
  @Input() for='';
  get labelCssClass() {
    return `col-sm-${this.labelGridColumnWidth} control-label`;
  }
  get fieldCssClass() {
    return `col-sm-${this.fieldGridColumnWidth}`; //`col-sm-${12 - this.labelGridColumnWidth}`;
  }
  private _required = false;
  @Input('required')
  set required(req:any) {
    this._required = (req === '') ? true : req;
  }
  get required() {
    return this._required;
  }
  @ViewChild(FormControlName, { read: ElementRef }) formInputElement: ElementRef;
  constructor(private _elRef: ElementRef, private _renderer: Renderer) { }
  ngOnInit() {
    let fld = this._elRef.nativeElement.querySelector("input,textarea,select");
    this._renderer.setElementAttribute(fld, 'id', this.identifier);
    this._renderer.setElementClass(fld, "form-control", true);


  }
}


