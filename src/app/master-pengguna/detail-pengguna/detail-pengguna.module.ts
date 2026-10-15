import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular/lazy';
import { DetailPenggunaPageRoutingModule } from './detail-pengguna-routing.module';
import { DetailPenggunaPage } from './detail-pengguna.page';

@NgModule({
  imports: [CommonModule, IonicModule, DetailPenggunaPageRoutingModule],
  declarations: [DetailPenggunaPage],
})
export class DetailPenggunaPageModule {}
