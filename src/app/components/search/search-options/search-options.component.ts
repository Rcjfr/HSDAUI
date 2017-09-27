import { Component, OnInit, ViewContainerRef, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'aa-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.less']
})
export class SearchOptionsComponent implements OnInit, OnChanges {
  @Input() criteria: any;

  optionsForm = new FormGroup({
    useAndOperator: new FormControl()
  });

  constructor() { }

  ngOnInit() {
    this.optionsForm.valueChanges.subscribe(s => this.criteria.searchByOptions = s);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.criteria && changes.criteria.currentValue) {
      if (changes.criteria.currentValue.searchByOptions) {
        this.optionsForm.patchValue(changes.criteria.currentValue.searchByOptions, { emitEvent: false });
      } else {
        this.optionsForm.reset({}, { emitEvent: false });
      }
    }
  }
}
