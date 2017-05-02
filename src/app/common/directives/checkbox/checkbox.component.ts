import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ICheckboxState } from './checkbox.interfaces';

@Component({
  selector: 'aac-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input() checkboxLabel: any;
  @Input() checkboxState: ICheckboxState;
  @Output() onChangeNotify = new EventEmitter<boolean>();

  public checkboxId: string;

  constructor() { }

  ngOnInit() {
        const chkId = this.checkboxId = `chk_${this.checkboxLabel}`; //create unique Id

         if(!this.checkboxState){
             //improper use of directive with no state management
         }
         else if(!this.checkboxState.isEnabled){
            //assume a default of enabled
            this.checkboxState.isEnabled = true;
        }
    }

   private checkboxChanged() {
     this.onChangeNotify.emit(this.checkboxState.isChecked);
   }
}
