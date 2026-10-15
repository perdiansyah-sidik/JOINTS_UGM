import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterDropPointPage } from './master-drop-point.page';

const routes: Routes = [
  {
    path: '',
    component: MasterDropPointPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDropPointPageRoutingModule {}
