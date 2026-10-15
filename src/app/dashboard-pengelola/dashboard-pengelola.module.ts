import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { DashboardPengelolaPageRoutingModule } from './dashboard-pengelola-routing.module';

import { DashboardPengelolaPage } from './dashboard-pengelola.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPengelolaPageRoutingModule
  ],
  declarations: [DashboardPengelolaPage]
})
export class DashboardPengelolaPageModule {}
