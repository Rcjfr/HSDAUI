import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
export interface AlertModel {
  title: string;
  message: string;
  okButtonText: string;
  icon: string;
}
@Component({
  selector: 'aa-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less']
})
export class AlertComponent extends DialogComponent<AlertModel, void> implements AlertModel {

  title: string;
  message: string;
  okButtonText = 'OK';
  icon = 'fa fa-ok';
  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  confirm() {
    this.close();
  }
}
