const express = require('express');
const Database = require('better-sqlite3');
const fs = require('fs');

const PORT = 3000;
const db_file = 'my-express-db.db';

const app = express();
const db = new Database(db_file);

//입력 요청 json으로 받아서 req.body에 받아주기 위한 미들웨어...
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function init_database() {
    const sql = fs.readFileSync('init_database.sql', 'utf8'); //sync라서 동기 모드로 읽힘(즉 블럭킹 함수)
    const statements = sql.split(';'); //각 행을 ;(세미클론)으로 짤라서 빈행(undefined/null 등)으로 나오는걸 제외

    try {
        for (const statement of statements) {
            console.log(statement);
            db.exec(statement);
        }
    }
    catch (err) {
        console.log('이미 초기화 되었습니다.'); //아주 좋은 코드는 아님..
    }
}

init_database();

app.get('/api/table/:table', (req, res) => {
    const db_table = req.params.table;

    try {
        const query_str = `SELECT * FROM ${db_table}`;
        console.log(query_str);

        const query = db.prepare(query_str);
        const queryResult = query.all();
        res.json(queryResult);
    } catch (err) {
        res.send('요청하신 테이블 정보는 존재하지 않습니다.');
    }
});

//curl localhost:3000/api/users

app.get('/api/users', (req, res) => {
    const users = db.prepare(`SELECT * FROM users`).all();
    res.send(users);
});

////curl localhost:3000/api/users/2
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    const user = db.prepare(`SELECT * FROM users WHERE id=?`).get(userId);
    if (user) {
        // res.send(user);
        res.json(user);
    }
    else {
        // return res.send('사용자가 없습니다.'); //200이 전달됨.
        return res.status(404).send('사용자가 없습니다.')
    }

});

//아래 형식은 urlencoded 미들웨어가 파싱함
//curl -X POST localhost:3000/api/users -d username=hello -d password=world
app.post('/api/users', (req, res) => {
    const { username, password } = req.body; //body를 쓰려면 미들웨어로 등록해야함..
    const insert = db.prepare('INSERT INTO users (username, password) VALUES (?,?)');
    const result = insert.run(username, password);
    res.send(`사용자가 추가되었습니다. 신규ID: ${result.lastInsertRowid}`);
});


// app.put('/api/users/:id', (req, res) => {
//     const { id } = req.params;
//     const { username, password } = req.body;

//     // 1. 존재 여부 확인
//     const existingUser = db
//         .prepare('SELECT id FROM users WHERE id=?')
//         .get(id);

//     if (existingUser) {
//         // 2-A. 있으면 UPDATE
//         db.prepare(
//             'UPDATE users SET username=?, password=? WHERE id=?'
//         ).run(username, password, id);

//         return res.send({
//             action: 'updated',
//             id
//         });
//     } else {
//         // 2-B. 없으면 INSERT
//         const result = db.prepare(
//             'INSERT INTO users (id, username, password) VALUES (?, ?, ?)'
//         ).run(id, username, password);

//         return res.send({
//             action: 'inserted',
//             id: result.lastInsertRowid
//         });
//     }
// });


////curl -X GET localhost:3000/api/users/2
//curl -X PUT localhost:3000/api/users/2 -d username=change2 -d password=new-password

app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const {username, password} = req.body;

    const update = db.prepare(`UPDATE users SET username=?, password=? WHERE id=?`);
    update.run(username, password, userId);

    res.send(`사용자 정보가 수정되었습니다. ID: ${userId}`);
});

//curl -X DELETE localhost:3000/api/users/3
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    const deleteQuery = db.prepare('DELETE FROM users WHERE id=?');
    deleteQuery.run(userId);
    res.send(`사용자가 삭제되었습니다. 삭제ID: ${userId}`);
});

app.listen(PORT, () => {
    console.log(`Server is ready ${PORT}`);
});