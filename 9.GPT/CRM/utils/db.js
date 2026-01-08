const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../db/users.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('DB 연결 실패:', err.message);
    } else {
        console.log('SQLite DB 연결 성공');
    }
});

module.exports = db;
