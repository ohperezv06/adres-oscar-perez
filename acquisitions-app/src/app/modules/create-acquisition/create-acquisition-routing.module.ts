import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAcquisitionComponent } from '@modules/create-acquisition/create-acquisition.component';

const routes: Routes = [{ path: '', component: CreateAcquisitionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAcquisitionRoutingModule { }
