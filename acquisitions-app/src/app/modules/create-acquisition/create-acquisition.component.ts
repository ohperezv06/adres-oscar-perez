import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppFacade } from '@app/app.facade';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { IAcquisitionResponse } from '@commons/entities/acquisition.entities';

@Component({
  selector: 'app-create-acquisition',
  templateUrl: './create-acquisition.component.html',
  styleUrls: ['./create-acquisition.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CreateAcquisitionComponent implements OnInit {
  public formCreateAcquisition: FormGroup;
  private acquisitionId: string | null;
  public currentAcquisition: IAcquisitionResponse | undefined

  constructor(
    private facade: AppFacade,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this._initForm();
    this.acquisitionId = this.route.snapshot.paramMap.get('id');
    if (this.acquisitionId) {
      this.facade.acquisitionById$(+this.acquisitionId).subscribe((acquisition) => {
        this.currentAcquisition = acquisition
        this._patchFormValues();
      });
    }
  }

  get budget(): FormControl {
    return this.formCreateAcquisition.get('budget') as FormControl;
  }

  get unit(): FormControl {
    return this.formCreateAcquisition.get('unit') as FormControl;
  }

  get type(): FormControl {
    return this.formCreateAcquisition.get('type') as FormControl;
  }

  get quantity(): FormControl {
    return this.formCreateAcquisition.get('quantity') as FormControl;
  }

  get unitPrice(): FormControl {
    return this.formCreateAcquisition.get('unitPrice') as FormControl;
  }

  get totalValue(): FormControl {
    return this.formCreateAcquisition.get('totalValue') as FormControl;
  }

  get acquisitionDate(): FormControl {
    return this.formCreateAcquisition.get('acquisitionDate') as FormControl;
  }

  get provider(): FormControl {
    return this.formCreateAcquisition.get('provider') as FormControl;
  }

  get documentation(): FormControl {
    return this.formCreateAcquisition.get('documentation') as FormControl;
  }

  get buttonName(): string {
    return this.acquisitionId ? 'Actualizar' : 'Crear';
  }

  public resetForm(): void {
    this.formCreateAcquisition.reset()
  }

  public goToHome(): void {
    this.router.navigate(['/'])
  }

  public onSubmit(): void {
    if (this.formCreateAcquisition.valid) {
      if (this.acquisitionId) {
        this.facade.updateAcquisition(+this.acquisitionId, this.formCreateAcquisition.value);
        this.facade.updateAcquisition$.pipe(
          filter((info) => info.completed)
        ).subscribe(() => this.facade.getAcquisitions())
      } else {
        this.facade.createAcquisition(this.formCreateAcquisition.value);
        this.facade.createAcquisition$.pipe(
          filter((info) => info.completed)
        ).subscribe(() => this.facade.getAcquisitions())
      }
    }
  }

  private _patchFormValues(): void {
    if (this.currentAcquisition) {
      this.formCreateAcquisition.patchValue({
        budget: this.currentAcquisition.budget || '', // Asigna el valor de currentAcquisition.budget o un string vacío si es nulo/undefined
        unit: this.currentAcquisition.unit || '',
        type: this.currentAcquisition.type || '',
        quantity: this.currentAcquisition.quantity || '',
        unitPrice: this.currentAcquisition.unitPrice || '',
        totalValue: this.currentAcquisition.totalValue || '',
        acquisitionDate: this.currentAcquisition.acquisitionDate || '',
        provider: this.currentAcquisition.provider || '',
        documentation: this.currentAcquisition.documentation || ''
      });
    }
  }

  private _initForm(): void {
    this.formCreateAcquisition = this.fb.group({
      budget: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      unit: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      type: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      quantity: ['', Validators.required],
      unitPrice: ['', [Validators.required]],
      totalValue: ['', [Validators.required]],
      acquisitionDate: ['', [Validators.required]],
      provider: ['', [Validators.required]],
      documentation: ['', [Validators.required]]
    });
  }
}
