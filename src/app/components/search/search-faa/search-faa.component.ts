import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import * as models from '@app/common/models';
import { AuthService } from '@app/common/services/auth.service';


@Component({
  selector: 'aa-search-faa',
  templateUrl: './search-faa.component.html',
  styleUrls: ['./search-faa.component.less']
})
export class SearchFaaComponent implements OnInit {
  @Input() criteria: any;
  faaForm = new FormGroup({
    aircraftNo: new FormControl(),
    sdaId: new FormControl(),
    sdrNumber: new FormControl()
  });
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.faaForm.valueChanges.subscribe(s => {
      this.criteria.searchByAircraft = {
        aircraftNo: s.aircraftNo
      };
      this.criteria.searchBySda = {
        id: s.sdaId,
        sdrNumber: s.sdrNumber
      };
     });
  }
}
