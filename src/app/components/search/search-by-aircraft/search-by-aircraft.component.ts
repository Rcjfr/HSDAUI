import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'aa-search-by-aircraft',
  templateUrl: './search-by-aircraft.component.html',
  styleUrls: ['./search-by-aircraft.component.less']
})
export class SearchByAircraftComponent implements OnInit {
  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  aircraftForm = new FormGroup({
    aircraftNo: new FormControl(),
    manufacturer: new FormControl(),
    model: new FormControl(),
    serialNo: new FormControl()
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.aircraftForm.valueChanges.subscribe(this.update);
  }
}