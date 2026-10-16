import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { PenjualanMaterialPageRoutingModule } from './penjualan-material-routing.module';

import { PenjualanMaterialPage } from './penjualan-material.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PenjualanMaterialPageRoutingModule
  ],
  declarations: [PenjualanMaterialPage]
})
export class PenjualanMaterialPageModule {}
