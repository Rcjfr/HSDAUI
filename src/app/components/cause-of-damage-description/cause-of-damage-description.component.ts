import { Component, OnInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { BaseFormComponent } from '../base-form.component';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-cause-of-damage-description',
  templateUrl: './cause-of-damage-description.component.html',
  styleUrls: ['./cause-of-damage-description.component.less']
})
export class CauseOfDamageDescriptionComponent extends BaseFormComponent implements OnDestroy, OnInit {
  causeOfDamageDescriptionGroup: FormGroup;
  
  
  constructor(private fb: FormBuilder) {
    super('causeOfDamageDescriptionGroup');
    
  }

  ngOnInit() {
    this.causeOfDamageDescriptionGroup = this.fb.group({
      damageDescription: ['', [Validators.maxLength(250), Validators.required]]
    });
    this.parent.addControl(this.formGroupName, this.causeOfDamageDescriptionGroup);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
