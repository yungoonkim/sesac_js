const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const port = 3000;
const db = new Database('users.db');

//db 초기화

(() => {
    db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)');

    const inserStm = db.prepare('INSERT INTO users (username, password) VALUES(?,?)');
    const users = [
        {username: 'user1', password: 'pass1'},
        {username: 'user2', password: 'pass2'},
        {username: 'user3', password: 'pass3'},
    ];

    //최초 1번만 실행..
    // for(const user of users){
    //     inserStm.run(user.username, user.password);
    // }
})();

//프론트를 받아오기 위한 미들웨어?
//미들웨어 - 바디파서( urlencoded vs json의 차이를 꼭 이해할 것..)
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/index.html')); //기존 방식은 static을 불러 오는 거였다면, 다른 방식 path사용
})

//프론트엔드에서 로그인 보냄..
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    //이걸 db에서 조회하기... 결과에 따라..비교
    const selectStm = db.prepare(`SELECT * FROM users WHERE username=? AND password=?`);
    const reuslt = selectStm.get(username, password);
    console.log(reuslt);

    if(reuslt){
        res.send('로그인 성공');
    }
    else{
        res.send('로그인 실패');
    }
});

app.listen(port, () => {
    console.log(`서버 레디....${port}`);
});