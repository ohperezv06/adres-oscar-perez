import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private isOpen = new BehaviorSubject<boolean>(false);

  public isOpen$ = this.isOpen.asObservable();

  public openModal(): void {
    this.isOpen.next(true);
  }

  public closeModal(): void {
    this.isOpen.next(false);
  }
}
