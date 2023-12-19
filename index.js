const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const mysql = require('mysql2/promise');

app.use(express.static("public"));

// Mock database query
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root', // <== ระบุให้ถูกต้อง
    password: '',  // <== ระบุให้ถูกต้อง
    database: 'pim_database',
    port: 3306  // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)
});

app.get('/', async (req, res) => {
    const connection = await dbConn;
    const [rows] = await connection.query('SELECT * from students')
    res.render('index', { users:rows });
});


app.listen(3000, () => console.log('Server running on port 3000'));