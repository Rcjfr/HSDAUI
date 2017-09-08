import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppStateService } from '../../../common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { ICorrosionLevel, ICorrosionType, ICauseOfDamage } from '../../../common/models';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'aa-search-by-corrosion',
  templateUrl: './search-by-corrosion.component.html',
  styleUrls: ['./search-by-corrosion.component.less']
})
export class SearchByCorrosionComponent implements OnInit {
  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  corrosionForm = new FormGroup({
    isWideSpreadCorrosion: new FormControl(),
    isPreviouslyBlended: new FormControl(),
    corrosionTaskNo: new FormControl(),
    corrosionLevel: new FormArray([]),
    corrosionType: new FormControl(),
    causesOfDamage: new FormControl(),
    corrosionTypeOtherText: new FormControl()
  });

  corrosionTypes$: Observable<List<ICorrosionType>>;
  corrosionLevels$: Observable<List<ICorrosionLevel>>;
  causeOfDamages$: Observable<List<ICauseOfDamage>>;
  corrosionLevels: string[] = [];
  causeOfDamage: string[] = [];
  corrosionType = '';

  hideCorrosionTypeOther = true;

  constructor(private appStateService: AppStateService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.corrosionLevels$ = this.appStateService.getCorrosionLevels();
    this.corrosionTypes$ = this.appStateService.getCorrosionTypes();
    this.causeOfDamages$ = this.appStateService.getCauseOfDamages();
    this.corrosionForm.valueChanges.subscribe(this.update);
  }

  onCorrosionTypeChange(event) {
    const typeArray = <FormArray>this.corrosionForm.controls.corrosionType;
    if (typeArray) {
      if (typeArray.value.indexOf(5) >= 0) {
        this.hideCorrosionTypeOther = false;

        return;
      }
    }

    this.hideCorrosionTypeOther =  true;
  }

  onCorrosionLevelChange(id: string, isChecked: boolean) {
    const corrosionArray = <FormArray>this.corrosionForm.controls.corrosionLevel;

    if (isChecked) {
      corrosionArray.push(new FormControl(id));
    } else {
      corrosionArray.removeAt(corrosionArray.controls.findIndex(x => x.value === id));
    }
  }
}
