import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KurirMitraPage } from './kurir-mitra.page';

const routes: Routes = [
  {
    path: '',
    component: KurirMitraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KurirMitraPageRoutingModule {}
