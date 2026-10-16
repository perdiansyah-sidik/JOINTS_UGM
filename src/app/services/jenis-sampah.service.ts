import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface JenisSampah {
  id_jenis_sampah: number;
  nama_jenis: string;
  ketentuan: string;
  poin_per_kg: number;
  estimasi_hemat_co2_per_kg?: number;
  aktif?: number; // 1 = aktif, 0 = nonaktif
}

const STORAGE_KEY = 'ecoapp_m_jenis_sampah';

@Injectable({ providedIn: 'root' })
export class JenisSampahService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/jenis-sampah`;

  private opsi() {
    let token = localStorage.getItem('token');
    if (!token) {
      try {
        const user = JSON.parse(localStorage.getItem('ecoapp_user') || 'null');
        token = user?.token || user?.access_token || null;
      } catch {
        token = null;
      }
    }
    return {
      headers: token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders(),
    };
  }

  getSavedLokal(): JenisSampah[] {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      } catch {}
    }
    const defaultData: JenisSampah[] = [
      {
        id_jenis_sampah: 1,
        nama_jenis: 'Botol Plastik PET',
        ketentuan: 'Bersih, dikosongkan, diremukkan untuk menghemat ruang.',
        poin_per_kg: 2500,
        estimasi_hemat_co2_per_kg: 1.5,
        aktif: 1
      },
      {
        id_jenis_sampah: 2,
        nama_jenis: 'Kardus Bekas',
        ketentuan: 'Kering, dilipat rapi, tidak tercampur minyak atau air.',
        poin_per_kg: 1500,
        estimasi_hemat_co2_per_kg: 2.0,
        aktif: 1
      },
      {
        id_jenis_sampah: 3,
        nama_jenis: 'Minyak Jelantah',
        ketentuan: 'Disaring bersih dari sisa makanan, tidak dicampur air.',
        poin_per_kg: 4000,
        estimasi_hemat_co2_per_kg: 3.5,
        aktif: 1
      },
      {
        id_jenis_sampah: 4,
        nama_jenis: 'Kaca & Botol Beling',
        ketentuan: 'Utuh atau pecahan terbungkus kardus/koran dengan aman.',
        poin_per_kg: 800,
        estimasi_hemat_co2_per_kg: 0.8,
        aktif: 1
      },
      {
        id_jenis_sampah: 5,
        nama_jenis: 'Kaleng & Logam',
        ketentuan: 'Bebas dari sisa zat kimia berbahaya, dikeringkan.',
        poin_per_kg: 3500,
        estimasi_hemat_co2_per_kg: 4.2,
        aktif: 1
      }
    ];
    this.simpanLokal(defaultData);
    return defaultData;
  }

  private fallbackData(): JenisSampah[] {
    return this.getSavedLokal();
  }

  private simpanLokal(data: JenisSampah[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }

  daftar(): Observable<JenisSampah[]> {
    if (!environment.demoMode) return this.http.get<{data:JenisSampah[]}>(this.url).pipe(map(r=>r.data));
    return this.http.get<any>(this.url, this.opsi()).pipe(
      map((r) => {
        const raw = Array.isArray(r) ? r : Array.isArray(r?.data) ? r.data : [];
        if (!raw.length) {
          return this.fallbackData();
        }
        const mapped: JenisSampah[] = raw.map((item: any) => ({
          ...item,
          id_jenis_sampah: Number(item.id_jenis_sampah ?? item.id ?? 0),
          nama_jenis: item.nama_jenis ?? item.nama ?? '',
          ketentuan: item.ketentuan ?? item.deskripsi ?? item.keterangan ?? '',
          poin_per_kg: Number(item.poin_per_kg ?? item.poin ?? item.tarif_poin ?? 0),
          estimasi_hemat_co2_per_kg: Number(item.estimasi_hemat_co2_per_kg ?? 0),
          aktif: item.aktif !== undefined ? Number(item.aktif) : 1,
        }));

        // Gabungkan dengan item lokal yang ditambahkan agar tidak tertimpa/hilang
        const localSaved = this.getSavedLokal();
        const merged = [...mapped];
        for (const localItem of localSaved) {
          const adaDiServer = merged.some(m => 
            m.id_jenis_sampah === localItem.id_jenis_sampah || 
            m.nama_jenis.trim().toLowerCase() === localItem.nama_jenis.trim().toLowerCase()
          );
          if (!adaDiServer) {
            merged.push(localItem);
          }
        }
        this.simpanLokal(merged);
        return merged;
      }),
      catchError(() => of(this.fallbackData()))
    );
  }

  tambah(body: { 
    nama_jenis: string; 
    ketentuan: string; 
    poin_per_kg: number; 
    estimasi_hemat_co2_per_kg?: number 
  }): Observable<any> {
    if (!environment.demoMode) return this.http.post<any>(this.url, {nama_jenis:body.nama_jenis,ketentuan:body.ketentuan,poin_per_kg:body.poin_per_kg});
    // Siapkan item baru
    const list = this.getSavedLokal();
    const maxId = list.reduce((m, x) => Math.max(m, x.id_jenis_sampah || 0), 0);
    const itemBaru: JenisSampah = {
      id_jenis_sampah: maxId + 1,
      nama_jenis: body.nama_jenis,
      ketentuan: body.ketentuan,
      poin_per_kg: Number(body.poin_per_kg),
      estimasi_hemat_co2_per_kg: Number(body.estimasi_hemat_co2_per_kg || 0),
      aktif: 1
    };

    return this.http.post<any>(this.url, body, this.opsi()).pipe(
      map((res: any) => {
        const idServer = res?.data?.id_jenis_sampah ?? res?.id_jenis_sampah ?? res?.id;
        if (idServer) {
          itemBaru.id_jenis_sampah = Number(idServer);
        }
        list.unshift(itemBaru);
        this.simpanLokal(list);
        return { status: 'success', data: itemBaru };
      }),
      catchError(() => {
        list.unshift(itemBaru);
        this.simpanLokal(list);
        return of({ status: 'success', data: itemBaru, isLocal: true });
      })
    );
  }

  ubah(id: number, body: { 
    nama_jenis?: string; 
    ketentuan: string; 
    poin_per_kg: number; 
    estimasi_hemat_co2_per_kg?: number 
  }): Observable<any> {
    if (!environment.demoMode) return this.http.put<any>(`${this.url}/${id}`, {nama_jenis:body.nama_jenis,ketentuan:body.ketentuan,poin_per_kg:body.poin_per_kg});
    const simpanLokalUbah = () => {
      const list = this.getSavedLokal();
      const idx = list.findIndex(x => x.id_jenis_sampah === id);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          nama_jenis: body.nama_jenis || list[idx].nama_jenis,
          ketentuan: body.ketentuan || list[idx].ketentuan,
          poin_per_kg: Number(body.poin_per_kg),
          estimasi_hemat_co2_per_kg: Number(body.estimasi_hemat_co2_per_kg ?? list[idx].estimasi_hemat_co2_per_kg ?? 0)
        };
        this.simpanLokal(list);
      }
    };

    return this.http.put(`${this.url}/${id}`, body, this.opsi()).pipe(
      map((res) => {
        simpanLokalUbah();
        return res;
      }),
      catchError(() => {
        simpanLokalUbah();
        return of({ status: 'success', message: 'Perubahan disimpan di lokal' });
      })
    );
  }

  setAktif(id: number, aktif: 0 | 1): Observable<any> {
    if (!environment.demoMode) return this.http.patch<any>(`${this.url}/${id}/status`,{aktif});
    const updateLokalStatus = () => {
      const list = this.getSavedLokal();
      const item = list.find(x => x.id_jenis_sampah === id);
      if (item) {
        item.aktif = aktif;
        this.simpanLokal(list);
      }
    };

    return this.http.patch(`${this.url}/${id}/status`, { aktif }, this.opsi()).pipe(
      map((res) => {
        updateLokalStatus();
        return res;
      }),
      catchError(() => {
        updateLokalStatus();
        return of({ status: 'success', message: 'Status diperbarui di lokal' });
      })
    );
  }

  hapus(id: number): Observable<any> {
    if (!environment.demoMode) return this.http.delete<any>(`${this.url}/${id}`);
    const hapusLokal = () => {
      let list = this.getSavedLokal();
      list = list.filter(x => x.id_jenis_sampah !== id);
      this.simpanLokal(list);
    };

    return this.http.delete(`${this.url}/${id}`, this.opsi()).pipe(
      map((res) => {
        hapusLokal();
        return res;
      }),
      catchError(() => {
        hapusLokal();
        return of({ status: 'success', message: 'Dihapus dari daftar lokal' });
      })
    );
  }
}