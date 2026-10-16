import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {
  BuatPetugasMitraPayload,
  MitraRingkas,
  Pengguna,
  UbahPenggunaPayload,
} from '../models/pengguna.model';

@Injectable({ providedIn: 'root' })
export class MasterPenggunaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  getListPengguna(): Observable<{ status: string; data: Pengguna[] }> {
    return this.http.get<{ status: string; data: Pengguna[] }>(`${this.baseUrl}/pengguna`);
  }

  getDetailPengguna(idPengguna: number): Observable<{ status: string; data: Pengguna }> {
    return this.http.get<{ status: string; data: Pengguna }>(`${this.baseUrl}/pengguna/${idPengguna}`);
  }

  // Khusus pengelola. API wajib menolak permintaan dengan peran selain 5
  // dari endpoint ini (registrasi publik tidak boleh membuat PENGELOLA/MITRA).
  buatAkunPetugasMitra(payload: BuatPetugasMitraPayload): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/pengguna/petugas-mitra`, payload);
  }

  ubahPengguna(idPengguna: number, payload: UbahPenggunaPayload): Observable<unknown> {
    return this.http.put(`${this.baseUrl}/pengguna/${idPengguna}`, payload);
  }

  // Nonaktif sementara: aktif=0, is_deleted tetap 0. Kontrak ini harus disepakati API.
  nonaktifkanPengguna(idPengguna: number): Observable<unknown> {
    return this.http.patch(`${this.baseUrl}/pengguna/${idPengguna}/nonaktifkan`, {});
  }

  aktifkanPengguna(idPengguna: number): Observable<unknown> {
    return this.http.patch(`${this.baseUrl}/pengguna/${idPengguna}/aktifkan`, {});
  }

  // Dipakai untuk dropdown pilih organisasi mitra saat membuat akun petugas.
  getListMitraRingkas(): Observable<{ status: string; data: MitraRingkas[] }> {
    return this.http.get<{ status: string; data: MitraRingkas[] }>(`${this.baseUrl}/mitra/ringkas`);
  }

}
