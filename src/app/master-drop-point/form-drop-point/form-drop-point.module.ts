import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { FormDropPointPageRoutingModule } from './form-drop-point-routing.module';

import { FormDropPointPage } from './form-drop-point.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormDropPointPageRoutingModule
  ],
  declarations: [FormDropPointPage]
})
export class FormDropPointPageModule {}
