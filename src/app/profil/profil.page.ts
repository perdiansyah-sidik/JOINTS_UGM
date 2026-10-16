import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NavController, ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Pengguna } from '../models/pengguna.model';
@Component({ selector: 'app-profil', templateUrl: './profil.page.html', styleUrls: ['./profil.page.scss'], standalone: false })
export class ProfilPage {
  readonly demoMode = environment.demoMode;
  private http = inject(HttpClient); private nav = inject(NavController); private toast = inject(ToastController);
  pengguna: Pengguna | null = null; sedangEdit = false; busy = false; fotoProfil = '';
  draft = { nama: '', email: '', no_hp: '', alamat: '', nama_usaha: '', password_lama: '', password_baru: '' };
  async ionViewWillEnter() {
    try {
      this.pengguna = JSON.parse(localStorage.getItem('ecoapp_user') || 'null');
      if (!this.pengguna || !localStorage.getItem('ecoapp_token')) { this.nav.navigateRoot('/login'); return; }
      if (!this.demoMode) { const r: any = await firstValueFrom(this.http.get(`${environment.apiUrl}/profil`)); this.pengguna = r.data; }
      this.fotoProfil = this.pengguna?.foto_profil || '';
    } catch (e: any) { this.pesan(e.error?.message || 'Profil gagal dimuat. Coba kembali.'); }
  }
  get peran() { return ({1:'Pelanggan Rumah Tangga',2:'Pelanggan UMKM',3:'Pelanggan Pasar',4:'Pengelola',5:'Mitra'} as Record<number,string>)[this.pengguna?.peran || 0]; }
  kembali() { this.nav.navigateRoot(this.pengguna?.peran === 4 ? '/dashboard-pengelola' : this.pengguna?.peran === 5 ? '/dashboard-mitra' : '/dashboard'); }
  mulaiEdit() {
    if (!this.pengguna || this.busy) return;
    this.draft = { nama: this.pengguna.nama, email: this.pengguna.email, no_hp: this.pengguna.no_hp || '', alamat: this.pengguna.alamat || '', nama_usaha: this.pengguna.nama_usaha || '', password_lama: '', password_baru: '' }; this.sedangEdit = true;
  }
  async simpanEdit() {
    if (this.busy || !this.pengguna) return;
    if (!this.draft.nama.trim() || (this.pengguna.peran <= 3 && !this.draft.alamat.trim())) { this.pesan('Nama dan alamat pelanggan wajib diisi.'); return; }
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
        const r: any = await firstValueFrom(this.http.put(`${environment.apiUrl}/profil`, data)); this.pengguna = r.data; localStorage.setItem('ecoapp_token', r.token);
      }
      localStorage.setItem('ecoapp_user', JSON.stringify(this.pengguna)); this.fotoProfil = this.pengguna?.foto_profil || ''; this.sedangEdit = false;
      this.draft.password_lama = this.draft.password_baru = ''; this.pesan(this.demoMode ? 'Profil demo disimpan di browser.' : 'Profil tersimpan di Supabase.');
    } catch(e: any) { this.pesan(e.error?.message || e.message || 'Gagal menyimpan profil.'); } finally { this.busy = false; }
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
