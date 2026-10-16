import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, timeout } from 'rxjs';
import { NavController, ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Pengguna } from '../models/pengguna.model';
@Component({ selector: 'app-profil', templateUrl: './profil.page.html', styleUrls: ['./profil.page.scss'], standalone: false })
export class ProfilPage {
  readonly demoMode = environment.demoMode;
  private http = inject(HttpClient); private nav = inject(NavController); private toast = inject(ToastController);
  pengguna: Pengguna | null = null; sedangEdit = false; busy = false; memuat = true; pesanError = ''; fotoProfil = '';
  draft = { nama: '', email: '', no_hp: '', alamat: '', nama_usaha: '', password_lama: '', password_baru: '' };
  async ionViewWillEnter() {
    this.memuat = true;
    this.pesanError = '';
    try {
      const sesi = JSON.parse(localStorage.getItem('ecoapp_user') || 'null') as Pengguna | null;
      this.pengguna = sesi;
      if (!this.pengguna || !localStorage.getItem('ecoapp_token')) {
        this.pesanError = 'Sesi tidak ditemukan. Silakan masuk kembali.';
        this.nav.navigateRoot('/login');
        return;
      }
      if (this.demoMode) {
        const tersimpan = localStorage.getItem(`ecoapp_demo_profile_${this.pengguna.id_pengguna}`);
        if (tersimpan) this.pengguna = JSON.parse(tersimpan) as Pengguna;
      } else {
        const r: any = await firstValueFrom(this.http.get(`${environment.apiUrl}/profil`).pipe(timeout({ first: 8000 })));
        if (!r?.data || typeof r.data !== 'object') throw new Error('Respons profil tidak valid.');
        this.pengguna = r.data as Pengguna;
        localStorage.setItem('ecoapp_user', JSON.stringify(this.pengguna));
      }
      this.fotoProfil = this.pengguna?.foto_profil || '';
    } catch (e: any) {
      this.pesanError = e.name === 'TimeoutError'
        ? 'Server terlalu lama merespons. Profil lokal tetap ditampilkan; pastikan backend berjalan.'
        : e.error?.message || e.message || 'Profil gagal dimuat. Coba kembali.';
      // Keep the last locally cached profile visible when the API is temporarily unavailable.
      this.pengguna = this.pengguna || this.bacaProfilLokal();
      this.fotoProfil = this.pengguna?.foto_profil || '';
    } finally { this.memuat = false; }
  }
  private bacaProfilLokal(): Pengguna | null {
    try { return JSON.parse(localStorage.getItem('ecoapp_user') || 'null') as Pengguna | null; } catch { return null; }
  }
  async muatUlang() { await this.ionViewWillEnter(); }
  keLogin() { this.nav.navigateRoot('/login'); }
  get peran() { return ({1:'Pelanggan Rumah Tangga',2:'Pelanggan UMKM',3:'Pelanggan Pasar',4:'Pengelola',5:'Mitra'} as Record<number,string>)[this.pengguna?.peran || 0]; }
  kembali() { this.nav.navigateRoot(this.pengguna?.peran === 4 ? '/dashboard-pengelola' : this.pengguna?.peran === 5 ? '/dashboard-mitra' : '/dashboard'); }
  mulaiEdit() {
    if (!this.pengguna || this.busy) return;
    this.draft = { nama: this.pengguna.nama, email: this.pengguna.email, no_hp: this.pengguna.no_hp || '', alamat: this.pengguna.alamat || '', nama_usaha: this.pengguna.nama_usaha || '', password_lama: '', password_baru: '' }; this.sedangEdit = true;
  }
  async simpanEdit() {
    if (this.busy || !this.pengguna) return;
    if (!this.draft.nama.trim() || (this.pengguna.peran <= 3 && !this.draft.alamat.trim())) { this.pesan('Nama dan alamat pelanggan wajib diisi.'); return; }
    const emailBerubah = this.draft.email.trim().toLowerCase() !== this.pengguna.email.toLowerCase();
    const kredensialBerubah = emailBerubah || !!this.draft.password_baru;
    if (kredensialBerubah && !this.draft.password_lama) { this.pesan('Masukkan password saat ini untuk mengubah email atau password.'); return; }
    if (this.draft.password_baru && (this.draft.password_baru.length < 8 || this.draft.password_baru.length > 128 || !this.draft.password_baru.trim())) {
      this.pesan('Password baru harus 8–128 karakter dan tidak boleh hanya spasi.'); return;
    }
    if (this.demoMode && kredensialBerubah) { this.pesan('Perubahan password hanya tersedia saat aplikasi berjalan dalam mode live.'); return; }
    const {password_baru, password_lama, ...data} = this.draft;
    await this.simpan({ ...data, ...(password_baru ? {password_baru} : {}), ...(password_lama ? {password_lama} : {}) });
  }
  private async simpan(data: any) {
    this.busy = true;
    try {
      if (this.demoMode) {
        if (data.password_baru || data.email && data.email !== this.pengguna?.email) throw new Error('Perubahan kredensial hanya tersedia dalam mode Supabase.');
        const {password_lama, password_baru, ...profile} = data; this.pengguna = {...this.pengguna, ...profile};
        localStorage.setItem(`ecoapp_demo_profile_${this.pengguna?.id_pengguna}`, JSON.stringify(this.pengguna));
      } else {
        const r: any = await firstValueFrom(this.http.put(`${environment.apiUrl}/profil`, data).pipe(timeout({ first: 20000 })));
        this.pengguna = r.data; localStorage.setItem('ecoapp_token', r.token);
      }
      localStorage.setItem('ecoapp_user', JSON.stringify(this.pengguna)); this.fotoProfil = this.pengguna?.foto_profil || ''; this.sedangEdit = false;
      this.draft.password_lama = this.draft.password_baru = ''; this.pesan(this.demoMode ? 'Profil demo disimpan di browser.' : 'Profil tersimpan di Supabase.');
    } catch(e: any) {
      this.pesan(e.name === 'TimeoutError'
        ? 'Server terlalu lama merespons. Pastikan backend berjalan lalu coba lagi.'
        : e.error?.message || e.message || 'Gagal menyimpan profil.');
    } finally { this.busy = false; }
  }
  pilihFoto(event: Event) {
    const input = event.target as HTMLInputElement, file = input.files?.[0]; if (!file || this.busy) return;
    if (!['image/jpeg','image/png','image/webp'].includes(file.type) || file.size > 1048576) { this.pesan('Foto JPG, PNG, atau WebP maksimal 1 MB.'); return; }
    const reader = new FileReader(); reader.onload = () => { void this.simpan({foto_profil: reader.result}); input.value = ''; };
    reader.onerror = () => this.pesan('Foto gagal dibaca.'); reader.readAsDataURL(file);
  }
  hapusFoto() { if (!this.busy) void this.simpan({foto_profil:null}); }
  async pesan(message: string) { const t = await this.toast.create({message, duration:3500, position:'top'}); await t.present(); }
  async keluar() {
    if (this.busy) return; this.busy = true;
    try { if (!this.demoMode) await firstValueFrom(this.http.post(`${environment.apiUrl}/auth/logout`, {})); this.clearSession(); }
    catch(e: any) { if (e.status === 401) this.clearSession(); else this.pesan('Server belum dapat mengakhiri sesi. Coba lagi.'); } finally { this.busy = false; }
  }
  private clearSession() { localStorage.removeItem('ecoapp_token'); localStorage.removeItem('ecoapp_user'); this.nav.navigateRoot('/login'); }
}
