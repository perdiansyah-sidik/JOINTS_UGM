import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPengelolaPage } from './dashboard-pengelola.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPengelolaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPengelolaPageRoutingModule {}
