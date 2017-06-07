import {
  Component, Input
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
@Component({
  selector: 'aac-field-container',
  template: `
    <div class="row form-group" [class.has-error]="message">
      <label class="{{labelCssClass}}" [attr.for]="identifier">{{label}}<span class="req" *ngIf="required">*</span></label>
      <div class="{{fieldCssClass}}">
        <ng-content></ng-content>
        <span *ngIf="helptext" class="help-block">{{helptext}}</span>
        <span *ngIf="message" class="help-block">{{message}}</span>
      </div>

    </div>
  `
})
export class FieldContainer {
  @Input() required = false;
}


