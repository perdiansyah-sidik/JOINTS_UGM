import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterDropPointPage } from './master-drop-point.page';

const routes: Routes = [
  {
    path: '',
    component: MasterDropPointPage
  },  {
    path: 'form-drop-point',
    loadChildren: () => import('./form-drop-point/form-drop-point.module').then( m => m.FormDropPointPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDropPointPageRoutingModule {}
