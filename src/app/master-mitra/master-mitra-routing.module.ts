import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterMitraPage } from './master-mitra.page';

const routes: Routes = [
  {
    path: '',
    component: MasterMitraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterMitraPageRoutingModule {}