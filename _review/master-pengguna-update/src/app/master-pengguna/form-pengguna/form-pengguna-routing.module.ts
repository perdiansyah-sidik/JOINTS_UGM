import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPenggunaPage } from './form-pengguna.page';

const routes: Routes = [
  {
    path: '',
    component: FormPenggunaPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormPenggunaPageRoutingModule {}
