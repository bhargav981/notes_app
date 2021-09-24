let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jm.10765',
    database: 'notes'
});

module.exports = connection;
