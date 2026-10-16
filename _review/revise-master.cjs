const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve('_review/master-pengguna-update/src/app');
function edit(file, fn) { const p = path.join(root,file); fs.writeFileSync(p, fn(fs.readFileSync(p,'utf8')), 'utf8'); }
edit('services/api.service.ts', s => {
  const start = s.indexOf('  getListPengguna(');
  const end = s.indexOf('  // ==========================================\n  // 2.', start);
  const normalized = s.replace(/\r\n/g,'\n');
  const methods = normalized.slice(normalized.indexOf('  getListPengguna('),normalized.indexOf('  // ==========================================\n  // 2.'));
  fs.writeFileSync(path.join(root,'services/master-pengguna.service.ts'), normalized.slice(0,normalized.indexOf('@Injectable')) +
    `@Injectable({ providedIn: 'root' })\nexport class MasterPenggunaService {\n  private readonly http = inject(HttpClient);\n  private readonly baseUrl = environment.apiUrl;\n` +
    methods.replace('Soft delete: set aktif=0 & is_deleted=1 di server. Tidak menghapus baris fisik.', 'Nonaktif sementara: aktif=0, is_deleted tetap 0. Kontrak ini harus disepakati API.').replace(/Observable<any>/g,'Observable<unknown>')+'}\n');
  return s;
});
// Hanya menghapus dua salinan pengganti file bersama dari paket review, bukan file repo tim.
fs.unlinkSync(path.join(root,'services/api.service.ts'));
fs.unlinkSync(path.join(root,'app-routing.module.ts'));
edit('models/pengguna.model.ts', s => s.replace(/export const PERAN_DAPAT_DIBUAT_PENGELOLA[^\n]*\n/,''));
edit('master-pengguna/form-pengguna/form-pengguna.page.ts', s => {
  s = s.replace(/\r\n/g,'\n').replace('Component, OnInit, inject','ChangeDetectorRef, Component, OnInit, inject')
    .replace('AlertController, LoadingController, NavController','NavController')
    .replace("import { ApiService } from '../../services/api.service';", "import { MasterPenggunaService } from '../../services/master-pengguna.service';\nimport { finalize, timeout } from 'rxjs';\nimport { idValid, Kolom, normalisasiHp, payloadUbah, pesanApi, validasiPengguna } from '../pengguna-validation';")
    .replace('inject(ApiService)','inject(MasterPenggunaService)')
    .replace('  private readonly loadingCtrl = inject(LoadingController);\n  private readonly alertCtrl = inject(AlertController);', `  private readonly cdr = inject(ChangeDetectorRef);
  sedangMuatMitra = false;
  errorMitra = '';
  sudahSubmit = false;
  private disentuh = new Set<Kolom>();

  sentuh(kolom: Kolom) { this.disentuh.add(kolom); }
  errorKolom(kolom: Kolom): string {
    if (!this.sudahSubmit && !this.disentuh.has(kolom)) return '';
    return validasiPengguna(this.isTambah ? this.formTambah : this.formUbah,
      this.isTambah ? null : this.penggunaAsli, this.daftarMitra)[kolom] ?? '';
  }
  get blokSimpan(): boolean {
    return this.sedangMuat || this.sedangSimpan || !!this.pesanError ||
      (!this.isTambah && !this.penggunaAsli) ||
      ((this.isTambah || (this.butuhPilihMitra && !this.kuncOrganisasiDanPeran)) &&
        (this.sedangMuatMitra || !!this.errorMitra || this.daftarMitra.length === 0));
  }`)
    .replace('return !!this.penggunaAsli?.terkunci_transaksi;', 'return this.penggunaAsli?.terkunci_transaksi !== false;')
    .replace("    this.mode = modeParam === 'ubah' ? 'ubah' : 'tambah';", `    if (modeParam !== 'tambah' && modeParam !== 'ubah') {
      this.pesanError = 'Alamat halaman tidak valid. Kembali ke daftar pengguna.';
      return;
    }
    this.mode = modeParam;`)
    .replace('if (!this.idPengguna)', 'if (!idValid(this.idPengguna))');
  const a = s.indexOf('  private muatDaftarMitra()');
  const b = s.indexOf('  private muatDetail(',a);
  s = s.slice(0,a)+`  muatDaftarMitra() {
    if (this.sedangMuatMitra) return;
    this.sedangMuatMitra = true;
    this.errorMitra = '';
    this.api.getListMitraRingkas().pipe(timeout(15000), finalize(() => {
      this.sedangMuatMitra = false;
      this.cdr.markForCheck();
    })).subscribe({
      next: res => {
        if (!Array.isArray(res?.data) || !res.data.every(m => idValid(m.id_mitra) && typeof m.nama_mitra === 'string')) {
          this.errorMitra = 'Data organisasi dari server belum sesuai.';
          return;
        }
        this.daftarMitra = res.data;
      },
      error: () => { this.errorMitra = 'Daftar organisasi belum dapat dimuat.'; },
    });
  }

`+s.slice(b);
  s = s.replace('this.api.getDetailPengguna(id).subscribe({', `this.api.getDetailPengguna(id).pipe(timeout(15000), finalize(() => {
      this.sedangMuat = false;
      this.cdr.markForCheck();
    })).subscribe({`)
    .replace('if (!pengguna) {', `if (!pengguna || pengguna.id_pengguna !== id || ![1,2,3,4,5].includes(pengguna.peran) ||
          typeof pengguna.nama !== 'string' || typeof pengguna.email !== 'string' ||
          ![0,1].includes(pengguna.aktif) || pengguna.is_deleted !== 0) {`)
    .replace("this.pesanError = 'Akun tidak ditemukan.';", "this.pesanError = 'Akun tidak tersedia atau format data server belum sesuai.';")
    .replace('  batal() {\n', '  batal() {\n    if (this.sedangSimpan) return;\n');
  const start = s.indexOf('  async simpanTambah()');
  const end = s.indexOf('  private async tampilToast(',start);
  s = s.slice(0,start)+`  simpanTambah() {
    if (this.blokSimpan) return;
    this.sudahSubmit = true;
    if (Object.keys(validasiPengguna(this.formTambah, null, this.daftarMitra)).length) return;
    if (!idValid(this.formTambah.id_mitra)) return;
    this.sedangSimpan = true;
    this.api.buatAkunPetugasMitra({
      nama: this.formTambah.nama.trim(),
      email: this.formTambah.email.trim().toLowerCase(),
      password: this.formTambah.password,
      no_hp: normalisasiHp(this.formTambah.no_hp) || undefined,
      id_mitra: this.formTambah.id_mitra,
    }).pipe(timeout(20000), finalize(() => {
      this.sedangSimpan = false;
      this.cdr.markForCheck();
    })).subscribe({
      next: () => {
        this.formTambah.password = '';
        void this.tampilToast('Akun petugas berhasil dibuat.', 'success');
        void this.navCtrl.navigateBack('/master-pengguna');
      },
      error: err => { void this.tampilToast(pesanApi(err), 'danger'); },
    });
  }

  simpanUbah() {
    if (this.blokSimpan || !idValid(this.idPengguna) || !this.penggunaAsli) return;
    this.sudahSubmit = true;
    if (Object.keys(validasiPengguna(this.formUbah, this.penggunaAsli, this.daftarMitra)).length) return;
    this.sedangSimpan = true;
    this.api.ubahPengguna(this.idPengguna, payloadUbah(this.formUbah, this.penggunaAsli))
      .pipe(timeout(20000), finalize(() => {
        this.sedangSimpan = false;
        this.cdr.markForCheck();
      })).subscribe({
        next: () => {
          void this.tampilToast('Profil akun berhasil diperbarui.', 'success');
          void this.navCtrl.navigateBack('/master-pengguna');
        },
        error: err => { void this.tampilToast(pesanApi(err), 'danger'); },
      });
  }

`+s.slice(end);
  return s;
});
edit('master-pengguna/form-pengguna/form-pengguna.page.html', s => {
  s=s.replace(/\r\n/g,'\n').replace('pesanError && !penggunaAsli && !isTambah','pesanError')
    .replace('minimal 6 karakter','8–128 karakter')
    .replace('Peran &amp; organisasi akun ini terkunci karena sudah dirujuk transaksi.', 'Organisasi hanya bisa diubah jika server memastikan akun belum dirujuk transaksi. Peran tidak diubah dari menu ini.')
    .replace(/\n          <button type="button" class="fp-btn-danger"[\s\S]*?<\/button>/,'')
    .replace(/class="fp-btn-submit" \[disabled\]="sedangSimpan"/g,'class="fp-btn-submit" [disabled]="blokSimpan"')
    .replace('<div class="fp-container">', `<div class="fp-container">
    @if (butuhPilihMitra) {
      @if (sedangMuatMitra) { <p role="status">Memuat organisasi...</p> }
      @else if (errorMitra) {
        <p role="alert">{{ errorMitra }}</p>
        <ion-button fill="outline" (click)="muatDaftarMitra()">Coba lagi</ion-button>
      } @else if (daftarMitra.length === 0 && !kuncOrganisasiDanPeran || isTambah && !sedangMuatMitra && !errorMitra && daftarMitra.length === 0) {
        <p role="status">Belum ada organisasi yang dapat dipilih. Hubungi pengelola mitra.</p>
      }
    }`);
  s=s.replace(/<div class="fp-group">\s*<label>Nama Usaha([\s\S]*?)<\/div>\s*<\/div>/, '@if (penggunaAsli.peran === 2 || penggunaAsli.peran === 3) {\n<div class="fp-group"><label>Nama Usaha$1</div></div>\n}');
  const max={nama:100,email:150,no_hp:20,password:128,alamat:255,nama_usaha:150};
  // Each control receives its label, inline error and keyboard-friendly metadata.
  s=s.replace(/<div class="fp-group">([\s\S]*?)(<input[\s\S]*?\/>|<select[\s\S]*?<\/select>)([\s\S]*?)<\/div>\s*<\/div>/g,(whole,before,control,after)=>{
    const match=control.match(/\[\(ngModel\)\]="(formTambah|formUbah)\.(\w+)"/);
    if(!match) return whole;
    const [,mode,field]=match, id=mode+'-'+field;
    before=before.replace('<label>',`<label for="${id}">`);
    control=control.replace(/<(input|select)/,`<$1 id="${id}" name="${field}" (blur)="sentuh('${field}')" [attr.aria-invalid]="!!errorKolom('${field}')" aria-describedby="${id}-error"`);
    if(max[field]) control=control.replace('<input',`<input maxlength="${max[field]}"`);
    if(field==='email') control=control.replace('<input','<input autocomplete="email" autocapitalize="none"');
    if(field==='password') control=control.replace('<input','<input autocomplete="new-password"');
    if(field==='no_hp') control=control.replace('<input','<input autocomplete="tel"');
    return `<div class="fp-group">${before}${control}${after}</div>\n<p id="${id}-error" class="fp-error" aria-live="polite">{{ errorKolom('${field}') }}</p>\n</div>`;
  });
  s=s.replace(/<ion-icon class="fp-suffix"([\s\S]*?)\(click\)="tampilkanSandi = !tampilkanSandi"><\/ion-icon>/,
    `<button type="button" class="fp-eye" [attr.aria-label]="tampilkanSandi ? 'Sembunyikan password' : 'Tampilkan password'" [attr.aria-pressed]="tampilkanSandi" (click)="tampilkanSandi = !tampilkanSandi"><ion-icon class="fp-suffix"$1></ion-icon></button>`);
  return s;
});
edit('master-pengguna/form-pengguna/form-pengguna.page.scss', s => s.replace(/\.fp-btn-danger \{[\s\S]*$/,'') + `\n.fp-error { margin: 4px 0 0; color: #b91c1c; font-size: 12px; }
.fp-error:empty { display: none; }
.fp-eye { background: transparent; min-width: 44px; min-height: 44px; }
.fp-input:focus-within { border-color: #16813e; outline: 2px solid #16813e; }
`);
edit('master-pengguna/master-pengguna.page.ts', s => {
  return s.replace(/\r\n/g,'\n').replace('Component, OnInit, inject','ChangeDetectorRef, Component, inject')
    .replace("import { ApiService } from '../services/api.service';", "import { MasterPenggunaService } from '../services/master-pengguna.service';\nimport { finalize, timeout } from 'rxjs';\nimport { idValid, pesanApi } from './pengguna-validation';")
    .replace(' implements OnInit','').replace('inject(ApiService)','inject(MasterPenggunaService)')
    .replace('  readonly labelPeran', '  private readonly cdr = inject(ChangeDetectorRef);\n  sedangUbahStatus = false;\n\n  readonly labelPeran')
    .replace(/  ngOnInit\(\) \{[\s\S]*?\n  \}\n\n/,'')
    .replace('muatDaftar(event?: any)', 'muatDaftar(event?: { target: { complete(): Promise<void> } })')
    .replace('    this.sedangMuat = true;', '    if (this.sedangMuat) { void event?.target.complete(); return; }\n    this.sedangMuat = true;')
    .replace('this.api.getListPengguna().subscribe({', `this.api.getListPengguna().pipe(timeout(15000), finalize(() => this.cdr.markForCheck())).subscribe({`)
    .replace('        this.daftarPengguna = res?.data ?? [];', `        if (!Array.isArray(res?.data) || !res.data.every(p => idValid(p.id_pengguna) && typeof p.nama === 'string' && typeof p.email === 'string' && [1,2,3,4,5].includes(p.peran) && [0,1].includes(p.aktif) && [0,1].includes(p.is_deleted))) {
          this.pesanError = 'Format daftar akun dari server belum sesuai kontrak Pilahin.';
          this.sedangMuat = false;
          void event?.target.complete();
          return;
        }
        this.daftarPengguna = res.data.filter(p => p.is_deleted === 0);`)
    .replace("ubahFilterPeran(nilai: 'SEMUA' | NilaiPeran) {\n    this.filterPeran = nilai;", `ubahFilterPeran(nilai: string | number | undefined) {
    const angka = Number(nilai);
    this.filterPeran = [1,2,3,4,5].includes(angka) ? angka as NilaiPeran : 'SEMUA';`)
    .replace('    const alert = await this.alertCtrl.create({', '    if (this.sedangUbahStatus || pengguna.is_deleted !== 0) return;\n    const alert = await this.alertCtrl.create({')
    .replace('`Akun "${pengguna.nama}" tidak akan bisa login setelah dinonaktifkan. Riwayat transaksinya tetap tersimpan.`', "'Akun ini tidak akan bisa login setelah dinonaktifkan. Riwayat transaksi tetap tersimpan.'")
    .replace('`Akun "${pengguna.nama}" akan bisa login kembali.`', "'Akun ini akan bisa login kembali.'")
    .replace('  private prosesTogelAktif(pengguna: Pengguna) {', '  private prosesTogelAktif(pengguna: Pengguna) {\n    if (this.sedangUbahStatus || pengguna.is_deleted !== 0) return;\n    this.sedangUbahStatus = true;')
    .replace('    aksi.subscribe({', '    aksi.pipe(timeout(20000), finalize(() => { this.sedangUbahStatus = false; this.cdr.markForCheck(); })).subscribe({')
    .replace("err?.error?.message || 'Gagal mengubah status akun. Silakan coba lagi.'", 'pesanApi(err)');
});
edit('master-pengguna/master-pengguna.page.html', s => s
  .replace('class="mp-toggle-btn"', 'class="mp-toggle-btn" [disabled]="sedangUbahStatus"')
  .replace(`[name]="pengguna.aktif ? 'toggle-outline' : 'toggle-outline'"`, 'name="toggle-outline"')
  .replace('class="mp-fab"', 'class="mp-fab" aria-label="Tambah petugas mitra"')
  .replace('class="mp-card"', 'class="mp-card" role="button" tabindex="0" (keydown.enter)="bukaUbah(pengguna)"')
  .replace('(click)="konfirmasiNonaktifkan(pengguna); $event.stopPropagation()"', '(keydown.enter)="$event.stopPropagation()" (click)="konfirmasiNonaktifkan(pengguna); $event.stopPropagation()"'));
edit('master-pengguna/master-pengguna-routing.module.ts', s => s
  .replace("import { MasterPenggunaPage }", "import { pengelolaGuard } from './pengelola.guard';\nimport { MasterPenggunaPage }")
  .replace("path: '',", "path: '',\n    canActivate: [pengelolaGuard],")
  .replace("path: 'form/:mode',", "path: 'form/:mode',\n    canActivate: [pengelolaGuard],"));
