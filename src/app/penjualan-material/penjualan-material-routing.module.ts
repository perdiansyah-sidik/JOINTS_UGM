import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PenjualanMaterialPage } from './penjualan-material.page';

const routes: Routes = [
  {
    path: '',
    component: PenjualanMaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PenjualanMaterialPageRoutingModule {}
