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
        <label class="col-sm-4 control-label" [attr.for]="identifier">{{label}}<span class="req" *ngIf="_required">*</span></label>
        <div class="col-sm-8">
          <select [attr.tabindex]='tindex' (blur)="touch()"  [(ngModel)]="value" class="form-control" [attr.id]="identifier">
          <ng-content></ng-content>
        </select>
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
