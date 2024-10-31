import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USERNAME || 'pizarra_user',
  password: process.env.DB_PASSWORD || 'nueva',
  database: process.env.DB_DATABASE || 'pizarra_virtual',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
  collation: 'utf8mb4_unicode_ci'
});

export default pool;