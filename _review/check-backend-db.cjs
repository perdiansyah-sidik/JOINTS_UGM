// Pemeriksaan koneksi baca saja. Jangan mencetak host, kredensial, atau baris data.
const path = require('node:path');
const dbPath = path.resolve(__dirname, '../../EcoApp-Backend/config/db.js');
const originalLog = console.log;
const originalError = console.error;
console.log = () => {};
console.error = () => {};
const db = require(dbPath);
Promise.race([
  db.connectDB(),
  new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), 7000)),
]).then(async pool => {
  try {
    const connection = pool?.request ? pool : await db.sql.connect();
    const result = await connection.request().query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME IN ('pengguna','m_pengguna','mitra','m_mitra')");
    originalLog('DB_OK', result.recordset.map(row => row.TABLE_NAME).sort().join(','));
  } catch (error) {
    originalLog('DB_QUERY_FAIL', error.code || error.name || 'ERROR');
  }
  process.exit(0);
}, error => {
  originalLog('DB_CONNECT_FAIL', error.code || error.name || 'ERROR');
  process.exit(1);
});
