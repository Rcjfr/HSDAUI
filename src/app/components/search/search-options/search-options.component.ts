import { Component, OnInit, ViewContainerRef } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BaseFormComponent } from '../../base-form.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'aa-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.less']
})
export class SearchOptionsComponent  implements OnInit {
    createNumberMask = createNumberMask;
    public numberMask = createNumberMask({
        prefix: '',
        allowDecimal: false,
        includeThousandsSeparator: false,
        allowLeadingZeroes: false
    });

    constructor(private vcr: ViewContainerRef, private toastr: ToastsManager) {
        this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
  }

  save() {
        this.toastr.success('Form Saved', 'Success');
  }
}
