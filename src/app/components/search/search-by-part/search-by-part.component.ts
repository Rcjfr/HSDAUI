import { Component, OnInit, Input, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'aa-search-by-part',
  templateUrl: './search-by-part.component.html',
  styleUrls: ['./search-by-part.component.less']
})
export class SearchByPartComponent implements OnInit, OnChanges {
  @Input() criteria: any;

  partForm = new FormGroup({
    manufacturerPartNo: new FormControl(),
    manufacturerSerialNo: new FormControl(),
    partDefective: new FormControl()
  });

  constructor() { }

  ngOnInit() {
    this.partForm.valueChanges.subscribe(form => {
      this.criteria.searchByPart = form;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.criteria && changes.criteria.currentValue) {
      if (changes.criteria.currentValue.searchByPart) {
        this.partForm.patchValue(changes.criteria.currentValue.searchByPart, { emitEvent: false });
      } else {
        this.partForm.reset({}, { emitEvent: false });
      }
    }
  }
}