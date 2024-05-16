import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { ILoadAcquisitionHistoryState, ILoadAcquisitionsState } from '@store/state/app.state';
import { IAcquisition } from '@commons/entities/acquisition.entities';
import { trackBy } from '@commons/helpers/track-by.helper';
import { ModalService } from '@commons/services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
  // public products: IProduct[] = [];

  public formHome: FormGroup;
  public itemsPerPageList = [5, 10, 15];
  public currentPage = 1;
  private _totalPages = 0
  public quantityItems = 0

  constructor(
    private facade: AppFacade,
    private fb: FormBuilder,
    private router: Router,
    public modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this._initForm();
    this.facade.getAcquisitions();
    this.acquisitions$.subscribe((data) => this.quantityItems = data?.acquisitions?.length)
  }

  ngOnDestroy(): void {
    this.facade.resetCreateAcquisition();
    this.facade.resetUpdateAcquisition();
  }

  get searchTerm(): AbstractControl {
    return this.formHome.get('searchTerm') as AbstractControl;
  }

  get itemsPerPage(): AbstractControl {
    return this.formHome.get('itemsPerPage') as AbstractControl;
  }

  get acquisitions$(): Observable<ILoadAcquisitionsState> {
    return this.facade.acquisitions$;
  }

  get acquisitionHistory$(): Observable<ILoadAcquisitionHistoryState> {
    return this.facade.acquisitionHistory$;
  }

  get totalPages(): number {
    this._totalPages = Math.ceil(this.quantityItems / this.itemsPerPage.value);
    return this._totalPages
  }

  public trackByTo(index: number, acquisition: IAcquisition): string {
    return trackBy(acquisition, acquisition.type);
  }

  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  public nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  public goToCreateAcquisition(): void {
    this.router.navigate(['/crear-adquisicion'])
  }

  public goToEdit(id: number): void {
    this.router.navigate([`modificar-adquisicion/${id}`])
  }

  public showHistory(id: number): void {
    this.facade.getAcquisitionHistory(id);
    this.facade.acquisitionHistory$.pipe(
      filter((info) => info.completed)
    ).subscribe(() => this.modalService.openModal())
  }

  public confirmationDelete(id: number): void {
    const resp = confirm('¿Estás seguro que quieres eliminar esta adquisición?');
    if (resp) {
      this.facade.deleteAcquisition(id);
      this.facade.deleteAcquisition$.pipe(
        filter((info) => info.completed)
      ).subscribe(() => this.facade.getAcquisitions())
    }
  }

  private _initForm(): void {
    this.formHome = this.fb.group({
      searchTerm: [''],
      itemsPerPage: [10]
    });
  }
}
