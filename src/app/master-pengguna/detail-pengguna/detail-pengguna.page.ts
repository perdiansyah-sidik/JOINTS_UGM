import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { finalize, timeout } from 'rxjs';
import { LABEL_PERAN, MitraRingkas, Pengguna } from '../../models/pengguna.model';
import { MasterPenggunaService } from '../../services/master-pengguna.service';
import { idValid, pesanApi } from '../pengguna-validation';

@Component({
  selector: 'app-detail-pengguna',
  templateUrl: './detail-pengguna.page.html',
  styleUrls: ['./detail-pengguna.page.scss'],
  standalone: false,
})
export class DetailPenggunaPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(MasterPenggunaService);
  private readonly nav = inject(NavController);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly labelPeran = LABEL_PERAN;
  pengguna: Pengguna | null = null;
  namaMitra = '';
  sedangMuat = true;
  pesanError = '';

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!idValid(id)) { this.pesanError = 'ID akun tidak valid.'; this.sedangMuat = false; return; }
    this.api.getDetailPengguna(id).pipe(timeout(15000), finalize(() => {
      this.sedangMuat = false;
      this.cdr.markForCheck();
    })).subscribe({
      next: res => {
        const data = res?.data;
        if (!data || data.id_pengguna !== id || ![1,2,3,4,5].includes(data.peran) ||
          typeof data.nama !== 'string' || typeof data.email !== 'string' ||
          ![0,1].includes(data.aktif) || ![0,1].includes(data.is_deleted)) {
          this.pesanError = 'Data akun dari server belum sesuai.';
          return;
        }
        this.pengguna = data;
        if (data.peran === 5) this.muatNamaMitra(data.id_mitra);
      },
      error: err => { this.pesanError = pesanApi(err); },
    });
  }

  private muatNamaMitra(id: number | null) {
    if (!idValid(id)) return;
    this.api.getListMitraRingkas().pipe(timeout(15000)).subscribe({
      next: res => {
        const mitra: MitraRingkas | undefined = res?.data?.find(m => m.id_mitra === id);
        this.namaMitra = mitra?.nama_mitra || `Organisasi #${id}`;
        this.cdr.markForCheck();
      },
      error: () => { this.namaMitra = `Organisasi #${id}`; this.cdr.markForCheck(); },
    });
  }

  kembali() { void this.nav.navigateBack('/master-pengguna'); }
  ubah() {
    if (this.pengguna?.is_deleted === 0) {
      void this.nav.navigateForward(`/master-pengguna/form/ubah?id=${this.pengguna.id_pengguna}`);
    }
  }
}
