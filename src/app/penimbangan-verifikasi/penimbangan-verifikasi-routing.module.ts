import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PenimbanganVerifikasiPage } from './penimbangan-verifikasi.page';

const routes: Routes = [
  {
    path: '',
    component: PenimbanganVerifikasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PenimbanganVerifikasiPageRoutingModule {}
