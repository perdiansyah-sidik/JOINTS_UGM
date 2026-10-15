import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Hanya membatasi navigasi UI. API WAJIB memverifikasi sesi dan peran sendiri.
export const pengelolaGuard: CanActivateFn = () => {
  const router = inject(Router);
  try {
    const sesi = JSON.parse(localStorage.getItem('ecoapp_user') ?? 'null');
    if (!sesi) return router.parseUrl('/login');
    if ((sesi.peran === 4 || sesi.peran === 'PENGELOLA') && sesi.aktif !== 0 && sesi.is_deleted !== 1) return true;
    return router.parseUrl('/dashboard');
  } catch {
    return router.parseUrl('/login');
  }
};
