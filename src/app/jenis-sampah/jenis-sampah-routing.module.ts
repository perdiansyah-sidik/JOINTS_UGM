import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JenisSampahPage } from './jenis-sampah.page';

const routes: Routes = [
  {
    path: '',
    component: JenisSampahPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JenisSampahPageRoutingModule {}
