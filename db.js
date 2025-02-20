const mysql2 = require("mysql2");
const dotEnv = require("dotenv");
dotEnv.config();

const db = mysql2.createConnection({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
db.connect(err => {
    if (err) {
        console.error('MySQL Connection Failed:', err);
        return;
    }
    console.log('Connected to MySQL');
});
module.exports=db;

