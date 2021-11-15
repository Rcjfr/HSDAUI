import {
  Component, Input, ElementRef, ViewChild, Renderer, OnInit
} from '@angular/core';

import {
  FormControlName
} from '@angular/forms';
let identifier = 0;
@Component({
  selector: 'dte-field-container',
  templateUrl: './dte-field-container.component.html',
  styleUrls: ['./dte-field-container.component.less'],
})
export class DTEFieldContainerComponent implements OnInit {
  public identifier = `form-container-control-${identifier++}`;
  @Input() public label: string;
  @Input() helptext = '';
  @Input() public message: string;
  @Input() labelGridColumnWidth = 2;
  @Input() fieldGridColumnWidth = 8;
  @Input() for = '';
  get dtelabelCssClass() {
    return `col-sm-${this.labelGridColumnWidth} control-label`;
  }
  get dtefieldCssClass() {
    return `col-sm-${this.fieldGridColumnWidth}`; //`col-sm-${12 - this.labelGridColumnWidth}`;
  }
  private _required = false;
  @Input('required')
  set required(req: any) {
    this._required = (req === '') ? true : req;
  }
  get required() {
    return this._required;
  }
  @ViewChild(FormControlName, { read: ElementRef }) formInputElement: ElementRef;
  constructor(private _elRef: ElementRef, private _renderer: Renderer) { }
  ngOnInit() {
    const fld = this._elRef.nativeElement.querySelector('input,textarea,select');
    if (fld != null) {
      this._renderer.setElementAttribute(fld, 'id', this.identifier);
      this._renderer.setElementClass(fld, 'form-control', true);
    }
  }
}

