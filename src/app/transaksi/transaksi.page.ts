import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
@Component({selector:'app-transaksi',templateUrl:'./transaksi.page.html',styleUrls:['./transaksi.page.scss'],standalone:false})
export class TransaksiPage {
  private http=inject(HttpClient); private route=inject(ActivatedRoute); private nav=inject(NavController);
  payout=this.route.snapshot.data['payout'] === true;
  user:any; rows:any[]=[]; points:any={}; config:any={}; drops:any[]=[]; slots:any[]=[]; users:any[]=[]; materials:any[]=[];
  selected:any=null; busy=false; loading=false; error=''; success=''; creating=false;
  form:any={}; proof=''; note=''; assigned:any=null; details:any[]=[]; confirm=false;
  slotForm:any={mulai_pada:'',selesai_pada:'',kapasitas:null}; funding:any={jumlah_rupiah:null,pihak_terkait:'',keterangan:'',bukti:'',konfirmasi:false};
  fundingKey=crypto.randomUUID();
  get admin(){return this.user?.peran===4;} get partner(){return this.user?.peran===5;}
  get back(){return this.admin?'/dashboard-pengelola':this.partner?'/dashboard-mitra':'/dashboard';}
  get resource(){return this.payout?'pencairan':'setoran';}
  async request(method:string,path:string,body?:any){const r:any=await firstValueFrom(this.http.request(method,environment.apiUrl+path,{body}));return r.data;}
  async ionViewWillEnter(){
    try{this.user=JSON.parse(localStorage.getItem('ecoapp_user')||'null');}catch{}
    if(!this.user || !localStorage.getItem('ecoapp_token')){this.nav.navigateRoot('/login');return;}
    await this.load();
  }
  async load(){
    this.loading=true;this.error='';
    try{
      this.rows=await this.request('GET','/'+this.resource);
      this.config=await this.request('GET','/layanan');
      if(this.payout){this.points=await this.request('GET',this.admin?'/kas/cadangan':'/pencairan/saldo');}
      else{
        [this.drops,this.slots,this.materials]=await Promise.all(['/drop-points','/slot-jemput','/jenis-sampah'].map(p=>this.request('GET',p)));
        if(this.admin)this.users=await this.request('GET','/pengguna');
      }
    }catch(e:any){this.error=e.error?.message||'Data gagal dimuat. Periksa koneksi lalu coba lagi.';}finally{this.loading=false;}
  }
  get customers(){return this.users.filter(u=>u.peran<=3&&u.aktif===1&&!u.is_deleted);}
  get partners(){return this.users.filter(u=>u.peran===5&&u.aktif===1&&!u.is_deleted);}
  start(){this.creating=true;this.selected=null;this.success='';this.form={request_key:crypto.randomUUID(),metode:this.admin?'ANTAR':'JEMPUT',alamat_jemput:this.user?.alamat||'',nama_pemilik_rekening:this.user?.nama||''};}
  async save(){
    const b=this.payout?{request_key:this.form.request_key,jumlah_poin:this.form.jumlah_poin,nama_bank:this.form.nama_bank,nomor_rekening:this.form.nomor_rekening,nama_pemilik_rekening:this.form.nama_pemilik_rekening}:this.admin?{request_key:this.form.request_key,metode:'ANTAR',id_pengguna:this.form.id_pengguna,id_drop_point:this.form.id_drop_point}:this.form;
    await this.mutate('POST','/'+this.resource,b);
  }
  async open(row:any){
    this.error='';this.success='';this.creating=false;this.confirm=false;this.note='';this.proof='';
    try{
      this.selected=this.payout?row:await this.request('GET','/setoran/'+row.id_setoran);
      this.proof=this.selected.foto_bukti||'';this.assigned=this.selected.id_petugas;
      this.details=(this.selected.detail||[]).map((d:any)=>({id_jenis_sampah:d.id_jenis_sampah,berat_diterima_kg:d.berat_diterima_kg,berat_ditolak_kg:d.berat_ditolak_kg,alasan_penolakan:d.alasan_penolakan||''}));
      if(!this.details.length)this.addDetail();
    }catch(e:any){this.error=e.error?.message||'Detail gagal dimuat.';}
  }
  addDetail(){if(this.details.length<4)this.details.push({id_jenis_sampah:null,berat_diterima_kg:0,berat_ditolak_kg:0,alasan_penolakan:''});}
  canWeigh(){const s=this.selected;return s&&[1,2].includes(s.status)&&(s.metode==='ANTAR'?this.admin:this.partner&&s.id_petugas===this.user.id_pengguna);}
  async mutate(method:string,path:string,body:any={}){
    if(this.busy)return;this.busy=true;this.error='';this.success='';
    try{await this.request(method,path,body);this.creating=false;this.selected=null;await this.load();this.success='Perubahan tersimpan di Supabase.';}
    catch(e:any){this.error=e.error?.message||'Belum dapat menyimpan. Coba ulang; permintaan yang sama tidak membuat transaksi ganda.';}
    finally{this.busy=false;}
  }
  weigh(){return this.mutate('PUT',`/setoran/${this.selected.id_setoran}/timbang`,{foto_bukti:this.proof,detail:this.details});}
  assign(){return this.mutate('PATCH',`/setoran/${this.selected.id_setoran}/tugaskan`,{id_petugas:this.assigned});}
  verify(aksi:string){return this.mutate('PATCH',`/setoran/${this.selected.id_setoran}/verifikasi`,{aksi,catatan:this.note});}
  cancel(){return this.mutate('PATCH',`/setoran/${this.selected.id_setoran}/batalkan`);}
  payoutAction(aksi:string){return this.mutate('PATCH',`/pencairan/${this.selected.id_pencairan}/status`,{aksi,alasan:this.note,bukti:this.proof,konfirmasi_transfer:this.confirm,konfirmasi_belum_transfer:this.confirm});}
  async addSlot(){
    if(this.busy)return;this.busy=true;this.error='';
    try{await this.request('POST','/slot-jemput',{mulai_pada:this.slotForm.mulai_pada,selesai_pada:this.slotForm.selesai_pada,kapasitas:Number(this.slotForm.kapasitas)});this.slotForm={mulai_pada:'',selesai_pada:'',kapasitas:null};await this.load();this.success='Slot jemput tersimpan di Supabase.';}
    catch(e:any){this.error=e.error?.message||'Slot gagal disimpan.';}finally{this.busy=false;}
  }
  async addFunding(){
    if(this.busy)return;this.busy=true;this.error='';
    try{await this.request('POST','/kas/cadangan',{...this.funding,request_key:this.fundingKey});this.fundingKey=crypto.randomUUID();this.funding={jumlah_rupiah:null,pihak_terkait:'',keterangan:'',bukti:'',konfirmasi:false};await this.load();this.success='Dana cadangan tercatat di Supabase.';}
    catch(e:any){this.error=e.error?.message||'Dana cadangan gagal dicatat.';}finally{this.busy=false;}
  }
  status(n:number){return (this.payout?['','Diajukan','Diproses','Dibayar','Ditolak','Dibatalkan']:['','Dibuat','Menunggu verifikasi','Final','Ditolak','Dibatalkan'])[n]||'Tidak dikenal';}
}
