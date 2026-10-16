import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular/lazy';

import { MasterPenggunaPageRoutingModule } from './master-pengguna-routing.module';
import { MasterPenggunaPage } from './master-pengguna.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterPenggunaPageRoutingModule,
  ],
  declarations: [MasterPenggunaPage],
})
export class MasterPenggunaPageModule {}
