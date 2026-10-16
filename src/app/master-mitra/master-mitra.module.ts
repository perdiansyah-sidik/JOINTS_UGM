import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';

import { MasterMitraPageRoutingModule } from './master-mitra-routing.module';
import { MasterMitraPage } from './master-mitra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterMitraPageRoutingModule
  ],
  declarations: [MasterMitraPage]
})
export class MasterMitraPageModule {}