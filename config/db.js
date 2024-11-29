const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'culture-database'
});

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Database Connected...')
});

module.exports = db;