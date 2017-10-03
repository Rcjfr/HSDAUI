import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services';

@Component({
  selector: 'aa-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent {
    @Output() onNewSda = new EventEmitter();
    constructor(public authService: AuthService) {
    }
    newSda() {
      this.onNewSda.emit();

      return false;
    }
}
