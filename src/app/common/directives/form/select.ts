import {
  Component,
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ElementBase } from './element-base';
let identifier = 0;
@Component({
  selector: 'aac-select',
  template: `

        <div class="row form-group" [class.has-error]="message">
        <label class="{{labelCssClass}}" [attr.for]="identifier">{{label}}<span class="req" *ngIf="_required">*</span></label>
        <div class="{{fieldCssClass}}">
          <select [attr.tabindex]='tindex'
                  [disabled]="disabled" (blur)="touch()"
                  [(ngModel)]="value" class="form-control" [attr.id]="identifier">
          <ng-content></ng-content>
        </select>
        <span *ngIf="helptext" class="help-block">{{helptext}}</span>
          <span *ngIf="message" class="help-block">{{message}}</span>
        </div>

      </div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FormSelectComponent,
    multi: true,
  }],
})
export class FormSelectComponent extends ElementBase<string> {
  public identifier = `form-select-${identifier++}`;
}
