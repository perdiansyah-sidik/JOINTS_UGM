import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { DEMO_ACCOUNTS, DEMO_PASSWORD } from './demo-accounts';
import { Pengguna } from '../models/pengguna.model';

@Injectable()
export class DemoApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const base = environment.apiUrl;
    if (!environment.demoMode || !request.url.startsWith(`${base}/`)) return next.handle(request);

    const path = request.url.slice(base.length).split('?')[0];
    const ok = (data: unknown, status = 200) => of(new HttpResponse({ status, body: { status: 'success', data } }));
    const error = (status: number, message: string) => throwError(() => new HttpErrorResponse({
      status, error: { status: 'error', message }, url: request.url,
    }));

    if (request.method === 'POST' && path === '/auth/login') {
      const body = request.body as { email?: string; password?: string } | null;
      const emailInput = body?.email?.trim().toLowerCase() || '';
      const user = DEMO_ACCOUNTS.find(item => item.email === emailInput);
      if (user) {
        if (body?.password !== DEMO_PASSWORD) return error(401, 'Email atau kata sandi demo salah.');
        return of(new HttpResponse({ status: 200, body: {
          status: 'success', message: 'Login demo berhasil.', token: `demo-${user.id_pengguna}`, data: user,
        } }));
      }
      // Jika bukan akun demo (.pilahin.local), teruskan ke Backend asli (SQL Server)
      return next.handle(request);
    }

    const actor = this.currentDemoUser();
    // Jika sedang tidak memakai akun demo (.pilahin.local), teruskan semua request ke Backend asli (SQL Server)
    if (!actor) return next.handle(request);
    const isAdmin = actor.peran === 4;
    const customer = actor.peran >= 1 && actor.peran <= 3;

    if (request.method === 'GET' && path === '/pengguna') {
      return isAdmin ? ok(DEMO_ACCOUNTS) : error(403, 'Hanya pengelola yang dapat melihat daftar akun.');
    }
    if (request.method === 'GET' && path === '/mitra/ringkas') {
      return isAdmin ? ok([{ id_mitra: 1, nama_mitra: 'Mitra Demo' }]) : error(403, 'Hanya pengelola yang dapat melihat daftar mitra.');
    }
    const penggunaId = /^\/pengguna\/(\d+)$/.exec(path);
    if (request.method === 'GET' && penggunaId) {
      const id = Number(penggunaId[1]);
      const user = DEMO_ACCOUNTS.find(item => item.id_pengguna === id);
      if (!isAdmin && actor.id_pengguna !== id) return error(403, 'Akun ini bukan milik Anda.');
      return user ? ok(user) : error(404, 'Akun demo tidak ditemukan.');
    }
    const dashboardId = /^\/dashboard\/(\d+)$/.exec(path);
    if (request.method === 'GET' && dashboardId) {
      const id = Number(dashboardId[1]);
      if (actor.id_pengguna !== id || !customer) return error(403, 'Dashboard ini bukan milik Anda.');
      return ok({
        profil: actor, saldo_poin_aktif: 0, total_poin_masuk: 0, total_poin_dicairkan: 0,
        nominal_rupiah: null, poin_diproses: 0, jumlah_drop_point: 1,
        total_berat_kg: 0, total_transaksi: 0,
        material_kg: { plastik: 0, kardus: 0, kaca: 0, logam: 0 },
        jemputan_berikutnya: null,
      });
    }
    const history = /^\/(setoran|pencairan)\/riwayat\/(\d+)$/.exec(path);
    if (request.method === 'GET' && history) {
      const id = Number(history[2]);
      return isAdmin || actor.id_pengguna === id ? ok([]) : error(403, 'Riwayat ini bukan milik Anda.');
    }
    return next.handle(request);
  }

  private currentDemoUser(): Pengguna | null {
    try {
      const saved = JSON.parse(localStorage.getItem('ecoapp_user') || 'null') as Pengguna | null;
      const account = DEMO_ACCOUNTS.find(item => item.id_pengguna === saved?.id_pengguna);
      if (!account || localStorage.getItem('ecoapp_token') !== `demo-${account.id_pengguna}`) return null;
      try {
        const saved = JSON.parse(localStorage.getItem(`ecoapp_demo_profile_${account.id_pengguna}`) || 'null');
        return saved ? {
          ...account,
          nama: typeof saved.nama === 'string' && saved.nama.trim() ? saved.nama : account.nama,
          no_hp: typeof saved.no_hp === 'string' ? saved.no_hp : null,
          alamat: typeof saved.alamat === 'string' ? saved.alamat : null,
          nama_usaha: typeof saved.nama_usaha === 'string' ? saved.nama_usaha : null,
        } : account;
      } catch { return account; }
    } catch { return null; }
  }
}
