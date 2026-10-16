import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';

import { LaporanPenyetoranPageRoutingModule } from './laporan-penyetoran-routing.module';
import { LaporanPenyetoranPage } from './laporan-penyetoran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaporanPenyetoranPageRoutingModule
  ],
  declarations: [LaporanPenyetoranPage]
})
export class LaporanPenyetoranPageModule {}
