import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '@commons/pipes/filter.pipe';
import { ModalModule } from '@commons/components/modal/modal.module';


@NgModule({
  declarations: [
    HomeComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    ModalModule
  ]
})
export class HomeModule { }
