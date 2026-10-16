import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { TerimaDiTitikPageRoutingModule } from './terima-di-titik-routing.module';

import { TerimaDiTitikPage } from './terima-di-titik.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerimaDiTitikPageRoutingModule
  ],
  declarations: [TerimaDiTitikPage]
})
export class TerimaDiTitikPageModule {}
