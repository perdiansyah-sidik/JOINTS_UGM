import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';
import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilPage } from './profil.page';

@NgModule({ imports: [CommonModule, FormsModule, IonicModule, ProfilRoutingModule], declarations: [ProfilPage] })
export class ProfilPageModule {}
