let connection = require('./db.js');
const mysql = require('mysql2/promise');

async function listNotes() {
        
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'me',
            password: '12345',
            database: 'notes'
        });
        const [rows, fields] = await connection.query('SELECT * from notes');
        await connection.end();
        return rows;
}

module.exports = listNotes ;
