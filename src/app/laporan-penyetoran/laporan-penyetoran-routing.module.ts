import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaporanPenyetoranPage } from './laporan-penyetoran.page';

const routes: Routes = [
  {
    path: '',
    component: LaporanPenyetoranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaporanPenyetoranPageRoutingModule {}
