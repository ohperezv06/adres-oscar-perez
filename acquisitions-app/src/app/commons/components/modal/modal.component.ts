import { Component, ViewEncapsulation } from '@angular/core';
import { ModalService } from '@commons/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent {
  constructor(public modalService: ModalService) {
  }
}
