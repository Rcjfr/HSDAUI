import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'aa-search-by-part',
  templateUrl: './search-by-part.component.html',
  styleUrls: ['./search-by-part.component.less']
})
export class SearchByPartComponent implements OnInit {
  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  partForm = new FormGroup({
    manufacturerPartNo: new FormControl(),
    manufacturerSerialNo: new FormControl(),
    partDefective: new FormControl()
  });

  constructor() { }

  ngOnInit() {
    this.partForm.valueChanges.subscribe(this.update);
  }
}