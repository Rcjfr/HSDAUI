import { Component, OnInit, Input, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { AppStateService, UtilityService } from '@app/common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { IBaseLookUp, IYesNoBoth } from '@app/common/models';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'aa-search-by-corrosion',
  templateUrl: './search-by-corrosion.component.html',
  styleUrls: ['./search-by-corrosion.component.less']
})
export class SearchByCorrosionComponent implements OnInit, OnChanges {
  @Input() criteria: any;

  corrosionForm = new FormGroup({
    isWideSpreadCorrosion: new FormControl(''),
    isPreviouslyBlended: new FormControl(''),
    corrosionTaskNo: new FormControl(),
    corrosionLevel: new FormControl([]),
    corrosionType: new FormControl(),
    causesOfDamage: new FormControl(),
    corrosionTypeOtherText: new FormControl()
  });
  yesNoBothOptions$: Observable<IYesNoBoth[]>;
  corrosionTypes$: Observable<IBaseLookUp[]>;
  corrosionLevels$: Observable<IBaseLookUp[]>;
  causeOfDamages$: Observable<IBaseLookUp[]>;
  corrosionLevels: string[] = [];
  causeOfDamage: string[] = [];
  isWideSpreadCorrosion: string[] = [];
  isPreviouslyBlended: string[] = [];
  hideCorrosionTypeOther = true;

  constructor(private appStateService: AppStateService, private utilityService: UtilityService) { }

  ngOnInit() {
    this.corrosionLevels$ = this.appStateService.getCorrosionLevels();
    this.corrosionTypes$ = this.appStateService.getCorrosionTypes();
    this.causeOfDamages$ = this.appStateService.getCauseOfDamages();
    this.yesNoBothOptions$ = this.utilityService.getYesNoBothOptions();

    this.corrosionForm.valueChanges.subscribe(form => {
      //Remove any empty selections from the multi-select dropdowns
      form.corrosionType = _.compact(form.corrosionType);
      form.causesOfDamage = _.compact(form.causesOfDamage);
      this.criteria.searchByCorrosion = form;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.criteria && changes.criteria.currentValue) {
      if (changes.criteria.currentValue.searchByCorrosion) {
        this.corrosionForm.patchValue(changes.criteria.currentValue.searchByCorrosion, { emitEvent: false });
        this.onCorrosionTypeChange();
      } else {
        this.corrosionForm.reset({
          isWideSpreadCorrosion: '',
          isPreviouslyBlended: ''
        }, { emitEvent: false });
        this.hideCorrosionTypeOther  = true;
      }
    }
  }

  onCorrosionTypeChange() {
    const corrosionType = this.corrosionForm.controls.corrosionType;
    if (corrosionType) {
      //If they select "Other" we need to display an extra textbox for the description
      if (corrosionType.value.indexOf(99) >= 0) {
        this.hideCorrosionTypeOther = false;

        return;
      }
    }

    this.hideCorrosionTypeOther = true;
  }
}
