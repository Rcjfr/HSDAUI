import {
  Component, Input
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { ElementBase } from './element-base';
let identifier = 0;

@Component({
  selector: 'aac-textarea',
  template: `
    <div class="row form-group" [class.has-error]="message">
      <label class="{{labelCssClass}}" [attr.for]="identifier">{{label}} <span class="req" *ngIf="_required">*</span></label>
      <div class="{{fieldCssClass}}">
        <textarea [attr.tabindex]='tindex'
                  [attr.rows]='rows'
                  [attr.cols]='cols'
                  class="form-control"
                  [disabled]="disabled"
                  (blur)="touch()"
                  [(ngModel)]="value"
                  [attr.id]="identifier">
              </textarea>
        <span *ngIf="helptext" class="help-block">{{helptext}}</span>
        <span *ngIf="message" class="help-block">{{message}}</span>
      </div>

    </div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FormTextAreaComponent,
    multi: true,
  }],
})
export class FormTextAreaComponent extends ElementBase<string> {
  public identifier = `form-textarea-${identifier++}`;
  @Input() rows = '5';
  @Input() cols = '40';
}


