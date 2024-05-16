import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'crear-adquisicion',
    loadChildren: () => import('./modules/create-acquisition/create-acquisition.module').then(m => m.CreateAcquisitionModule)
  },
  {
    path: 'modificar-adquisicion/:id',
    loadChildren: () => import('./modules/create-acquisition/create-acquisition.module').then(m => m.CreateAcquisitionModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
