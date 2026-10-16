import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingPageModule)
  },
  {
    path: 'home',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'dashboard-pengelola',
    loadChildren: () => import('./dashboard-pengelola/dashboard-pengelola.module').then(m => m.DashboardPengelolaPageModule)
  },
  {
    path: 'master-drop-point',
    loadChildren: () => import('./master-drop-point/master-drop-point.module').then(m => m.MasterDropPointPageModule)
  },
  {
    path: 'master-pengguna',
    loadChildren: () => import('./master-pengguna/master-pengguna.module').then(m => m.MasterPenggunaPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'master-mitra',
    loadChildren: () => import('./master-mitra/master-mitra.module').then(m => m.MasterMitraPageModule)
  },
  {
    path: 'terima-di-titik',
    loadChildren: () => import('./terima-di-titik/terima-di-titik.module').then( m => m.TerimaDiTitikPageModule)
  },
  {
    path: 'penjualan-material',
    loadChildren: () => import('./penjualan-material/penjualan-material.module').then( m => m.PenjualanMaterialPageModule)
  },
  // Tambahan Rute M03 (Tambah & Edit)
  {
    path: 'form-drop-point',
    loadChildren: () => import('./master-drop-point/form-drop-point/form-drop-point.module').then( m => m.FormDropPointPageModule)
  },
  {
    path: 'form-drop-point/:id',
    loadChildren: () => import('./master-drop-point/form-drop-point/form-drop-point.module').then( m => m.FormDropPointPageModule)
  },
  {
    path: 'dashboard-mitra',
    loadChildren: () => import('./dashboard-mitra/dashboard-mitra.module').then(m => m.DashboardMitraPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }