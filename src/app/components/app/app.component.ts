import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../common/services';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'aa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private appStateService: AppStateService, private router: Router) { }
  ngOnInit(): void {
    this.appStateService.loadLookupData();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

}
