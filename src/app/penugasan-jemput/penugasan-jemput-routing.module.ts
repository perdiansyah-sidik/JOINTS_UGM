import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PenugasanJemputPage } from './penugasan-jemput.page';

const routes: Routes = [
  {
    path: '',
    component: PenugasanJemputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PenugasanJemputPageRoutingModule {}