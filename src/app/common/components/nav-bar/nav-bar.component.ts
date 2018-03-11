import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@app/common/services';
import { Router } from '@angular/router';
import { integerNumberMask } from '@app/common/masks';

@Component({
  selector: 'aa-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent {
  @Output() onNewSda = new EventEmitter();
  sdaId: number;
  integerNumberMask = integerNumberMask;
  constructor(public authService: AuthService, private router: Router) {
  }
  newSda() {
    this.onNewSda.emit();

    return false;
  }
  viewSda() {
    if (this.sdaId) {
      this.router.navigate(['alerts', this.sdaId]);
    }

    return false;
  }
}
