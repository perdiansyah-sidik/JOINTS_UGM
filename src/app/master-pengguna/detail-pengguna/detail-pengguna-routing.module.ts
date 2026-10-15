import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPenggunaPage } from './detail-pengguna.page';

const routes: Routes = [{ path: '', component: DetailPenggunaPage }];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class DetailPenggunaPageRoutingModule {}
