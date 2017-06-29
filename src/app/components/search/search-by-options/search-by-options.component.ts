import { Component, OnInit } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-search-by-options',
  templateUrl: './search-by-options.component.html',
  styleUrls: ['./search-by-options.component.less']
})
export class SearchByOptionsComponent implements OnInit {
    searchByOptionsFormGroup: FormGroup;
    createNumberMask = createNumberMask;
    private numberMask = createNumberMask({
        prefix: '',
        allowDecimal: false,
        includeThousandsSeparator: false,
        allowLeadingZeroes: false
    });
  constructor() { }

  ngOnInit() {
  }

  save() {

      //  this.toastr.success('Form Submitted to QC', 'Success');
  }
}
