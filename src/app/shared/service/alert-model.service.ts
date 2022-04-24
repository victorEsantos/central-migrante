import {Injectable} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ConfirmModalComponent} from "../../views/confirm-modal/confirm-modal.component";
import {AlertModalComponent} from "../../views/alert-modal/alert-modal.component";

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModelService {

  constructor(private modalService: BsModalService) {
  }

  // private showConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string, dismissTimeOut?: number) {
  //   const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
  //   bsModalRef.content.title = title;
  //   bsModalRef.content.message = msg;
  //
  //   if (okTxt) {
  //     bsModalRef.content.okTxt = okTxt;
  //   }
  //
  //   if (cancelTxt) {
  //     bsModalRef.content.cancelTxt = cancelTxt;
  //   }
  //
  //   if (dismissTimeOut) {
  //     setTimeout(() => bsModalRef.hide(), dismissTimeOut)
  //   }
  // }

  private showAlert(message: string, type: AlertTypes) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    setTimeout(() => bsModalRef.hide(), 2000)
  }

  showAlertDanger(message: string){
    this.showAlert(message, AlertTypes.DANGER)
  }

  showAlertSuccess(message: string){
    this.showAlert(message, AlertTypes.SUCCESS)
  }

}
