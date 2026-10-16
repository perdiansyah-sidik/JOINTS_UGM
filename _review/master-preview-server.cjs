// Hanya simulasi lokal: data tersimpan di memori, tanpa koneksi database.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'master-browser-preview/www');
const port = 4310;
const organisasi = [{ id_mitra: 1, nama_mitra: 'Bank Sampah Contoh' }, { id_mitra: 2, nama_mitra: 'Komunitas Contoh' }];
const seed = [
  { id_pengguna: 1, nama: 'Pengelola Demo', email: 'pengelola@example.test', peran: 4, alamat: null, id_mitra: null },
  { id_pengguna: 2, nama: 'Sari Rumah Tangga', email: 'sari@example.test', peran: 1, alamat: 'Jalan Contoh 10', id_mitra: null },
  { id_pengguna: 3, nama: 'Budi UMKM', email: 'budi@example.test', peran: 2, alamat: 'Jalan Contoh 20', id_mitra: null, nama_usaha: 'Warung Contoh' },
  { id_pengguna: 4, nama: 'Joko Petugas', email: 'joko@example.test', peran: 5, alamat: null, id_mitra: 1, terkunci_transaksi: true },
  { id_pengguna: 5, nama: 'Dina Petugas Baru', email: 'dina@example.test', peran: 5, alamat: null, id_mitra: 1, terkunci_transaksi: false },
  { id_pengguna: 6, nama: 'Rina Pedagang', email: 'rina@example.test', peran: 3, alamat: 'Pasar Contoh Blok A', id_mitra: null, aktif: 0 },
].map(p => ({ no_hp: null, nama_usaha: null, aktif: 1, is_deleted: 0, terkunci_transaksi: false, ...p }));
let pengguna = structuredClone(seed);
let nextId = 7;
function json(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(status < 400 ? { status: 'success', data } : { status: 'error', message: data }));
}
async function body(req) {
  let text = '';
  for await (const chunk of req) { text += chunk; if (text.length > 16384) throw new Error('Body terlalu besar'); }
  return JSON.parse(text || '{}');
}
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2' };
http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://127.0.0.1:${port}`);
    const pathname = url.pathname;
    if (pathname === '/api/pengguna' && req.method === 'GET') return json(res, 200, pengguna);
    if (pathname === '/api/mitra/ringkas' && req.method === 'GET') return json(res, 200, organisasi);
    if (pathname === '/api/pengguna/petugas-mitra' && req.method === 'POST') {
      const data = await body(req);
      if (pengguna.some(p => p.email === String(data.email).trim().toLowerCase())) return json(res, 409, 'Email sudah digunakan.');
      if (!data.nama?.trim() || !data.email || !data.password || !organisasi.some(m => m.id_mitra === data.id_mitra)) return json(res, 422, 'Isian belum lengkap.');
      const baru = { id_pengguna: nextId++, nama: data.nama.trim(), email: data.email.trim().toLowerCase(), no_hp: data.no_hp || null, peran: 5, id_mitra: data.id_mitra, alamat: null, nama_usaha: null, aktif: 1, is_deleted: 0, terkunci_transaksi: false };
      pengguna.push(baru);
      return json(res, 201, baru);
    }
    const match = pathname.match(/^\/api\/pengguna\/(\d+)(?:\/(aktifkan|nonaktifkan))?$/);
    if (match) {
      const akun = pengguna.find(p => p.id_pengguna === Number(match[1]));
      if (!akun) return json(res, 404, 'Akun tidak ditemukan.');
      if (req.method === 'GET' && !match[2]) return json(res, 200, akun);
      if (req.method === 'DELETE' && !match[2]) {
        if (akun.id_pengguna === 1 || akun.terkunci_transaksi) return json(res, 409, 'Akun sudah dirujuk atau dibutuhkan pengelola.');
        pengguna = pengguna.filter(p => p.id_pengguna !== akun.id_pengguna);
        return json(res, 200, { id_pengguna: akun.id_pengguna });
      }
      if (req.method === 'PUT' && !match[2]) {
        const data = await body(req);
        if (!data.nama?.trim() || (akun.peran <= 3 && !data.alamat?.trim())) return json(res, 422, 'Isian wajib belum lengkap.');
        if ('id_mitra' in data && (akun.peran !== 5 || akun.terkunci_transaksi || !organisasi.some(m => m.id_mitra === data.id_mitra))) return json(res, 409, 'Organisasi tidak boleh diubah.');
        for (const key of ['nama', 'no_hp', 'alamat', 'nama_usaha', 'id_mitra']) if (key in data) akun[key] = data[key];
        return json(res, 200, akun);
      }
      if (req.method === 'PATCH' && match[2]) {
        if (akun.id_pengguna === 1) return json(res, 409, 'Pengelola demo tidak dapat dinonaktifkan.');
        akun.aktif = match[2] === 'aktifkan' ? 1 : 0;
        akun.is_deleted = akun.aktif ? 0 : 1;
        return json(res, 200, akun);
      }
    }
    if (pathname.startsWith('/api/')) return json(res, 404, 'Endpoint ini tidak termasuk simulasi master pengguna.');
    if (pathname === '/preview') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
      return res.end(`<!doctype html><html lang="id"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Simulasi Master Pengguna</title><body style="font:16px system-ui;max-width:480px;margin:40px auto;padding:20px"><h1>Simulasi Master Pengguna</h1><p>Data contoh, tanpa koneksi database. Perubahan hilang saat server dimatikan. Gunakan data fiktif saja.</p><p>Tampilan ini memakai salinan kode aplikasi yang sudah diintegrasikan.</p><button style="padding:16px;background:#16813e;color:white;border:0;border-radius:12px" onclick='localStorage.setItem("ecoapp_user",JSON.stringify({id_pengguna:1,nama:"Pengelola Demo",peran:4,aktif:1,is_deleted:0}));location.href="/master-pengguna"'>Buka sebagai pengelola demo</button><p>Browser: F12 → Ctrl+Shift+M → pilih ukuran smartphone.</p></body></html>`);
    }
    const requested = path.resolve(root, '.' + decodeURIComponent(pathname));
    if (!requested.startsWith(root + path.sep) && requested !== root) { res.writeHead(403); return res.end(); }
    let file = requested;
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) file = path.join(root, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(503); return res.end('Build preview terlebih dahulu: node _review/build-master-preview.cjs'); }
    const ext = path.extname(file);
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    if (ext === '.html') {
      const html = fs.readFileSync(file, 'utf8').replace('</head>', `<style>body::after{content:'SIMULASI — data contoh';position:fixed;bottom:0;left:0;right:0;text-align:center;background:#fff4cc;color:#704d00;font:11px system-ui;z-index:99999;pointer-events:none}</style></head>`);
      return res.end(html);
    }
    fs.createReadStream(file).pipe(res);
  } catch { if (!res.headersSent) json(res, 400, 'Permintaan simulasi tidak valid.'); else res.end(); }
}).listen(port, '127.0.0.1', () => console.log(`Simulasi lokal: http://127.0.0.1:${port}/preview (Ctrl+C untuk berhenti)`));
