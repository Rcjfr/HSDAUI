import {
  Component, Input,
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { ElementBase } from './element-base';
let identifier = 0;

@Component({
  selector: 'aac-radio',
  template: `
  <div class="customComponent" style="padding-left:20px;">
  <div>
    <input type="radio" [attr.tabindex]="tindex"
    (change)="onSelectionChange($event)"
    [attr.name]="radio_group_name"
    [attr.id]="identifier" [value]="value">
    <label [attr.for]="identifier">
          <span class="control"></span>
          {{label}}
        </label>
  </div>
</div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FormRadioComponent,
    multi: true,
  }],
})
export class FormRadioComponent extends ElementBase<string> {
  public identifier = `form-radio-${identifier++}`;
  @Input('value') _value = null;
  // tslint:disable-next-line:no-input-rename
  @Input('name') radio_group_name = '';
  onSelectionChange(evnt) {
    console.log(evnt)
    this.touch();
   // if(evnt.target.checked){
    this.writeValue(this._value);
   // }
  }
}


