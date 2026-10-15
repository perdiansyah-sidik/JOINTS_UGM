import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MasterDropPointPageRoutingModule } from './master-drop-point-routing.module';
import { MasterDropPointPage } from './master-drop-point.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MasterDropPointPageRoutingModule
  ],
  declarations: [MasterDropPointPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Memberitahu Angular agar menerima semua tag <ion-...>
})
export class MasterDropPointPageModule {}