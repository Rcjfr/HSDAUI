import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'aa-search-by-aircraft',
  templateUrl: './search-by-aircraft.component.html',
  styleUrls: ['./search-by-aircraft.component.less']
})
export class SearchByAircraftComponent implements OnInit, OnChanges {
  @Input() criteria: any;

  aircraftForm = new FormGroup({
    aircraftNo: new FormControl(),
    manufacturer: new FormControl(),
    model: new FormControl(),
    serialNo: new FormControl()
  });

  constructor() { }

  ngOnInit() {
    this.aircraftForm.valueChanges.subscribe(s => this.criteria.searchByAircraft = s)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.criteria && changes.criteria.currentValue) {
      if (changes.criteria.currentValue.searchByAircraft) {
        this.aircraftForm.patchValue(changes.criteria.currentValue.searchByAircraft, {emitEvent: false});
      } else {
        this.aircraftForm.reset({}, {emitEvent: false});
      }
    }
  }
}