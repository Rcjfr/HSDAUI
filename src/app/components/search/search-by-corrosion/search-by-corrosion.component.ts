import { Component, OnInit, Input, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { AppStateService, UtilityService } from '../../../common/services';
import { Observable } from 'rxjs/Observable';
import { List } from 'immutable';
import { ICorrosionLevel, ICorrosionType, ICauseOfDamage, IYesNoBoth } from '../../../common/models';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import * as _ from 'lodash';
import * as models from '../../../common/models';

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
    corrosionLevel: new FormArray([]),
    corrosionType: new FormControl(),
    causesOfDamage: new FormControl(),
    corrosionTypeOtherText: new FormControl()
  });
  yesNoBothOptions$: Observable<IYesNoBoth[]>;
  corrosionTypes$: Observable<List<ICorrosionType>>;
  corrosionLevels$: Observable<List<ICorrosionLevel>>;
  causeOfDamages$: Observable<List<ICauseOfDamage>>;
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

      //These are temporarily checkboxes until we convert them to dropdowns
      //We want to pass null instead of false if unchecked
      if (form.isWideSpreadCorrosion === false) {
        form.isWideSpreadCorrosion = null;
      }
      if (form.isPreviouslyBlended === false) {
        form.isPreviouslyBlended = null;
      }
      this.criteria.searchByCorrosion = form;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.criteria && changes.criteria.currentValue) {
      if (changes.criteria.currentValue.searchByCorrosion) {
        this.corrosionForm.patchValue(changes.criteria.currentValue.searchByCorrosion, { emitEvent: false });

        //Corrosion Level checkbox array
        const corrosionLevelArray = <FormArray>this.corrosionForm.controls.corrosionLevel;
        changes.criteria.currentValue.searchByCorrosion.corrosionLevel.forEach(element => {
          corrosionLevelArray.push(new FormControl(element));
        });

        this.onCorrosionTypeChange();
      } else {
        this.corrosionForm.reset({
          isWideSpreadCorrosion: '',
          isPreviouslyBlended: ''
        }, { emitEvent: false });
      }
    }
  }

  onCorrosionTypeChange() {
    const corrosionType = this.corrosionForm.controls.corrosionType;
    if (corrosionType) {
      //If they select "Other" we need to display an extra textbox for the description
      if (corrosionType.value.indexOf(5) >= 0) {
        this.hideCorrosionTypeOther = false;

        return;
      }
    }

    this.hideCorrosionTypeOther = true;
  }

  onCorrosionLevelChange(id: string, isChecked: boolean) {
    const corrosionArray = <FormArray>this.corrosionForm.controls.corrosionLevel;

    if (isChecked) {
      corrosionArray.push(new FormControl(id));
    } else {
      corrosionArray.removeAt(corrosionArray.controls.findIndex(x => x.value === id));
    }
  }

  corrosionLevelContains(id) {
    if (_.includes(this.corrosionForm.controls.corrosionLevel.value, id)) {
      return true;
    }

    return false;
  }
}
