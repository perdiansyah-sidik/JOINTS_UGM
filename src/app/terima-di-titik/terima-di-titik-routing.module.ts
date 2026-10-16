import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerimaDiTitikPage } from './terima-di-titik.page';

const routes: Routes = [
  {
    path: '',
    component: TerimaDiTitikPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerimaDiTitikPageRoutingModule {}
