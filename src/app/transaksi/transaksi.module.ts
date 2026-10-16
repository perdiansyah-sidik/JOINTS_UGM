import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular/lazy';
import { TransaksiPage } from './transaksi.page';
@NgModule({declarations:[TransaksiPage],imports:[CommonModule,FormsModule,IonicModule,RouterModule.forChild([{path:'',component:TransaksiPage}])]})
export class TransaksiModule {}
