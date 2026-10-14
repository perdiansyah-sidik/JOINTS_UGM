import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Ini yang membawa *ngIf
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';

import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule, // Wajib ada agar *ngIf berfungsi
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}