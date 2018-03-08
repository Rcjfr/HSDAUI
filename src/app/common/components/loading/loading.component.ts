import { Component, OnInit } from '@angular/core';
import { AppStateService } from '@app/common/services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'aac-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.less']
})
export class LoadingComponent implements OnInit {
  public loadingText$: Observable<string>;
  constructor(private appStateService: AppStateService) { }

  ngOnInit() {
    this.loadingText$ = this.appStateService.getLoadingText();
  }

}
