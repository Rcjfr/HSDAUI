import {
  Component, Input
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { ElementBase } from './element-base';
let identifier = 0;

@Component({
  selector: 'aac-input',
  template: `
    <div class="row form-group" [class.has-error]="message">
      <label class="{{labelCssClass}}" [attr.for]="identifier">{{label}}<span class="req" *ngIf="_required">*</span></label>
      <div class="{{fieldCssClass}}">
        <input type="text" [attr.tabindex]='tindex'
                           [attr.maxlength]="maxlength"
                           [disabled]="disabled" (blur)="touch()" class="form-control" [attr.id]="identifier"
[(ngModel)]="value"
               >
        <span *ngIf="helptext" class="help-block">{{helptext}}</span>
        <span *ngIf="message" class="help-block">{{message}}</span>
      </div>

    </div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FormTextComponent,
    multi: true,
  }],
})
export class FormTextComponent extends ElementBase<string> {
  public identifier = `form-text-${identifier++}`;
  @Input() maxlength = '';
}


