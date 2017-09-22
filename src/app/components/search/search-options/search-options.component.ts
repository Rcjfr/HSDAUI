import { Component, OnInit, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'aa-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.less']
})
export class SearchOptionsComponent implements OnInit {
  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  optionsForm = new FormGroup({
    useAndOperator: new FormControl()
  });

  constructor() { }

  ngOnInit() {
    this.optionsForm.valueChanges.subscribe(this.update);
  }
}
