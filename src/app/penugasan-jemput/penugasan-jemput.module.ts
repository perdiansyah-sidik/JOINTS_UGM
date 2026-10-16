import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';

import { PenugasanJemputPageRoutingModule } from './penugasan-jemput-routing.module';
import { PenugasanJemputPage } from './penugasan-jemput.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PenugasanJemputPageRoutingModule
  ],
  declarations: [PenugasanJemputPage]
})
export class PenugasanJemputPageModule {}