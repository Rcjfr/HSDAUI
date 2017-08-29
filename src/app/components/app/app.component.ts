import { Component, OnInit } from '@angular/core';
import { AppStateService, AuthService } from '../../common/services';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'aa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private appStateService: AppStateService,
private authService: AuthService,
private router: Router, private toastr: ToastrService ) {
    
  }
  ngOnInit(): void {
    this.appStateService.loadUser();
    this.appStateService.loadLookupData();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  loadNewSda() {
    this.router.navigate(['alerts', 'new']);
    this.appStateService.loadNewSda();

    return false;
  }
}
