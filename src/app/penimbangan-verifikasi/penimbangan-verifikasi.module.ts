import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';

import { PenimbanganVerifikasiPageRoutingModule } from './penimbangan-verifikasi-routing.module';
import { PenimbanganVerifikasiPage } from './penimbangan-verifikasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PenimbanganVerifikasiPageRoutingModule
  ],
  declarations: [PenimbanganVerifikasiPage]
})
export class PenimbanganVerifikasiPageModule {}
