import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';

import { DashboardMitraPageRoutingModule } from './dashboard-mitra-routing.module';
import { DashboardMitraPage } from './dashboard-mitra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardMitraPageRoutingModule
  ],
  declarations: [DashboardMitraPage]
})
export class DashboardMitraPageModule {}