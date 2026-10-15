import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pengelolaGuard } from './pengelola.guard';
import { MasterPenggunaPage } from './master-pengguna.page';

const routes: Routes = [
  {
    path: '',
    canActivate: [pengelolaGuard],
    component: MasterPenggunaPage,
  },
  {
    path: 'detail/:id',
    canActivate: [pengelolaGuard],
    loadChildren: () => import('./detail-pengguna/detail-pengguna.module').then(m => m.DetailPenggunaPageModule),
  },
  {
    path: 'form/:mode',
    canActivate: [pengelolaGuard],
    // mode: 'tambah' | 'ubah'. id akun ubah dikirim lewat query param ?id=
    loadChildren: () => import('./form-pengguna/form-pengguna.module').then(m => m.FormPenggunaPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterPenggunaPageRoutingModule {}
