import {
  Component,
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { ElementBase } from './element-base';
let identifier = 0;

@Component({
  selector: 'aac-checkbox',
  template: `
  <div class="customComponent">
  <div>
    <input [attr.id]="identifier" [attr.tabindex]="tindex"
            [(ngModel)]="value"
            type="checkbox"
            (blur)="touch()"
            [disabled]="disabled"
            [checked]="value" >
    <label class="checkboxLabel" [attr.for]="identifier">
          <span class="control"></span>
        </label>
  </div>
</div>
<label [attr.for]="identifier">{{label}}</label>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FormCheckBoxComponent,
    multi: true,
  }],
})
export class FormCheckBoxComponent extends ElementBase<string> {
  public identifier = `form-checkbox-${identifier++}`;

}


