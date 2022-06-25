import {Component, Input} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent {

  @Input() type = 'success';
  @Input() message: string = 'message';


  constructor(public bsModalRef: BsModalRef) { }



  onClose(){
    this.bsModalRef.hide();
  }

}
