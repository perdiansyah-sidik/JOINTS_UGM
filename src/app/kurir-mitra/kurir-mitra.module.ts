import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';

import { KurirMitraPageRoutingModule } from './kurir-mitra-routing.module';
import { KurirMitraPage } from './kurir-mitra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KurirMitraPageRoutingModule
  ],
  declarations: [KurirMitraPage]
})
export class KurirMitraPageModule {}
