import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
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
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./onboarding/onboarding.module').then( m => m.OnboardingPageModule)
  },
  {
    path: 'jenis-sampah',
    loadChildren: () => import('./jenis-sampah/jenis-sampah.module').then( m => m.JenisSampahPageModule)
  },

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome', // <-- OTOMATIS BUKA HALAMAN WELCOME SAAT PERTAMA KALI DIJALANKAN
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
    path: 'dashboard-pengelola',
    loadChildren: () => import('./dashboard-pengelola/dashboard-pengelola.module').then(m => m.DashboardPengelolaPageModule)
  },
  {
    path: 'master-mitra',
    loadChildren: () => import('./master-mitra/master-mitra.module').then(m => m.MasterMitraPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }