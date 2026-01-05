const express = require('express');
const Database = require('better-sqlite3');
const db = new Database('chinook.db');
const port = 3000;

const app = express();

app.use(express.static('public'));


app.get('/api/search', (req, res) => {
    console.log('라우터 진입');

    const { type, keyword } = req.query;
    let sql;
    let params;

    if (type === 'album') {
        sql = `SELECT * FROM albums WHERE Title LIKE ?`;
        params = [`%${keyword}%`];
    }
    else if (type === 'customer') {
        sql = `SELECT * FROM customers 
               WHERE FirstName LIKE ? OR LastName LIKE ?`;
        params = [`%${keyword}%`, `%${keyword}%`];
    }
    else {
        return res.status(400).send('잘못된 검색 타입');
    }

    try {
        const stmt = db.prepare(sql);
        const rows = stmt.all(params);
        res.json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


app.listen(port, () => {
    console.log(`Server is ready ${port}`);
});