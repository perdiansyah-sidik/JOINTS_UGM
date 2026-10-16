import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular/lazy';

import { FormPenggunaPageRoutingModule } from './form-pengguna-routing.module';
import { FormPenggunaPage } from './form-pengguna.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormPenggunaPageRoutingModule,
  ],
  declarations: [FormPenggunaPage],
})
export class FormPenggunaPageModule {}
