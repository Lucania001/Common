import {Component, Input} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './modal-popup.html',
  styleUrls: ['./modal-popup.css']
    
  
})
export class popupModal {
  @Input() name;
  @Input() message;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal-component.html'
})

export class NgbdModalComponent {
  constructor(private modalService: NgbModal) {}

  open(title: string, message: string) {
    const modalRef = this.modalService.open(popupModal);
    modalRef.componentInstance.name = title
    modalRef.componentInstance.message = message
  }
}