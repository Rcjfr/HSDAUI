import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewChild } from '@angular/core';
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
export class PromptDialogComponent extends DialogComponent<ConfirmModel, any> implements ConfirmModel, AfterViewInit {
  @ViewChild('searchTitle') vcSearchTitle: ElementRef;

  title: string;
  message: string;

  form: FormGroup;

  constructor(dialogService: DialogService) {
    super(dialogService);

    this.form = new FormGroup({
      searchTitle: new FormControl('', [Validators.required])
    });
  }

  ngAfterViewInit() {
    this.vcSearchTitle.nativeElement.focus();
  }

  confirm() {
    if (this.form.valid) {
      this.result = this.form.get('searchTitle').value;
      this.close();
    }
  }
}