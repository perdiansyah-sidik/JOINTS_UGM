import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { JenisSampahPageRoutingModule } from './jenis-sampah-routing.module';

import { JenisSampahPage } from './jenis-sampah.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JenisSampahPageRoutingModule
  ],
  declarations: [JenisSampahPage]
})
export class JenisSampahPageModule {}
