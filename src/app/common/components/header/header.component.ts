import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'aa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Output() onNewSda = new EventEmitter();
    constructor(private router: Router) { }

  ngOnInit() {
    }
  newSda() {
    this.onNewSda.emit();
    return false;
  }
}
