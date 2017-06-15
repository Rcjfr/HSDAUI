import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../common/services/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private appStateService: AppStateService) { }
  ngOnInit(): void {
    this.appStateService.loadLookupData();
  }
}
