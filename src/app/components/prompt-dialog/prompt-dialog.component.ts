import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  selector: 'aa-save-prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.less']
})
export class PromptDialogComponent extends DialogComponent<ConfirmModel, any> implements ConfirmModel {

  title: string;
  message: string;

  form: FormGroup;

  constructor(dialogService: DialogService) {
    super(dialogService);

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required])
    });
  }

  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = this.form.get('title').value;
    this.close();
  }
}