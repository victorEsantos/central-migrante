import {Component, Input} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";


@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {

  @Input() title: string = "Modal";

  @Input() msg: string = "Modal Message";

  @Input() cancelTxt: string = "cancelar";

  @Input() okTxt: string = "OK";

  constructor(public bsModalRef: BsModalRef) { }

}
