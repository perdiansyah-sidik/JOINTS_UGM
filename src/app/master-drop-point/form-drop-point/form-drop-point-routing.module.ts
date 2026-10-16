import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormDropPointPage } from './form-drop-point.page';

const routes: Routes = [
  {
    path: '',
    component: FormDropPointPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormDropPointPageRoutingModule {}
