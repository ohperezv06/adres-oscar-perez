import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAcquisitionRoutingModule } from './create-acquisition-routing.module';
import { CreateAcquisitionComponent } from './create-acquisition.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContErrorModule } from '@commons/components/cont-error/cont-error.module';


@NgModule({
  declarations: [
    CreateAcquisitionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateAcquisitionRoutingModule,
    ContErrorModule
  ]
})
export class CreateAcquisitionModule { }
