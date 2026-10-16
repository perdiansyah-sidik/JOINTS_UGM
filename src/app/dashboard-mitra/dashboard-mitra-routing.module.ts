import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardMitraPage } from './dashboard-mitra.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardMitraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardMitraPageRoutingModule {}