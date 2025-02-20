const mysql2 = require("mysql2");
const dotEnv = require("dotenv");
dotEnv.config();

const pool = mysql2.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
pool.connect(err => {
    if (err) {
        console.error('MySQL Connection Failed:', err);
        return;
    }
    console.log('Connected to MySQL');
});

